#!/usr/bin/env python3
"""Exportar la landing aprobada a PHP sin dependencias de build en el hosting."""
import argparse
import hashlib
import html
import json
from pathlib import Path
import re
import shutil
import subprocess
from urllib.parse import urlsplit
import zipfile

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / 'delivery/seo.json').read_text())


def metadata(production):
    c = CONFIG
    esc = lambda value: html.escape(str(value), quote=True)
    image_url = c['url'] + c['image']
    schema = {
        '@context': 'https://schema.org', '@type': 'WebPage',
        '@id': c['url'] + '#webpage', 'url': c['url'], 'name': c['title'],
        'description': c['description'], 'inLanguage': c['language'],
        'primaryImageOfPage': {
            '@type': 'ImageObject', '@id': c['url'] + '#primaryimage',
            'url': image_url, 'width': c['image_width'], 'height': c['image_height'],
            'caption': c['image_alt']
        },
        'publisher': {
            '@type': 'Organization', 'name': c['publisher']['name'],
            'url': c['publisher']['url'],
            'logo': {
                '@type': 'ImageObject', 'url': c['url'] + c['publisher']['logo'],
                'width': c['publisher']['logo_width'], 'height': c['publisher']['logo_height']
            }
        }
    }
    tags = [('name', 'description', c['description']),
            ('name', 'robots', 'index,follow,max-image-preview:large' if production else 'noindex,follow'),
            ('property', 'og:site_name', c['site_name']), ('property', 'og:title', c['title']),
            ('property', 'og:description', c['description']), ('property', 'og:type', 'website'),
            ('property', 'og:locale', c['locale']), ('property', 'og:url', c['url']),
            ('property', 'og:image', image_url), ('property', 'og:image:secure_url', image_url),
            ('property', 'og:image:type', c['image_type']),
            ('property', 'og:image:width', c['image_width']), ('property', 'og:image:height', c['image_height']),
            ('property', 'og:image:alt', c['image_alt']),
            ('name', 'twitter:card', 'summary_large_image'), ('name', 'twitter:title', c['title']),
            ('name', 'twitter:description', c['description']), ('name', 'twitter:image', image_url),
            ('name', 'twitter:image:alt', c['image_alt'])]
    lines = ['  <!-- ACA SEO START -->', f'  <title>{esc(c["title"])}</title>',
             f'  <link rel="canonical" href="{esc(c["url"])}">']
    lines += [f'  <meta {attr}="{name}" content="{esc(value)}">' for attr, name, value in tags]
    lines += ['  <script type="application/ld+json">',
              json.dumps(schema, ensure_ascii=False, indent=2).replace('<', '\\u003c'),
              '  </script>', '  <!-- ACA SEO END -->']
    return '\n'.join(lines)


def with_metadata(source, production):
    block = metadata(production)
    if '<!-- ACA SEO START -->' in source:
        return re.sub(r'  <!-- ACA SEO START -->.*?  <!-- ACA SEO END -->', lambda _: block, source, count=1, flags=re.S)
    pattern = r'  <title>.*?</title>.*?  <meta name="robots"[^>]*>'
    updated, count = re.subn(pattern, lambda _: block, source, count=1, flags=re.S)
    if count != 1:
        raise ValueError('No se pudo localizar el bloque de metadatos anterior')
    return updated


def build(output):
    if urlsplit(CONFIG['url']).scheme != 'https' or not CONFIG['url'].endswith('/'):
        raise ValueError('La URL definitiva debe usar HTTPS y terminar en /')
    source = (ROOT / 'dist/index.html').read_text()
    if source.count(CONFIG['gtm_id']) != 2:
        raise ValueError('Se esperaba una instalación GTM y un noscript')
    output = output.resolve()
    if output.exists():
        raise FileExistsError(f'El destino ya existe; usá una carpeta nueva: {output}')
    public = output / 'public'
    shutil.copytree(ROOT / 'dist', public)
    canonical_php = "'" + CONFIG['url'].replace('\\', '\\\\').replace("'", "\\'") + "'"
    prefix = (ROOT / 'delivery/php-prefix.txt').read_text().replace('__CANONICAL_PHP_STRING__', canonical_php)
    (public / 'index.php').write_text(prefix + with_metadata(source, True))
    (public / 'index.html').unlink()
    shutil.copyfile(ROOT / 'delivery/apache.htaccess', public / '.htaccess')
    sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>' + html.escape(CONFIG['url']) + '</loc></url>\n</urlset>\n'
    (public / 'sitemap.xml').write_text(sitemap)
    shutil.copyfile(ROOT / 'delivery/INSTALACION.txt', output / 'LEER-ANTES-DE-SUBIR.txt')
    server = output / 'servidor'
    server.mkdir()
    (server / 'robots-sitemap-fragment.txt').write_text('# Integrar a robots.txt existente en la raíz del dominio; no reemplazar sus reglas.\nSitemap: ' + CONFIG['url'] + 'sitemap.xml\n')
    commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
    (output / 'VERSION.txt').write_text('ACA MOV — Elegí Llegar · entrega PHP\nURL: ' + CONFIG['url'] + '\nBase de repositorio al exportar: ' + commit + '\nGTM: ' + CONFIG['gtm_id'] + '\nLos checksums identifican exactamente los archivos incluidos.\n')
    sums = []
    for path in sorted(output.rglob('*')):
        if path.is_file():
            sums.append(hashlib.sha256(path.read_bytes()).hexdigest() + '  ' + path.relative_to(output).as_posix())
    (output / 'SHA256SUMS.txt').write_text('\n'.join(sums) + '\n')
    archive = output.with_suffix('.zip')
    if archive.exists():
        raise FileExistsError(archive)
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as bundle:
        for path in sorted(output.rglob('*')):
            if path.is_file():
                info = zipfile.ZipInfo.from_file(path, (Path(output.name) / path.relative_to(output)).as_posix())
                info.external_attr = 0o100644 << 16
                info.compress_type = zipfile.ZIP_DEFLATED
                bundle.writestr(info, path.read_bytes())
    print(json.dumps({'directory': str(output), 'zip': str(archive), 'size_bytes': archive.stat().st_size,
                      'sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}, ensure_ascii=False))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--update-preview', action='store_true')
    parser.add_argument('--output', type=Path, default=ROOT / 'build/ACA-MOV-PHP')
    args = parser.parse_args()
    if args.update_preview:
        page = ROOT / 'dist/index.html'
        page.write_text(with_metadata(page.read_text(), False))
    else:
        build(args.output)
