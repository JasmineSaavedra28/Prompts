# Reglas del Proyecto: Diario de Estudio (Clase 3)

## Stack Técnico
- HTML5 semántico, CSS3 moderno (Flexbox/Grid) y JavaScript ES6+ puro (Módulos ES).
- Sin dependencias de npm en producción ni bundlers (Vite, Webpack).

## Manejo Crítico de Fechas
- NUNCA uses `new Date('AAAA-MM-DD')` ni `toISOString()` para fechas de entrada: interpretan UTC y desfasan un día en ART (UTC-3).
- Trabajá siempre con año, mes y día locales (`getFullYear()`, `getMonth() + 1`, `getDate()`).
- Sumar/restar días usando `setDate()`, nunca operaciones directas con milisegundos.
- La semana del objetivo semanal es calendario: lunes a domingo, en hora local.

## Lógica & Especificaciones
- Leé `docs/constitution.md` y la spec activa antes de modificar el código.
- Specs vigentes: `specs/001-heat-map/` y `specs/002-weekly-goal/`.
- Lógica aislada en funciones puras en `js/` (reciben `today` como parámetro).

## Sistema Multiagente
- `coordinator` (primary): orquesta el flujo SDD y habla con el usuario. No edita ni ejecuta bash.
- `planner` (subagent): solo puede editar `specs/**`; nunca escribe código.
- `implementer` (subagent): ejecuta UNA tarea aprobada con TDD y se detiene.
- `reviewer` (subagent): solo lee, ejecuta `node --test` y `git diff/status`; nunca edita.
- Mínimo privilegio: no ampliar permisos sin justificarlo.

## Límites
- No borres datos del usuario ni cambies las claves `diario-estudio-v1` ni `diario-estudio-goal-v1`.
- No instales dependencias de producción.

## Diseño
- Estética editorial: fondo crema, tinta, un solo acento; sin tarjetas, sombras ni emojis.
- Jerarquía tipográfica con `clamp()`, `font-variant-numeric: tabular-nums` y mucho aire.
- Iconos **Material Symbols** como SVG inline con los *paths* oficiales dentro del HTML (sin `<use>`, sin máscaras); los archivos originales quedan en `assets/icons/` (Apache 2.0). Prohibido cargar icon-fonts, máscaras CSS o CDN en tiempo de ejecución.
- Mantener contraste AA, foco visible, targets táctiles de al menos 44 px y `prefers-reduced-motion`.
- Respetar la vista móvil de 375 px y usar `container queries` donde aporten.

## Memoria
- Leé `MEMORY.md` al empezar y actualizalo al terminar cada tarea.

## Verificación & Tests
- Tests unitarios con `node --test` (deben quedar en verde antes de avanzar).
- Después de cada cambio visual, verificar con el MCP de Chrome DevTools: abrir la app con servidor local, probar la funcionalidad, revisar que la consola no tenga errores y comprobar la vista móvil (375 px).
