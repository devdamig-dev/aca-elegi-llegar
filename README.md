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
- Flujo acordado: revisión y aprobación de esta versión en GitHub Pages; después se prepara la exportación PHP. Todavía no se generó ni se envió un paquete de entrega.

Para esa exportación: entregar `index.php` con todos los CSS, JS, imágenes y fuentes locales, conservar rutas relativas compatibles con el subdirectorio y evitar un `index.html` que compita como entrada. Actualizar canonical/og:url/og:image al dominio definitivo y retirar `noindex,nofollow` de la versión de producción. La revisión de GitHub conserva sus metadatos actuales. Comprobar la instalación real y GTM/Tag Assistant en el hosting del cliente; instalar el contenedor no verifica qué etiquetas o conversiones tiene configuradas dentro.

## Actualización 26/10/2026

Ocho secciones conforme al contenido aprobado, logo ACA original, nuevas estadísticas FIA y CTA «Conocé Socio Moto». Se retiraron las dos secciones de autos del diseño anterior.

### Lo que pasa en la calle

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

El CTA utiliza el destino de asociación confirmado por el cliente. Los tres datos FIA se conservan en mobile aunque el frame de 390 px no los incluye. No se declara una comparación pixel a pixel integral de todas las secciones. Se conserva `noindex,nofollow` para esta URL de revisión; el GTM solicitado ya forma parte de la landing.

Detalles de diseño en `docs/approved-design.md` y continuidad en `HANDOFF.md`.
