# Tareas 001: Mapa de Calor de Estudio

> Orden de dependencia. Cada tarea: 20–30 min. No avanzar con tests en rojo.

- [x] **T1 · Migrar a módulos ES** — Cubre: base técnica (constitución).
  Mover utilidades de fecha a `js/date-utils.js` y cambiar `app.js` a `type="module"` en `index.html`.
  **Hecho cuando:** la app funciona servida con `npx serve .` y la consola no muestra errores.

- [x] **T2 · Función `calculateIntensity`** — Cubre: RF-3, RF-5.
  Escribir primero `tests/heatmap.test.js` con los bordes 0, 1, 30, 31, 60, 61, 120, 121, 150 y negativos. Implementar en `js/heatmap.js` hasta ver verde.
  **Hecho cuando:** `node --test` pasa todos los casos de intensidad.

- [x] **T3 · Agregación de minutos por día** — Cubre: RF-4, casos límite.
  Implementar `aggregateMinutesByDate(sessions)` con `node --test`: suma del mismo día, ignora futuras y registros corruptos.
  **Hecho cuando:** los tests de agregación pasan y una fecha futura no aparece en el resultado.

- [x] **T4 · Construcción de la grilla de 365 días** — Cubre: RF-1.
  Implementar `buildHeatmapWeeks(sessions, today, days = 365)` con `setDate()`.
  **Hecho cuando:** `node --test` verifica 365 celdas, última = `today` y primera = `today - 364`.

- [x] **T5 · Render del mapa de calor** — Cubre: RF-1, RF-2, RF-3, RF-5.
  Agregar la sección en `index.html`, los estilos en `styles.css` y el render en `app.js`.
  **Hecho cuando:** la grilla se ve en el navegador y se actualiza al guardar/eliminar una sesión.

- [x] **T6 · Tooltip accesible** — Cubre: RF-6.
  Agregar `title` y tooltip visual con `formatTooltip(date, minutes)`.
  **Hecho cuando:** al pasar el cursor por una celda se ve `DD/MM/AAAA · N min`.

- [x] **T7 · Responsive y leyenda** — Cubre: RNF-2.
  Scroll horizontal en móvil (375 px) y leyenda «Menos → Más».
  **Hecho cuando:** en 375 px la grilla se desplaza sin romper el layout.

- [x] **T8 · Validación final** — Cubre: criterios de finalización.
  Recorrer la spec RF por RF con `node --test` y Chrome DevTools (0 errores en consola).
  **Hecho cuando:** todos los tests en verde y AGENTS.md + MEMORY.md actualizados.

