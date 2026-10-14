# ACA MOV — Elegí llegar

Implementación estática en HTML, CSS y JavaScript basada en los SVG de 1920, 1440 y 390 px entregados en `Untitled.zip`.

Repositorio privado: [devdamig-dev/aca-elegi-llegar](https://github.com/devdamig-dev/aca-elegi-llegar), rama `main`.

Esta copia conserva sin cambios el código de la revisión publicada desde el commit de origen `7e643a06658037f2b7772d749005c9b46749670c`. La configuración interna de Sites no es necesaria para alojarla y no se incluye.

## GitHub Pages

El workflow `.github/workflows/pages.yml` publica únicamente `dist/` mediante las acciones oficiales de GitHub. Se ejecuta al cambiar la landing en `main` y también permite ejecución manual desde Actions. No requiere compilación ni secretos adicionales.

**Activación pendiente:** el 14/10/2026, Settings → Pages mostró “Upgrade or make this repository public to enable Pages”. El repositorio sigue privado. Para habilitar Pages con el plan actual hace falta autorización para hacerlo público; eso expone también el código, los assets y el historial. Luego se debe seleccionar GitHub Actions como fuente de Pages y ejecutar el workflow. Todavía no hay URL de Pages publicada ni verificada.

## Estado de esta entrega

Versión de revisión. **No se declara pixel perfect validado.** Las fuentes originales no están incluidas ni identificadas en los SVG, cuyos textos están convertidos a curvas. Se utiliza Montserrat de forma provisional y local, con cinco pesos. Para cerrar la fidelidad tipográfica hace falta el nombre de la familia y sus pesos, o los archivos WOFF2/TTF originales.

No hubo acceso a la infraestructura de navegador exigida por el entorno para comparar capturas a 1920, 1440 y 390 px. Se completaron comprobaciones del DOM, interacciones, enlaces internos, archivos y sintaxis. El siguiente paso es aplicar la fuente original y contrastar la página renderizada con los tres SVG.

## Archivos

- `dist/index.html`: estructura semántica y contenido editable.
- `dist/styles.css`: diseño y adaptación responsive. Clases y variables con prefijo `aca-`.
- `dist/app.js`: navegación, pestañas, puntos del casco, puntos ciegos y compartir.
- `dist/assets/`: nueve fotografías originales extraídas de los SVG, logo e íconos originales, fuentes locales y favicon derivado del logo.
- `docs/verification.json`: resultado de 17 comprobaciones funcionales del DOM, sin verificación visual.

## Uso

Subir el contenido completo de `dist/` al directorio de publicación de cualquier hosting estático o cPanel. No requiere Node, compilación ni servicios externos. También se puede abrir `dist/index.html` localmente; compartir/copiar depende de las capacidades y permisos del navegador.

Al utilizar un dominio definitivo, actualizar `og:image` y el enlace de respaldo de `campaignUrl()` en `app.js`. Retirar `noindex,nofollow` al aprobar la publicación de campaña. La revisión alojada mantiene el acceso privado.

## Funcionalidad

- Menú mobile con estado accesible y cierre por enlace, clic exterior y Escape.
- Cuatro pestañas con soporte de teclado.
- Nueve zonas de impacto del casco y lectura del dato seleccionado.
- Cinco puntos ciegos, selección directa y navegación circular.
- Web Share cuando está disponible; diálogo con copia de enlace como alternativa.
- Foco visible y respeto por la preferencia de movimiento reducido.

Los eventos `aca_navigation`, `aca_risk_tab`, `aca_helmet_point`, `aca_blind_point` y `aca_share` se agregan a `window.dataLayer`. No hay contenedor GTM ni píxeles publicitarios configurados y no se envían datos a servicios externos desde el código.

## Alcance del contenido

Se conservó el contenido visible de las referencias, incluyendo sus fuentes estadísticas. La exactitud editorial de esas cifras no fue auditada en este desarrollo. Los SVG muestran el primer estado de las pestañas y del auto; los textos de los otros estados se redactaron para hacer operativos esos controles y quedan sujetos a revisión de ACA. No se inventaron imágenes adicionales: todos los estados conservan el material visual entregado.

El diseño mobile tiene cards sin fotografía y un cierre con texto distinto al desktop, respetados en la implementación. Las imágenes JPEG originales se conservan; las PNG se optimizaron a WebP de alta calidad.

## Tipografía provisional

Montserrat, distribuida bajo SIL Open Font License. Los archivos WOFF se obtuvieron de los TTF oficiales de Google Fonts y se limitaron al juego latino utilizado en la página. La fuente deberá reemplazarse por la familia original para la aprobación pixel perfect.
