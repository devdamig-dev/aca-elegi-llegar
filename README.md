# ACA MOV — Elegí llegar

Landing estática HTML/CSS/JavaScript con Pathway Extreme local, basada en el Figma aprobado por el cliente.

- URL: https://devdamig-dev.github.io/aca-elegi-llegar/
- Repositorio: https://github.com/devdamig-dev/aca-elegi-llegar · rama `main`.
- Diseño: https://www.figma.com/design/JNI4aFQ7pVd3xB5lYZPA6H/ACA-MOV?node-id=0-1

## Actualización 26/10/2026

Ocho secciones conforme al contenido aprobado, logo ACA original, nuevas estadísticas FIA y CTA «Conocé Socio Moto». Se retiraron las dos secciones de autos del diseño anterior.

### Lo que pasa en la calle

Cuatro pestañas con los doce textos exactos entregados por el usuario. Cada pestaña tiene un carrusel manual de tres escenas. Flechas, indicadores, selección de ítems, teclado y gestos táctiles mantienen sincronizados imagen, texto y estado. Cambiar de pestaña vuelve a la primera escena. No hay reproducción automática.

La primera imagen de Cruces conserva la fotografía original. Las otras escenas se crearon para ilustrar cada situación; procedencia y prompts en `docs/risk-image-prompts.md`. Los cuatro atlas WebP suman aproximadamente 1,3 MB. Cada tercio es una escena 4:3, sin deformación ni carga externa.

### Casco

Nueve porcentajes: ventana flotante con hover/foco en escritorio y diálogo nativo con clic/Enter/Espacio/tap. Cierre con botón, Escape o fondo; el foco vuelve al activador. Las descripciones identifican la zona y el porcentaje de impactos registrado, sin convertirlo en una probabilidad de lesión. Zonas y valores proceden de Figma; la ubicación es esquemática.

## Archivos y despliegue

- `dist/index.html`: contenido y estructura.
- `dist/styles.css`: estilos originales y responsive.
- `dist/approved.css`: cambios generales del diseño aprobado.
- `dist/interactions.css`: carruseles y ventanas de detalle.
- `dist/app.js`: menú, pestañas, carrusel y casco.
- `dist/assets/`: imágenes, logo, íconos y fuente.

Subir `dist/` a cualquier hosting estático; no requiere compilación. `.github/workflows/pages.yml` publica esa carpeta al cambiarla en `main`. El repositorio continúa público para revisión con la autorización anterior. Volverlo privado queda pendiente de indicación del usuario y deshabilitaría Pages con su plan actual.

## Verificación y límites

34 comprobaciones DOM en `docs/interaction-verification.json`: textos, 12 escenas, 9 detalles, teclado, gestos, menú, ARIA y assets. Verificación de navegador documentada en `docs/browser-verification.json`.

El CTA lleva a la página oficial informativa de Socio Moto, porque Figma no define destino y los enlaces de alta consultados no estaban operativos. Los tres datos FIA se conservan en mobile aunque el frame de 390 px no los incluye. No se declara una comparación pixel a pixel integral de todas las secciones. Se conservan `noindex,nofollow` y la falta de tracking externo para esta URL de revisión.

Detalles de diseño en `docs/approved-design.md` y continuidad en `HANDOFF.md`.
