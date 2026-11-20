# Reglas del Proyecto: Diario de Estudio (Clase 2)

## Stack Técnico
- HTML5 semántico, CSS3 moderno (Flexbox/Grid) y JavaScript ES6+ puro (Módulos ES).
- Sin dependencias de npm en producción ni bundlers (Vite, Webpack).

## Manejo Crítico de Fechas
- NUNCA uses `new Date('AAAA-MM-DD')` ni `toISOString()` para fechas de entrada: interpretan UTC y desfasan un día en ART (UTC-3).
- Trabajá siempre con año, mes y día locales (`getFullYear()`, `getMonth() + 1`, `getDate()`).
- Sumar/restar días usando `setDate()`, nunca operaciones directas con milisegundos.

## Lógica & Especificaciones
- Leé `docs/constitution.md` y la spec activa en `specs/001-heat-map/spec.md` antes de modificar el código.
- Lógica aislada en funciones puras en `js/`.

## Límites
- No borres datos del usuario ni cambies la clave de localStorage (`diario-estudio-v1`).
- No instales dependencias de producción.

## Memoria
- Leé `MEMORY.md` al empezar y actualizalo al terminar cada tarea.

## Verificación & Tests
- Tests unitarios con `node --test` (deben quedar en verde antes de avanzar).
- Después de cada cambio visual, verificar con el MCP de Chrome DevTools: abrir la app con servidor local, probar la funcionalidad, revisar que la consola no tenga errores y comprobar la vista móvil (375 px).
