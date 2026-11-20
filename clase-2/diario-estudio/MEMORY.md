# MEMORY.md — Diario de Estudio (Clase 2)

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- **v2.0 funcional**: sesiones, racha actual, mejor racha histórica y **mapa de calor de 365 días**.
- Archivos: `index.html`, `styles.css`, `app.js`, `js/heatmap.js`, `js/date-utils.js`, `tests/heatmap.test.js`.
- 23 tests en verde con `node --test`.

## Decisiones (y por qué)
- **Módulos ES** (`type="module"`) para poder testear la lógica con Node; requiere servidor local (`npx serve .`).
- `package.json` solo declara `"type": "module"`: no hay dependencias de producción.
- Funciones puras en `js/heatmap.js` y `js/date-utils.js`; reciben `today` como parámetro.
- Fechas como texto `AAAA-MM-DD` en hora local; días se suman con `setDate()`.
- Intensidad: 0 min → 0; 1–30 → 1; 31–60 → 2; 61–120 → 3; >120 → 4.
- La grilla se agrupa por semana (columnas) con lunes como primera fila.

## Errores resueltos
- `toISOString()` y `new Date('AAAA-MM-DD')` desfasaban un día en ART (UTC-3): se usan componentes locales.
- Fechas futuras y registros corruptos se ignoran sin romper el render.
- `file://` bloquea módulos ES: hay que servir con `npx serve .` (o `python -m http.server`).

## Próximos pasos
- Captura móvil (375 px) y validación final con Chrome DevTools MCP.
- Filtrar el mapa de calor por materia (fuera de alcance de la spec 001).
