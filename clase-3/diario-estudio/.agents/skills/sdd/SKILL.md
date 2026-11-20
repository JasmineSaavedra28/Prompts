---
name: sdd
description: Flujo Spec-Driven Development del Diario de Estudio. Úsala para crear specs, planes, tareas, implementar y validar.
---
## Flujo
1. **Constitución**: `docs/constitution.md` manda sobre todo.
2. **Spec**: requisitos numerados (RF-x) en EARS, con criterios de aceptación.
3. **Clarificación**: un revisor QA detecta ambigüedades sin proponer soluciones.
4. **Plan**: archivos, funciones puras (reciben `today`), algoritmo y estrategia de tests.
5. **Tareas**: 20–30 min cada una, en orden de dependencia, con «Hecho cuando:».
6. **Implementación**: TDD (test en rojo → código → verde). Una tarea por vez.
7. **Validación**: recorrer RF por RF con `node --test` y Chrome DevTools.

## Reglas
- Nada se implementa si no está en la spec activa.
- No avanzar con tests en rojo.
- Cada spec vive en `specs/NNN-nombre/` con `spec.md`, `plan.md` y `tasks.md`.
- Los cambios de alcance actualizan primero la spec.
