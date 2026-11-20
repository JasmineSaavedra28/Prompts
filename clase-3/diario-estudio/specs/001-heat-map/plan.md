# Plan Técnico 001: Mapa de Calor de Estudio

## Archivos y Responsabilidades
| Archivo | Responsabilidad |
| :--- | :--- |
| `js/heatmap.js` | Módulo ES con funciones puras: cálculo de intensidad, agregación de minutos por día, generación de la matriz de 365 días y textos de tooltip. Sin DOM ni `localStorage`. |
| `js/date-utils.js` | Utilidades puras de fecha local (`AAAA-MM-DD`), suma/resta de días con `setDate()` y formateo `DD/MM/AAAA`. |
| `app.js` | Módulo ES de UI: lee `localStorage`, delega los cálculos en `js/heatmap.js` y pinta el DOM. |
| `index.html` | Agrega la sección `<section class="card heatmap-section">` con leyenda y contenedor de la grilla. `app.js` pasa a `type="module"`. |
| `styles.css` | Estilos de grilla (CSS Grid 53 columnas × 7 filas), niveles de color, leyenda y scroll horizontal en móvil. |
| `tests/heatmap.test.js` | Tests unitarios con `node --test`. |

## Funciones Puras (reciben `today` como parámetro)
```text
calculateIntensity(minutes) -> 0..4
    si minutes <= 0            -> 0
    si minutes <= 30           -> 1
    si minutes <= 60           -> 2
    si minutes <= 120          -> 3
    sino                       -> 4

aggregateMinutesByDate(sessions) -> Map<'AAAA-MM-DD', minutos>

buildHeatmapWeeks(sessions, today, days = 365) -> [{ date, minutes, intensity }]
    // 1. agregar minutos por fecha (ignorar fechas inválidas o futuras)
    // 2. desde hoy, retroceder (days - 1) días con setDate()
    // 3. devolver en orden cronológico ascendente

formatTooltip(date, minutes) -> "DD/MM/AAAA · N min"
```

## Algoritmo (pseudocódigo)
```text
LEER sesiones de localStorage
minutosPorDia = aggregateMinutesByDate(sesiones)
inicio = hoy - 364 días (setDate)
PARA cada día desde inicio HASTA hoy:
    minutos = minutosPorDia[día] o 0
    nivel = calculateIntensity(minutos)
    agregar celda { fecha, minutos, nivel }
DIBUJAR grilla agrupando por semana (columnas) y día de semana (filas)
```

## Decisiones
- **Se usa `setDate()`** para retroceder días, evitando aritmética de milisegundos y problemas de horario de verano.
- **La grilla se alinea por semanas** (columnas) para respetar el formato GitHub; la primera columna se rellena con celdas vacías hasta el lunes.
- **Los días futuros se excluyen** del agregado y del render.
- **Alternativa descartada**: pintar con `canvas`. Se descartó por accesibilidad (tooltips/títulos nativos), simplicidad y facilidad de testeo del DOM.

## Estrategia de Tests (`node --test`)
1. `calculateIntensity`: bordes 0, 1, 30, 31, 60, 61, 120, 121, 150 y valores negativos.
2. `aggregateMinutesByDate`: suma de múltiples sesiones del mismo día, fechas duplicadas, fechas futuras ignoradas, registros corruptos.
3. `buildHeatmapWeeks`: longitud exacta (365), último día = `today`, primer día = `today - 364`, nivel correcto por día, lista vacía.
4. `formatTooltip`: formato `DD/MM/AAAA` y plural/singular de minutos.
