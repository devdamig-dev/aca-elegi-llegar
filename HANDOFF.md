# Relevo · ACA / Landing Elegí llegar · 14/10/2026 · America/Buenos_Aires

- **Objetivo y alcance:** desarrollar la landing del Figma `JNI4aFQ7pVd3xB5lYZPA6H`, nodo `0:1`, con fidelidad pixel perfect en escritorio y mobile. El acceso Figma devolvió límite de consultas; el usuario aportó `Untitled.zip` con SVG de 1920, 1440 y 390 px.
- **Terminado y evidencia:** HTML, CSS, JavaScript y recursos originales extraídos, en `dist/`. Diez secciones implementadas, menú mobile, cuatro pestañas, nueve zonas de casco, cinco puntos ciegos y compartir. `docs/verification.json` registra 17 comprobaciones funcionales del DOM satisfactorias. No equivale a QA de layout ni a cierre pixel perfect.
- **Pendientes / próximos pasos autorizados:** obtener la fuente original, reemplazar Montserrat provisional y verificar visualmente a 1920, 1440 y 390 px contra los SVG. Corregir las diferencias que surjan. Revisar con ACA los textos de estados no visibles en los SVG.
- **Sugerencias nuevas:** ninguna.
- **Referencias:** proyecto Sites `appgprj_6acff91e6a308191b3c0da548f389481`; checkout `/workspace/sites/aca-elegi-llegar`; archivos `dist/index.html`, `dist/styles.css`, `dist/app.js`, `dist/assets/`, `README.md`. La rama y el commit deben consultarse en el repositorio al retomar. Sin PR creado por este chat.
- **Bloqueos y aprobaciones:** fuente original no identificada ni incluida; falta comparación visual en navegador porque el control de navegador requerido no estaba disponible. No hay aprobación pendiente de acciones destructivas. La publicación de revisión conserva acceso privado.
- **Continuidad:** disponible para retomar desde la sustitución de la fuente y la QA visual. No se declara un traspaso aceptado ni ejecución en segundo plano.
- **Core:** no registrado por este chat; no se identificó una vía disponible ni un work item inequívoco para este alcance.

## Etapa GitHub · 14/10/2026 · America/Buenos_Aires

- **Objetivo y alcance:** subir la versión de revisión existente a GitHub, incluyendo HTML, CSS, JavaScript, assets y documentación. No modificar la landing ni desplegarla de nuevo.
- **Repositorio:** `https://github.com/devdamig-dev/aca-elegi-llegar`, privado, rama `main`. El repositorio `devdamig-dev/aca` corresponde a Interlagos y no se modifica.
- **Origen verificable:** `dist/` y `docs/verification.json` se conservan byte a byte respecto del commit de Sites `7e643a06658037f2b7772d749005c9b46749670c`. Se actualiza únicamente la documentación de entrega y se agrega `.gitignore`.
- **Pendientes autorizados:** obtener la tipografía original, aplicarla y realizar la comparación visual desktop/mobile. La subida a GitHub no representa una aprobación pixel perfect. Los textos de estados secundarios siguen sujetos a revisión de ACA.
- **Sugerencias nuevas:** ninguna. No se configuró GitHub Pages, CI/CD ni hosting adicional.
- **Continuidad:** disponible para otro ejecutor desde `dist/styles.css`, una vez identificada la fuente. Consultar el commit actual de `main` para recuperar la entrega; no hay PR en esta etapa.
- **Core:** no registrado por este chat; sin vía autorizada ni work item identificado de forma única.

## Etapa GitHub Pages · 14/10/2026 · America/Buenos_Aires

- **Objetivo y alcance:** habilitar GitHub Pages para obtener una URL de la landing existente.
- **Preparado:** workflow oficial en `.github/workflows/pages.yml`, con publicación exclusiva de `dist/`, ejecución manual y despliegue tras cambios de la landing en `main`. No cambia HTML, CSS, JavaScript ni assets.
- **Terminado y evidencia:** el usuario autorizó hacer público el repositorio para revisar la landing. Se aplicó el cambio y se habilitó Pages con fuente GitHub Actions. El run `38656550555`, intento 2, terminó en `success` sobre `14d896b95de7dd78ccffaa923997d684c7b15774`: https://github.com/devdamig-dev/aca-elegi-llegar/actions/runs/38656550555. URL abierta y verificada: https://devdamig-dev.github.io/aca-elegi-llegar/. Cargan CSS, fuentes e imágenes iniciales; no se realizó comparación visual integral contra los SVG.
- **Próximos pasos autorizados:** el usuario revisa la landing y luego indica cuándo volver a privado. No se programa ni ejecuta ese cambio antes de su revisión. Con el plan actual, volver a privado deshabilita Pages. Continúan pendientes tipografía original y QA visual del alcance inicial.
- **Bloqueos y aprobaciones:** ninguno para la publicación actual. El momento de volver a privado depende de la indicación del usuario de que terminó la revisión.
- **Sugerencias nuevas:** ninguna; no se contrató ningún plan.
- **Continuidad:** disponible para retomar desde los comentarios de revisión o la indicación de volver a privado. El workflow publica automáticamente cambios en `dist/` desde `main` mientras Pages esté habilitado. No hay un cambio de visibilidad en segundo plano.
- **Core:** no registrado por este chat; sin acceso autorizado ni work item identificado.

