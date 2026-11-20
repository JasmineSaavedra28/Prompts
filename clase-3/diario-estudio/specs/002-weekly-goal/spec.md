# Spec 002: Objetivo Semanal de Estudio

**Estado:** aprobado  
**Depende de:** `docs/constitution.md`, Spec 001 (mapa de calor)

## Contexto y Objetivo
El Diario de Estudio ya muestra la actividad diaria y las rachas. Falta una meta concreta de volumen semanal que motive al estudiante a sostener el ritmo. Esta funcionalidad permite fijar un objetivo de minutos por semana y ver el progreso de la semana calendario actual.

## Usuarios
Estudiantes que quieren medir su constancia semanal y saber cuánto les falta para cumplir una meta personal.

## Historias de Usuario
- **HU-1**: Como estudiante, quiero fijar cuántos minutos quiero estudiar por semana para tener una meta clara.
- **HU-2**: Como estudiante, quiero ver cuánto llevo acumulado esta semana y qué porcentaje representa.
- **HU-3**: Como estudiante, quiero saber cuántos minutos me faltan o si ya cumplí el objetivo.

## Requisitos Funcionales (EARS)

- **RF-1 (ubicuo)**: EL SISTEMA mostrará el objetivo semanal configurado y el progreso de la **semana calendario actual (lunes a domingo, hora local)**.
- **RF-2 (evento)**: CUANDO el usuario guarde un objetivo válido, EL SISTEMA lo persistirá en `localStorage` con la clave `diario-estudio-goal-v1` y actualizará el progreso sin recargar la página.
- **RF-3 (evento)**: CUANDO el usuario registre o elimine una sesión de estudio, EL SISTEMA recalculará automáticamente los minutos de la semana y el porcentaje.
- **RF-4 (estado)**: MIENTRAS no exista un objetivo configurado, EL SISTEMA mostrará un estado vacío que invita a fijar uno y no mostrará porcentaje ni barra de progreso.
- **RF-5 (estado)**: MIENTRAS el progreso sea menor al 100 %, EL SISTEMA mostrará los minutos restantes; CUANDO alcance o supere el 100 %, mostrará «¡Objetivo cumplido!» y la barra quedará completa.
- **RF-6 (error)**: SI el objetivo guardado es inválido o corrupto, ENTONCES EL SISTEMA lo ignorará, avisará por consola y mostrará el estado vacío sin romper la pantalla.
- **RF-7 (ubicuo)**: EL SISTEMA ignorará sesiones con fechas futuras, fechas inválidas o minutos no numéricos al calcular el progreso semanal.
- **RF-8 (ubicuo)**: EL SISTEMA mostrará el rango de la semana actual en formato `DD/MM/AAAA – DD/MM/AAAA`.
- **RF-9 (evento)**: CUANDO el usuario intente guardar un objetivo que no sea un entero entre 1 y 10080 minutos, EL SISTEMA rechazará el valor y mostrará un mensaje de error accesible.

## Requisitos No Funcionales
- **RNF-1**: La barra de progreso debe ser accesible (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`).
- **RNF-2**: El bloque debe verse correctamente en móvil (375 px) sin desbordes horizontales.
- **RNF-3**: Los cálculos deben vivir en funciones puras, sin DOM ni `localStorage`, y recibir `today` como parámetro.

## Casos Límite
- Semana que cruza el cambio de año (ej.: 29/12/2025 – 04/01/2026).
- Hoy es lunes o domingo: el rango debe seguir siendo el mismo lunes–domingo.
- Varias sesiones el mismo día: suman todos sus minutos.
- Objetivo superado: porcentaje se muestra tope 100 %, restante 0 y estado cumplido.
- Objetivo exacto: se considera cumplido.
- Sin sesiones en la semana: progreso 0 %.
- Objetivo ausente, `0`, negativo, decimal, texto o mayor a 10080: se trata como inválido.

## Fuera de Alcance
- Notificaciones, recordatorios o correos.
- Historial de objetivos de semanas anteriores.
- Objetivos por materia.
- Rachas basadas en el objetivo semanal.

## Criterios de Finalización
- Tests unitarios de rango semanal, progreso, validación y formato en verde con `node --test`.
- Interfaz integrada, accesible y verificada en el navegador (consola sin errores).
- `AGENTS.md` y `MEMORY.md` actualizados.

## Dudas Abiertas
Ninguna: las decisiones de semana calendario (lunes–domingo), clave separada de `localStorage` y tope visual del 100 % quedaron resueltas en la clarificación.
