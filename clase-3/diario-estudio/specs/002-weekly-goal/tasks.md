# Tareas 002: Objetivo Semanal de Estudio

> Orden de dependencia. Cada tarea: 20–30 min. No avanzar con tests en rojo.

- [x] **T1 · Rango de la semana** — Cubre: RF-1, RF-8.
  Implementar `getWeekRange(today)` en `js/weekly-goal.js` con tests de lunes, jueves, domingo y cruce de año.
  **Hecho cuando:** `node --test` confirma que la semana siempre va de lunes a domingo.

- [x] **T2 · Validación del objetivo** — Cubre: RF-9.
  Implementar `isValidWeeklyGoal(value)` y sus tests de borde (1, 10080, 0, negativos, decimales, texto).
  **Hecho cuando:** todos los casos inválidos devuelven `false`.

- [x] **T3 · Cálculo del progreso** — Cubre: RF-3, RF-5, RF-7.
  Implementar `calculateWeeklyProgress(sessions, today, goalMinutes)` con tests de suma, filtrado, meta exacta y meta superada.
  **Hecho cuando:** el porcentaje se topa en 100 y `remaining` nunca es negativo.

- [x] **T4 · Formato de minutos** — Cubre: RF-5.
  Implementar `formatMinutes(minutes)` con tests de 0, 45, 60 y 135.
  **Hecho cuando:** los textos son «0 min», «45 min», «1 h» y «2 h 15 min».

- [x] **T5 · Persistencia del objetivo** — Cubre: RF-2, RF-6.
  Leer y guardar el objetivo en `localStorage` (`diario-estudio-goal-v1`), ignorando valores corruptos.
  **Hecho cuando:** recargar la página conserva el objetivo y un valor corrupto no rompe la app.

- [x] **T6 · Interfaz del objetivo** — Cubre: RF-1, RF-2, RF-4, RF-5, RF-8.
  Agregar sección en `index.html`, estilos en `styles.css` y render en `app.js` con barra accesible.
  **Hecho cuando:** se ve el rango semanal, la barra y el texto de restante/cumplido.

- [x] **T7 · Integración con sesiones** — Cubre: RF-3.
  Recalcular el progreso al guardar y eliminar sesiones.
  **Hecho cuando:** registrar una sesión actualiza el porcentaje sin recargar.

- [x] **T8 · Validación final** — Cubre: criterios de finalización.
  Ejecutar `node --test`, revisar consola con Chrome DevTools y actualizar `AGENTS.md` + `MEMORY.md`.
  **Hecho cuando:** todos los tests en verde, consola sin errores y documentación al día.
