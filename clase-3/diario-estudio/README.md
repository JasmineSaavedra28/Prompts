# Diario de Estudio · Clase 3 📚🔥🎯

**I.S.F.T. N° 151 · Algoritmos y Estructuras de Datos III · Módulo 3**  
Sistemas multiagente: un equipo de agentes de OpenCode construye el **objetivo semanal de estudio** siguiendo SDD y TDD.

---

## 🚀 Funcionalidades

- Registro de sesiones (fecha, materia, tema, minutos).
- Racha actual y mejor racha histórica.
- Mapa de calor de 365 días.
- **Objetivo semanal**: meta de minutos, progreso de la semana (lunes–domingo), porcentaje, restante y estado cumplido.
- Persistencia: sesiones en `diario-estudio-v1` y objetivo en `diario-estudio-goal-v1`.
- Fechas 100 % locales (sin `toISOString()` ni `new Date('AAAA-MM-DD')`).

---

## 🎨 Interfaz editorial

Rediseño sin dependencias, alejado del cliché de tarjetas y emojis:

- Fondo crema, tinta y un solo acento naranja; líneas finas en lugar de cajas con sombra.
- Números grandes, etiquetas en mayúsculas y mucho aire.
- Tipografía fluida con `clamp()` y cifras tabulares.
- Layout asimétrico con Grid y `container queries`.
- Formularios con borde inferior, no cajas.
- Historial como línea de tiempo con hairlines.
- **Iconos Material Symbols** como SVG inline con los *paths* oficiales: sin CDN, icon-fonts, `<use>` ni máscaras CSS. Los SVG originales quedan en `assets/icons/` como respaldo (Apache 2.0).
- Enlace «Saltar al contenido», foco visible, `aria-live` y `prefers-reduced-motion`.
- Lighthouse: **accesibilidad 100**, **buenas prácticas 100** y **SEO 100**.

---

## 🤖 Sistema multiagente

| Agente | Modo | Permisos |
| :--- | :--- | :--- |
| `coordinator` | primary | Sin edición, bash ni web; delega en `planner`, `implementer` y `reviewer`. |
| `planner` | subagent | Solo edita `specs/**`; sin bash ni web. |
| `implementer` | subagent | Bash permitido; ejecuta una tarea por vez con TDD. |
| `reviewer` | subagent | Solo lectura; `node --test`, `git diff*` y `git status`. |

Flujo: **spec → clarificación → plan → tareas → implementación → validación**, con paradas para aprobación humana.

---

## 📁 Estructura

```text
diario-estudio/
├── index.html
├── styles.css
├── app.js
├── js/
│   ├── heatmap.js
│   ├── weekly-goal.js      # lógica pura del objetivo semanal
│   └── date-utils.js
├── tests/
│   ├── heatmap.test.js
│   └── weekly-goal.test.js # 45 tests en total
├── assets/
│   └── icons/              # Material Symbols SVG locales + LICENSE
├── docs/
│   └── constitution.md
├── specs/
│   ├── 001-heat-map/
│   └── 002-weekly-goal/    # spec, plan, tasks y review
├── .opencode/
│   ├── agents/             # coordinator, planner, implementer, reviewer
│   └── commands/feature.md
├── .agents/skills/
│   ├── local-dates/
│   └── sdd/
├── opencode.json           # MCP Chrome DevTools
├── package.json
├── AGENTS.md
└── MEMORY.md
```

---

## 💻 Cómo ejecutar

```bash
cd diario-estudio
npx serve .
```

Abrí la URL que indica la consola (los módulos ES no funcionan con `file://`).

### Tests

```bash
node --test
```

Resultado esperado: **45 tests en verde**.

---

## 🎯 Reglas del objetivo semanal

- Semana calendario **lunes a domingo** en hora local.
- Objetivo válido: entero entre **1 y 10080** minutos.
- Se ignoran sesiones futuras, fechas inválidas y minutos no numéricos.
- Si se supera la meta, la barra queda al 100 % y el texto muestra «¡Objetivo cumplido!».
