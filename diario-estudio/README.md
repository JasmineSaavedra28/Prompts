# Diario de Estudio 📚

**I.S.F.T. N° 151 · Algoritmos y Estructuras de Datos III · Módulo 1**  
Aplicación web estática para registrar sesiones de estudio diaria y motivar a los estudiantes mediante el seguimiento de su racha actual y mejor racha histórica.

---

## 🚀 Características

- **Registro de Sesiones**: Formulario intuitivo para ingresar fecha, materia, tema y minutos de estudio.
- **Racha Actual (🔥)**: Cuenta los días consecutivos estudiando (la racha se mantiene viva si estudiaste hoy o ayer).
- **Mejor Racha Histórica (🏆)**: Registra el récord máximo alcanzado en todo tu historial de sesiones.
- **Manejo Correcto de Fechas**: Lógica basada 100% en hora local del usuario para evitar desfasajes por diferencia horaria UTC (desfase común en ART / UTC-3).
- **Sin Dependencias**: Desarrollado únicamente con HTML5 semántico, CSS3 moderno y JavaScript ES6+ puro.
- **Persistencia Local**: Los datos se guardan en el navegador mediante `localStorage` bajo la clave `diario-estudio-v1`.

---

## 📁 Estructura del Proyecto

```text
diario-estudio/
├── index.html       # Estructura semántica de la aplicación
├── styles.css       # Estilos visuales responsive (Flexbox / Grid)
├── app.js           # Lógica de negocio, persistencia y cálculo de rachas
├── AGENTS.md        # Guardarraíles y directivas para agentes de IA
└── MEMORY.md        # Memoria técnica persistente del proyecto
```

---

## 💻 Cómo Ejecutar la Aplicación

No requiere instalación, entorno Node.js ni servidor local.

1. Descarga o clona la carpeta del proyecto.
2. Abre el archivo `index.html` directamente haciendo **doble clic** o arrastrándolo a cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

---

## 🛡️ Arquitectura de IA & Harness Engineering

Este proyecto fue desarrollado utilizando técnicas avanzadas de orquestación de agentes de IA (*Harness Engineering* y *Context Engineering*):

- **AGENTS.md**: Define los límites y guardarraíles técnicos (stack prohibido, manejo estricto de fechas locales y reglas de racha).
- **MEMORY.md**: Mantiene el estado del proyecto entre sesiones de desarrollo para evitar regresiones.
- **Modo Plan / Build**: Utilizado para diseñar la función de *Mejor Racha Histórica* antes de realizar modificaciones en el código fuente.

---

## 🏫 Créditos

Desarrollado para la materia **Algoritmos y Estructuras de Datos III** del **I.S.F.T. N° 151**.
