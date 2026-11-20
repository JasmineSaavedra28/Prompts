# Plan Técnico 002: Objetivo Semanal de Estudio

## Archivos y Responsabilidades
| Archivo | Responsabilidad |
| :--- | :--- |
| `js/weekly-goal.js` | Funciones puras: rango de la semana, progreso, validación del objetivo y formato de minutos. Sin DOM ni `localStorage`. |
| `tests/weekly-goal.test.js` | Tests con `node --test` para RF-1, RF-5, RF-7, RF-8, RF-9 y casos límite. |
| `app.js` | Lee/guarda el objetivo, delega los cálculos y pinta el bloque de progreso. |
| `index.html` | Sección «Objetivo Semanal» con formulario, barra de progreso y textos de estado. |
| `styles.css` | Estilos del bloque, barra accesible y ajuste móvil. |

## Funciones Puras (reciben `today` como parámetro)
```text
getWeekRange(today) -> { start: 'AAAA-MM-DD', end: 'AAAA-MM-DD' }
    lunes = today - weekdayIndex (lunes = 0)
    domingo = lunes + 6

isValidWeeklyGoal(value) -> boolean
    entero, 1 <= value <= 10080

calculateWeeklyProgress(sessions, today, goalMinutes) -> {
    weekStart, weekEnd, minutes, goal, percentage, remaining, met, validGoal
}
    // 1. rango lunes–domingo con getWeekRange(today)
    // 2. sumar minutos de sesiones con fecha válida dentro del rango
    //    (ignorar futuras, inválidas y minutos no numéricos)
    // 3. percentage = min(100, round(minutes / goal * 100))
    // 4. remaining = max(0, goal - minutes); met = minutes >= goal

formatMinutes(minutes) -> "45 min" | "1 h" | "2 h 15 min"
```

## Algoritmo (pseudocódigo)
```text
LEER objetivo de localStorage (clave diario-estudio-goal-v1)
SI objetivo inválido -> estado vacío
rango = getWeekRange(hoy)
minutos = sumar sesiones dentro de [rango.start, rango.end]
progreso = calculateWeeklyProgress(sesiones, hoy, objetivo)
DIBUJAR barra con ancho = progreso.percentage %
DIBUJAR textos: "X de Y min", restante o "¡Objetivo cumplido!"
```

## Decisiones
- **Semana calendario lunes–domingo** (no últimos 7 días) para que la meta se renueve siempre el lunes.
- **Clave separada** `diario-estudio-goal-v1`: no se toca `diario-estudio-v1` ni se arriesgan las sesiones.
- **Tope visual del 100 %**: si se supera la meta, la barra no desborda; el texto muestra el total real.
- **Objetivo inválido = sin objetivo**: se avisa por consola y se muestra el estado vacío.
- **Alternativa descartada**: guardar el objetivo dentro del array de sesiones. Se descartó porque mezcla datos de configuración con datos históricos y complica la compatibilidad.

## Estrategia de Tests (`node --test`)
1. `getWeekRange`: lunes, jueves, domingo y cruce de año.
2. `isValidWeeklyGoal`: 1, 10080, 0, negativos, decimales, texto y `null`.
3. `calculateWeeklyProgress`: suma dentro de la semana, ignora otras semanas/futuras/corruptas, duplicados, meta exacta, meta superada, sin sesiones y objetivo inválido.
4. `formatMinutes`: 0, 45, 60, 135 y valores no numéricos.
