# ACA MOV — Elegí llegar

Landing estática HTML/CSS/JavaScript con Pathway Extreme local, basada en el Figma aprobado por el cliente.

- URL: https://devdamig-dev.github.io/aca-elegi-llegar/
- Repositorio: https://github.com/devdamig-dev/aca-elegi-llegar · rama `main`.
- Diseño: https://www.figma.com/design/JNI4aFQ7pVd3xB5lYZPA6H/ACA-MOV?node-id=0-1

## Actualización 26/10/2026

Ocho secciones conforme al contenido aprobado, logo ACA original, nuevas estadísticas FIA y CTA «Conocé Socio Moto». Se retiraron las dos secciones de autos del diseño anterior.

### Lo que pasa en la calle

Cuatro pestañas con los doce textos exactos entregados por el usuario. Cada pestaña tiene tres escenas que rotan automáticamente cada 2 segundos, sin flechas, indicadores ni números visibles. El hover o foco de teclado sobre un ítem selecciona y mantiene su foto; al salir retoma la rotación. Clic/tap y gestos táctiles también permiten seleccionar escenas. Cambiar de pestaña vuelve a la primera escena. Las fotos se precargan al entrar en la sección y el cambio entre escenas usa un fundido de 380 ms cuando hay movimiento habilitado. La rotación se pausa fuera de pantalla, al ocultar la pestaña y con la preferencia de movimiento reducido.

La primera imagen de Cruces conserva la fotografía original. Las otras escenas se crearon para ilustrar cada situación; procedencia y prompts en `docs/risk-image-prompts.md`. Los cuatro atlas WebP suman aproximadamente 1,3 MB. Cada tercio es una escena 4:3, sin deformación ni carga externa.

### Casco

Nueve porcentajes: ventana flotante con hover/foco en escritorio y diálogo nativo con clic/Enter/Espacio/tap. Cierre con botón, Escape o fondo; el foco vuelve al activador. Los nueve títulos y mensajes corresponden al copy entregado por el usuario el 26/10/2026. El modal de Mentón incluye una animación ilustrativa de rotura y revela «Por eso, abrocharlo no es opcional.» al terminar. Con movimiento reducido presenta el cierre directamente. Zonas y valores proceden de Figma; la ubicación es esquemática.

## Alineación y movimiento · 27/10/2026

Header, hero y footer comparten el mismo ancho y márgenes responsive mediante `--aca-shell-width`; el ancho del hero aprobado se conserva. La capa de movimiento incorpora entradas por capas, profundidad del collage con cursor/scroll en desktop, aparición de secciones/cards, conteo de estadísticas con valores accesibles estables, movimiento del fondo de campaña, progreso de lectura y respuestas en botones, menú, pestañas y modales. Se conserva el scroll nativo; las animaciones se reducen en mobile y se deshabilitan según la preferencia del usuario.

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

El CTA lleva a la página oficial informativa de Socio Moto, porque Figma no define destino y los enlaces de alta consultados no estaban operativos. Los tres datos FIA se conservan en mobile aunque el frame de 390 px no los incluye. No se declara una comparación pixel a pixel integral de todas las secciones. Se conservan `noindex,nofollow` y la falta de tracking externo para esta URL de revisión.

Detalles de diseño en `docs/approved-design.md` y continuidad en `HANDOFF.md`.
