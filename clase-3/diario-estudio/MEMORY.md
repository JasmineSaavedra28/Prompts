# MEMORY.md — Diario de Estudio (Clase 3)

Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
- **v3.2 funcional**: sesiones, rachas, mapa de calor de 365 días, **objetivo semanal** e interfaz **editorial**.
- Sistema multiagente en `.opencode/agents/`: `coordinator`, `planner`, `implementer`, `reviewer`.
- **45 tests en verde** con `node --test`. Lighthouse: accesibilidad 100, buenas prácticas 100.

## Decisiones (y por qué)
- Objetivo semanal en **semana calendario lunes–domingo** (hora local): la meta se renueva cada lunes.
- Clave separada `diario-estudio-goal-v1` para no tocar las sesiones (`diario-estudio-v1`).
- Objetivo válido = entero entre 1 y 10080 minutos (7 días × 1440).
- La barra se topa al 100 %; el texto muestra el total real y «¡Objetivo cumplido!».
- Objetivo inválido o corrupto = sin objetivo, con aviso por consola y estado vacío.
- **Diseño editorial**: crema/tinta/acento, líneas finas y tipografía grande; se eliminaron tarjetas, sombras y emojis.
- **Iconos Material Symbols inline** (los *paths* oficiales dentro de cada `<svg class="icon">`, con `fill: currentColor`): sin CDN, fuentes externas, `<use>` ni máscaras CSS. Los SVG originales quedan en `assets/icons/` como respaldo (Apache 2.0).
- Se mantienen los colores exactos del mapa de calor definidos en la spec 001.
- `planner` solo edita `specs/**`; `implementer` ejecuta una tarea por vez; `reviewer` nunca edita.

## Errores resueltos
- `toISOString()` y `new Date('AAAA-MM-DD')` desfasaban un día en ART (UTC-3): se usan componentes locales.
- El progreso semanal ignoraba mal las sesiones futuras: se filtra por `date <= today` además del rango.
- `file://` bloquea módulos ES: servir con `npx serve .`.

## Próximos pasos
- Captura móvil (375 px) y validación final con Chrome DevTools MCP.
- Historial de objetivos semanales (fuera de alcance de la spec 002).
