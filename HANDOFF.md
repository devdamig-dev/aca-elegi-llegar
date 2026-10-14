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
