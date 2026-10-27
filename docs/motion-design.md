# ACA MOV · Motion y alineación

Actualización 27/10/2026. Alcance: igualar los contenedores de header/footer al hero y aportar más movimiento e interacción conservando la composición y los textos aprobados.

## Alineación

| Viewport | Ancho común | Margen por lado |
| --- | --- | --- |
| 390 px | 350 px | 20 px |
| 768 px | 704 px | 32 px |
| 1280 px | 960 px | 160 px |
| 1440 px | 1120 px | 160 px |
| 1920 px | 1320 px | 300 px |

Se reutiliza el ancho lógico del hero aprobado. Sus capas fotográficas y tarjetas conservan las posiciones propias del diseño, que pueden exceder el contenedor. El párrafo y la línea superior del footer ahora usan todo el contenedor.

## Movimiento

- Hero: entrada por capas de textos, foto principal, miniatura y tarjetas. Profundidad con cursor y leve movimiento ambiental solo en escritorio con puntero fino.
- Recorrido: entradas escalonadas de encabezados, grids y consejos. Fondo de campaña y camino acompañan el scroll nativo.
- Datos: nueve cifras cuentan una vez al entrar en pantalla, con texto accesible constante y formato final exacto.
- Navegación: estado del header, progreso fino de lectura y enlace activo únicamente para secciones representadas.
- Interacción: elevación de cards/CTA, movimiento de iconos, entrada del menú mobile, popovers y modales. Las pestañas animan el panel una vez al cambiar; la rotación de fotos no repite ese efecto.
- Fotos: fundido de 380 ms, con precarga de atlas cuando la sección entra en pantalla. Se conservan la rotación de 2 segundos, el hover que mantiene la foto y la ausencia de controles visibles.

## Rendimiento y accesibilidad

JavaScript/CSS nativos, sin dependencias nuevas. IntersectionObserver y un ciclo requestAnimationFrame coordinan la visibilidad, los contadores y las capas. Sin scroll hijack. Pausa al ocultar la pestaña y fuera de pantalla para ciclos ambientales y contadores. Mobile usa desplazamientos más simples y duraciones menores.

Movimiento reducido cancela los efectos, restaura las cifras exactas y conserva navegación/lectura. Los contenidos base no se ocultan con CSS: si faltan APIs o JavaScript, la página permanece visible.

## Verificación

62 comprobaciones funcionales: 41 de regresión, 6 de fundido y 15 de movimiento/fallback. Reportes en interaction-revision-verification.json, carousel-fade-verification.json y motion-verification.json. Estas pruebas no sustituyen la observación visual en navegador.

La comprobación directa del navegador se registra en `browser-motion-verification.json`. En escritorios de 1280–1439 px se ajustó el collage para mantener completas sus tarjetas; los frames de 1440 y 1920 conservan su escala aprobada. Los márgenes de la tabla se calculan sobre el ancho disponible, descontando la barra de scroll si ocupa espacio.