## Tipografía original · 15/10/2026 · America/Buenos_Aires

- **Objetivo y alcance:** reemplazar Montserrat provisional por las fuentes originales entregadas en `pathway-extreme.zip` y actualizar la revisión de GitHub Pages.
- **Cambios:** Pathway Extreme variable local WOFF2, pesos 100–900, sin modificar sus bytes. Se actualizan CSS y precarga y se retiran los cinco WOFF de Montserrat y su licencia. No se modifica el contenido ni el JavaScript. Licencia original incluida.
- **Terminado y evidencia:** metadatos, eje de peso y caracteres españoles comprobados con FontTools; WOFF2 idéntico al ZIP. Publicado en https://devdamig-dev.github.io/aca-elegi-llegar/ desde `e4fe488b43fddfda23ce3f0dff8c2891fc6c9282`; run `38675099128` exitoso: https://github.com/devdamig-dev/aca-elegi-llegar/actions/runs/38675099128. El navegador confirma Pathway Extreme cargada y peso 850 disponible. Se corrigió el ancho del título del hero a 590 px y del párrafo a 520 px para recuperar sus saltos de línea, manteniendo las reglas responsive. El título vuelve a tres líneas. Evidencia detallada en `docs/font-verification.json`.
- **Alcance de publicación:** GitHub Pages actualizado. La versión privada anterior de Sites no fue modificada. No se declara cierre pixel perfect integral por esta comprobación tipográfica.
- **Pendientes autorizados:** comparación visual integral contra los SVG en 1920, 1440 y 390 px, y revisión editorial de estados secundarios. La fuente original ya está resuelta; este estado sustituye los pendientes tipográficos de etapas anteriores.
- **Sugerencias nuevas:** ninguna.
- **Continuidad:** disponible para retomar desde QA visual o comentarios del usuario. El repositorio continúa público para revisión, hasta que el usuario indique volver a privado; eso deshabilita Pages con el plan actual.
- **Core:** no registrado por este chat; sin acceso autorizado ni work item identificado.


## Diseño aprobado e interacciones · 26/10/2026 · America/Buenos_Aires

- Objetivo: actualizar la landing con el Figma aprobado, cuatro carruseles de riesgos y detalle del casco por hover/clic/tap.
- Terminado: 8 secciones, 12 textos exactos, 12 escenas, 9 zonas con tooltip y modal, logo, copy y estadísticas del diseño aprobado; CTA Socio Moto. Fuente Pathway Extreme local.
- Publicación: main, commit e7cc208439a78d2a5bb218e579bfa229ac2b28c0; GitHub Pages run 40380162685 exitoso. https://github.com/devdamig-dev/aca-elegi-llegar/actions/runs/40380162685
- Evidencia: 34 pruebas DOM satisfactorios en docs/interaction-verification.json; pruebas del navegador en docs/browser-verification.json. Sin overflow horizontal a 390/768/1440/1920 px y en borde fraccional de 767,8 px; nueve diálogos en mobile dentro del viewport, Escape restaura foco. Se revisaron los doce estados del carrusel. Captura general docs/qa-hero.jpg.
- Ajustes detectados en QA: especificidad de resets de botones/imágenes impedía tipografía y cards mobile; corregido. Cubierto hueco de media queries para anchos fraccionales.
- Límites: no se certifica comparación pixel a pixel integral de todas las secciones. Las fotos nuevas son ilustrativas generadas y las descripciones de casco explican región/distribución de impactos; no estaban como copy detallado en Figma.
- Pendientes / próximos pasos autorizados: revisión del usuario de las escenas nuevas y del resultado en la URL; incorporar sus observaciones. La adaptación mobile conserva también las 3 tarjetas FIA que figuran en desktop.
- Referencias: https://devdamig-dev.github.io/aca-elegi-llegar/; Figma JNI4aFQ7pVd3xB5lYZPA6H, frames 17:3 y 17:1931. Sin PR. No se actualizó la antigua revisión Sites.
- Bloqueos y aprobaciones: ninguno para esta entrega. Repositorio público por autorización previa; volver a privado solo cuando lo indique el usuario.
- Sugerencias nuevas: ninguna.
- Continuidad: etapa implementada y publicada; disponible para otro ejecutor desde este repositorio y estas evidencias, sin promesa de trabajo en segundo plano.
- Core: no registrado por este chat; sin acceso autorizado ni work item inequívoco identificado.

