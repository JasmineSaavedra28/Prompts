# Diario de Estudio · Clase 2 📚🔥

**I.S.F.T. N° 151 · Algoritmos y Estructuras de Datos III · Módulo 2**  
Harness avanzado, MCP y Spec-Driven Development: se suma un **mapa de calor de estudio** estilo GitHub al Diario de Estudio de la Clase 1.

---

## 🚀 Funcionalidades

- Registro de sesiones (fecha, materia, tema, minutos).
- **Racha actual** 🔥 y **mejor racha histórica** 🏆.
- **Mapa de calor de 365 días**: cada celda representa un día y su intensidad depende de los minutos estudiados.
- Tooltip accesible con fecha y minutos (`DD/MM/AAAA · N min`).
- Resumen: minutos de la semana, del mes y días activos del último año.
- Persistencia en `localStorage` (`diario-estudio-v1`).
- Fechas 100 % locales (sin `toISOString()` ni `new Date('AAAA-MM-DD')`).

### Niveles de intensidad

| Nivel | Minutos | Color |
| :---: | :--- | :--- |
| 0 | 0 | `#e2e8f0` |
| 1 | 1–30 | `#bbf7d0` |
| 2 | 31–60 | `#4ade80` |
| 3 | 61–120 | `#22c55e` |
| 4 | más de 120 | `#15803d` |

---

## 📁 Estructura

```text
diario-estudio/
├── index.html
├── styles.css
├── app.js                  # UI (módulo ES)
├── js/
│   ├── heatmap.js          # lógica pura del mapa de calor
│   └── date-utils.js       # fechas locales (AAAA-MM-DD)
├── tests/
│   └── heatmap.test.js     # 23 tests con node --test
├── docs/
│   └── constitution.md     # 6 principios innegociables
├── specs/001-heat-map/
│   ├── spec.md             # requisitos RF-x en EARS
│   ├── plan.md             # diseño técnico
│   └── tasks.md            # tareas T1–T8
├── .opencode/commands/feature.md
├── .agents/skills/local-dates/SKILL.md
├── opencode.json           # MCP Chrome DevTools
├── package.json            # { "type": "module" }
├── AGENTS.md
└── MEMORY.md
```

---

## 💻 Cómo ejecutar

La app usa módulos ES, por lo que **no funciona con doble clic** (`file://`). Levantá un servidor local:

```bash
cd diario-estudio
npx serve .
# o: python -m http.server 8000
```

Abrí la URL que indique la consola (por ejemplo `http://localhost:3000`).

### Tests

```bash
node --test
```

Resultado esperado: **23 tests en verde**.

---

## 🛠️ Harness avanzado

- **Comando `/feature`**: planifica una funcionalidad antes de tocar código (`agent: plan`).
- **Skill `local-dates`**: el agente la carga al trabajar con fechas o rachas.
- **MCP Chrome DevTools**: configurado en `opencode.json` para abrir la app, revisar consola y validar la vista móvil.

---

## 📐 SDD (Spec-Driven Development)

1. `docs/constitution.md` — principios innegociables.
2. `specs/001-heat-map/spec.md` — el QUÉ y el POR QUÉ, con requisitos EARS.
3. `specs/001-heat-map/plan.md` — archivos, funciones puras, algoritmo y tests.
4. `specs/001-heat-map/tasks.md` — tareas de 20–30 minutos con criterio «Hecho cuando».
5. Implementación con **TDD**: primero el test en rojo, luego el código hasta el verde.
