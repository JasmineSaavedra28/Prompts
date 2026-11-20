# Estado del Proyecto (MEMORY.md)

## Estado Actual
- Versión: v1.1 funcional (con Racha Actual y Mejor Racha Histórica).
- Archivos: `index.html`, `styles.css`, `app.js`, `AGENTS.md`, `MEMORY.md`.

## Decisiones Tomadas
- Clave de localStorage: `'diario-estudio-v1'`.
- Fechas almacenadas estrictamente en formato `'AAAA-MM-DD'` en hora local.
- La interfaz muestra dos tarjetas destacadas: Racha Actual (🔥) y Mejor Racha Histórica (🏆).
- El listado de sesiones se ordena de la más reciente a la más antigua.
- Se incluye acción de borrado por sesión para facilitar la corrección de errores.

## Errores Resueltos
- `toISOString()` y `new Date('AAAA-MM-DD')` provocaban desfase de un día por diferencia horaria UTC en huso horario ART (UTC-3). Se resolvió manejando componentes locales (`getFullYear()`, `getMonth() + 1`, `getDate()`).
- Fechas futuras: se excluyen activamente del cálculo de racha.
- Días repetidos: varias sesiones el mismo día cuentan como 1 solo día de racha.

## Pendiente
- Posibilidad de filtrar sesiones por materia o exportar datos.