## Copy definitivo del casco y carruseles automáticos · 26/10/2026 · America/Buenos_Aires

- Objetivo y alcance: cargar los nueve títulos/mensajes entregados; cierre de Mentón tras animación de rotura; fotos automáticas cada 2 segundos y selección por hover, sin controles visibles.
- Terminado: copy exacto en modales y hover, animación ilustrativa de Mentón de 1,6 segundos, cierre al finalizar, fallback y movimiento reducido. Carrusel sin flechas, puntos ni contadores; selección y pausa por hover/foco, continuación al salir, tap y swipe.
- Publicado: main, código 97bf3cc0a3ebeb309991e86f023d641ae94b068f; run 40391302262 exitoso: https://github.com/devdamig-dev/aca-elegi-llegar/actions/runs/40391302262
- Evidencia: 41/41 pruebas en docs/interaction-revision-verification.json. Navegador y capturas en docs/browser-revision-verification.json, docs/qa-risk-revision.png y docs/qa-helmet-revision.png. Revisados hover sostenido y continuación, cierre animado, Escape/foco, modal a 390 px sin overflow ni scroll interno.
- Límites: animación ilustrativa, sin simulación física. QA visual enfocado en los componentes modificados, sin comparación pixel a pixel integral de la landing.
- Pendientes / próximos pasos autorizados: implementación solicitada completa; revisar URL e incorporar observaciones del usuario si las hay.
- Sugerencias nuevas: ninguna. Bloqueos/aprobaciones: ninguno para este alcance. Se conserva la autorización previa de repositorio público; no se cambia su visibilidad.
- Referencias: https://devdamig-dev.github.io/aca-elegi-llegar/; repo devdamig-dev/aca-elegi-llegar, rama main, sin PR. Cambios en dist/app.js, dist/interactions.css e index.html. No se modificó la revisión Sites antigua.
- Continuidad: etapa completa; disponible para otro ejecutor desde este repositorio y el resultado publicado.
- Core: no registrado por este chat; sin vía autorizada ni work item identificado de forma única.

## Anchos y pulido dinámico · 27/10/2026 · America/Buenos_Aires

- Objetivo y alcance: igualar header/footer al ancho del hero e incorporar mayor animación e interacción a la landing aprobada.
- Terminado: contenedor compartido; entradas escalonadas, profundidad del hero, nueve contadores accesibles, movimiento de campaña, navegación/progreso, microinteracciones, modales y fundido de fotos. Ajuste del collage entre 1280 y 1439 px para evitar recorte de una tarjeta. Movimiento reducido y fallback sin ocultado permanente.
- Publicado y verificado: main, código 0e25392f873f316bae35de7b8c21d8028e350045, run 40523747232 success: https://github.com/devdamig-dev/aca-elegi-llegar/actions/runs/40523747232. URL: https://devdamig-dev.github.io/aca-elegi-llegar/
- Evidencia: 62/62 checks (41 regresión, 6 fundido, 15 motion). En navegador real a 1363×936: header, hero y footer comparten left160/right1188/width1028; sin overflow; collage completo tras ajuste. Scripts y estado de movimiento confirmados directamente. Capturas y medidas en docs/browser-motion-verification.json, qa-motion-hero.jpg y qa-motion-footer.jpg.
- Pendientes / próximos pasos autorizados: revisión del usuario de la dinámica. QA visual mobile/1920 pendiente por falta de control de viewport en herramientas disponibles; la lógica mobile y movimiento reducido tienen cobertura funcional. Otro ejecutor puede retomar esa comprobación y aplicar observaciones.
- Sugerencias nuevas: ninguna. Bloqueos/aprobaciones: ninguno para la implementación publicada; limitación de QA visual indicada. Repositorio público por autorización previa, sin cambio de visibilidad.
- Referencias: repo devdamig-dev/aca-elegi-llegar, rama main, sin PR. Nuevos dist/motion.js y motion.css; cambios en approved.css, app.js, interactions.css e index.html. Dirección y límites en docs/motion-design.md. Revisión Sites anterior sin cambios.
- Continuidad: implementación de esta etapa completa; disponible para otro ejecutor desde esta versión y con QA visual mobile como primer punto pendiente.
- Core: no registrado por este chat; sin vía autorizada ni work item identificado de forma única.
