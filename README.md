# ACA MOV — Elegí llegar

Landing estática HTML/CSS/JavaScript con Pathway Extreme local, basada en el Figma aprobado por el cliente.

- URL: https://devdamig-dev.github.io/aca-elegi-llegar/
- Repositorio: https://github.com/devdamig-dev/aca-elegi-llegar · rama `main`.
- Diseño: https://www.figma.com/design/JNI4aFQ7pVd3xB5lYZPA6H/ACA-MOV?node-id=0-1

## Ajustes de entrega · 28/10/2026

- GTM del cliente `GTM-N66LS8`: script al comienzo de `head`, después de charset, y bloque noscript inmediatamente después de abrir `body`. Se conserva el `dataLayer` que ya utilizan las interacciones; no se agregan otros contenedores ni etiquetas de analítica.
- «Conocé Socio Moto» apunta a https://promo.aca.org.ar/socios/sumate-a-la-rodada/index.php.
- El footer conserva movilidad@aca.org.ar y suma Instagram @acamovilidad, con la URL proporcionada por el cliente. Contactos en fila con ajuste de línea en escritorio y apilados en mobile.
- Destino de la entrega PHP: https://promo.aca.org.ar/aca-mov/elegi-llegar/.
- Revisión aprobada por el usuario el 28/10/2026; exportación PHP con SEO y archivos locales preparada para enviar al cliente. La revisión de GitHub Pages sigue disponible y marcada noindex.

La producción incluye `index.php`, todos los CSS/JS/assets, sitemap y configuración Apache local. Canonical, OG, X/Twitter y JSON-LD usan el dominio definitivo; la producción es indexable y la vista previa conserva noindex. Las redirecciones de alias preservan parámetros de campaña y las rutas desconocidas responden 404. El hosting/robots raíz/Search Console y las etiquetas internas de GTM se verifican tras instalar en el servidor del cliente.

### Generar la entrega PHP

La fuente visual e interactiva es `dist/`. Configuración SEO en `delivery/seo.json`, encabezado PHP en `delivery/php-prefix.txt` y guía en `delivery/INSTALACION.txt`. No hay dependencias de build en el hosting.

```sh
python3 scripts/export-php.py --update-preview
python3 scripts/export-php.py --output build/ACA-MOV-PHP
```

El destino debe ser nuevo; el script no sobrescribe entregas anteriores. Produce carpeta y ZIP con `public/`, guía, fragmento para robots raíz, versión y checksums. Subir exclusivamente el contenido de `public/` a `/aca-mov/elegi-llegar/`. PHP 8.3 o superior con parches vigentes. No subir el ZIP completo a la raíz pública ni dejar un index.html anterior compitiendo.

`robots.txt` se configura en la raíz de promo.aca.org.ar: integrar la línea Sitemap provista sin reemplazar reglas existentes. El paquete no modifica DNS, SSL, Search Console ni la configuración de GTM. Validación nativa PHP y archivos en `docs/php-delivery-verification.json`; contenido de riesgos y regresión en `docs/seo-risk-panels-verification.json` y `docs/seo-motion-regression.json`.

## Actualización 26/10/2026

Ocho secciones conforme al contenido aprobado, logo ACA original, nuevas estadísticas FIA y CTA «Conocé Socio Moto». Se retiraron las dos secciones de autos del diseño anterior.

### Lo que pasa en la calle

Los cuatro paneles y sus doce textos se sirven en HTML desde la primera respuesta. JavaScript alterna paneles persistentes; sin JavaScript se muestran todos los contenidos con sus rótulos.

Cuatro pestañas con los doce textos exactos entregados por el usuario. Cada pestaña tiene tres escenas que rotan automáticamente cada 2 segundos, sin flechas, indicadores ni números visibles. El hover o foco de teclado sobre un ítem selecciona y mantiene su foto; al salir retoma la rotación. Clic/tap y gestos táctiles también permiten seleccionar escenas. Cambiar de pestaña vuelve a la primera escena. Las fotos se precargan al entrar en la sección y el cambio entre escenas usa un fundido de 380 ms cuando hay movimiento habilitado. La rotación se pausa fuera de pantalla, al ocultar la pestaña y con la preferencia de movimiento reducido.

La primera imagen de Cruces conserva la fotografía original. Las otras escenas se crearon para ilustrar cada situación; procedencia y prompts en `docs/risk-image-prompts.md`. Los cuatro atlas WebP suman aproximadamente 1,3 MB. Cada tercio es una escena 4:3, sin deformación ni carga externa.

### Casco

Nueve porcentajes: ventana flotante con hover/foco en escritorio y diálogo nativo con clic/Enter/Espacio/tap. Cierre con botón, Escape o fondo; el foco vuelve al activador. Los nueve títulos y mensajes corresponden al copy entregado por el usuario el 26/10/2026. El modal de Mentón incluye una animación ilustrativa de rotura y revela «Por eso, abrocharlo no es opcional.» al terminar. Con movimiento reducido presenta el cierre directamente. Zonas y valores proceden de Figma; la ubicación es esquemática.

## Alineación y movimiento · 27/10/2026

Header, hero y footer comparten el mismo ancho y márgenes responsive mediante `--aca-shell-width`; el ancho del hero aprobado se conserva. La capa de movimiento incorpora profundidad suave de las fotos del hero, aparición de secciones/cards, conteo de estadísticas con valores accesibles estables, movimiento del fondo de campaña, progreso de lectura y respuestas en botones, menú, pestañas y modales. Las tarjetas del hero permanecen estables. Se conserva el scroll nativo; las animaciones se reducen en mobile y se deshabilitan según la preferencia del usuario.

Corrección del 28/10/2026: las entradas se preparan solo para contenido situado completamente debajo del viewport y comienzan anticipadamente. El contenido visible al cargar o restaurar scroll conserva su estado final, incluidas las cifras. Los contadores de tarjetas pendientes comienzan con la entrada de su tarjeta, evitando mostrar el valor final antes de reiniciar. La entrada usa `transform`, separado del `translate` del hover/fotos, y nunca mueve las tarjetas del hero.

## Archivos y despliegue

- `dist/index.html`: contenido y estructura.
- `dist/styles.css`: estilos originales y responsive.
- `dist/approved.css`: cambios generales del diseño aprobado.
- `dist/interactions.css`: carruseles y ventanas de detalle.
- `dist/motion.css` y `dist/motion.js`: animaciones y respuestas al scroll/cursor, con movimiento reducido.
- `dist/app.js`: menú, pestañas, carrusel y casco.
- `dist/assets/`: imágenes, logo, íconos y fuente.

Subir `dist/` a cualquier hosting estático; no requiere compilación. `.github/workflows/pages.yml` publica esa carpeta al cambiarla en `main`. El repositorio continúa público para revisión con la autorización anterior. Volverlo privado queda pendiente de indicación del usuario y deshabilitaría Pages con su plan actual.

## Verificación y límites

La verificación inicial quedó en `docs/interaction-verification.json` y `docs/browser-verification.json`. La revisión del copy y la rotación automática se registra en `docs/interaction-revision-verification.json`; la evidencia inicial corresponde a los controles manuales y textos anteriores.

El CTA utiliza el destino de asociación confirmado por el cliente. Los tres datos FIA se conservan en mobile aunque el frame de 390 px no los incluye. No se declara una comparación pixel a pixel integral de todas las secciones. Se conserva `noindex,follow` para esta URL de revisión; el GTM solicitado ya forma parte de la landing.

Detalles de diseño en `docs/approved-design.md` y continuidad en `HANDOFF.md`.
