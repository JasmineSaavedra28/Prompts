# Reglas del Proyecto: Diario de Estudio

## Stack Técnico
- HTML5 semántico, CSS3 moderno (Flexbox/Grid) y JavaScript ES6+ puro.
- Prohibido instalar paquetes npm o usar bundlers (Vite, Webpack).

## Manejo Crítico de Fechas
- NUNCA uses `new Date('AAAA-MM-DD')` ni `toISOString()` para fechas de entrada: interpretan UTC y desfasan un día en ART (UTC-3).
- Trabajá siempre con año, mes y día locales.

## Lógica de Racha Diaria
- Hay racha si existe al menos una sesión hoy o ayer.
- Ignorá las fechas futuras.
- Quitá fechas repetidas y ordená antes de contar.
- Mejor racha histórica: calcula el tramo consecutivo más largo alcanzado en el historial de sesiones.

## Límites
- No borres datos del usuario ni cambies la clave de localStorage (`diario-estudio-v1`).
- No instales dependencias.

## Memoria
- Leé `MEMORY.md` al empezar y actualizalo al terminar cada tarea.

## Verificación
- Probar la app abriendo `index.html` en el navegador.
