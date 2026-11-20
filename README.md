# Algoritmos y Estructuras de Datos III · I.S.F.T. N° 151

Repositorio con los laboratorios prácticos de la materia, organizados **por clase** para que cada entrega quede aislada.

---

## 📂 Estructura

```text
Prompts/
├── clase-1/
│   └── diario-estudio/     # Diario de Estudio: racha actual y mejor racha
├── clase-2/
│   └── diario-estudio/     # + Mapa de calor, SDD, TDD, /feature, skill y MCP
├── clase-3/
│   └── diario-estudio/     # + Sistema multiagente y objetivo semanal
├── prompts-originales/     # Prompts y guías originales del laboratorio
└── README.md
```

---

## 📘 Clase 1 · Diario de Estudio

Aplicación web estática para registrar sesiones de estudio y ver la racha de días consecutivos.

- Stack: HTML5, CSS3 y JavaScript puro (sin dependencias).
- Funciones: registro de sesiones, racha actual, mejor racha histórica e historial.
- Guardarraíles: `AGENTS.md` + `MEMORY.md`.
- Se abre con doble clic en `clase-1/diario-estudio/index.html`.

👉 Detalle completo: [`clase-1/diario-estudio/README.md`](./clase-1/diario-estudio/README.md)

---

## 📗 Clase 2 · Mapa de Calor de Estudio

Evolución del proyecto con harness avanzado, MCP y Spec-Driven Development.

- **Mapa de calor de 365 días** estilo GitHub según minutos estudiados.
- Módulos ES + lógica pura testeada con `node --test` (23 tests).
- Comando `/feature`, skill `local-dates` y MCP de Chrome DevTools.
- Artefactos SDD: `docs/constitution.md` y `specs/001-heat-map/` (spec, plan, tasks).
- Requiere servidor local: `cd clase-2/diario-estudio && npx serve .`

👉 Detalle completo: [`clase-2/diario-estudio/README.md`](./clase-2/diario-estudio/README.md)

---

## 📕 Clase 3 · Sistema Multiagente y Objetivo Semanal

Equipo de agentes de OpenCode que construye una funcionalidad completa con SDD.

- **Objetivo semanal** de minutos (semana calendario lunes–domingo) con barra de progreso accesible.
- Cuatro agentes con permisos mínimos: `coordinator`, `planner`, `implementer` y `reviewer`.
- Spec 002 con requisitos EARS, plan y tareas; revisión en paralelo con tres focos.
- 45 tests en verde con `node --test`.
- Requiere servidor local: `cd clase-3/diario-estudio && npx serve .`

👉 Detalle completo: [`clase-3/diario-estudio/README.md`](./clase-3/diario-estudio/README.md)

---

## 🧪 Tests (Clases 2 y 3)

```bash
cd clase-3/diario-estudio
node --test
```

---

## 🗂️ Material original

Los prompts y notas de trabajo quedaron archivados en [`prompts-originales/`](./prompts-originales/).
