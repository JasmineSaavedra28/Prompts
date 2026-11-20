# Especificación 001: Mapa de Calor de Estudio (Heatmap)

## Contexto y Objetivo
Añadir a la aplicación "Diario de Estudio" una visualización gráfica de mapa de calor estilo GitHub que represente la actividad de estudio diaria. Cada día se representa por una celda cuyo color e intensidad varían según los minutos totales estudiados en esa jornada.

## Usuarios
Estudiantes que desean visualizar de un vistazo su constancia, ritmo de estudio y volumen de tiempo dedicado a lo largo del año.

## Historias de Usuario
- **HU-1**: Como estudiante, quiero ver un mapa de calor con los días del último año para evaluar visualmente mi constancia.
- **HU-2**: Como estudiante, quiero que el color de cada día refleje la intensidad del estudio (minutos acumulados).
- **HU-3**: Como estudiante, quiero pasar el cursor por un día para saber exactamente cuántos minutos estudié en esa fecha.

## Requisitos Funcionales (EARS)
- **RF-1 (ubicuo)**: EL SISTEMA mostrará una grilla interactiva que represente los últimos 365 días organizados en 7 filas (días de la semana: Lunes a Domingo).
- **RF-2 (evento)**: CUANDO el usuario registre o elimine una sesión de estudio, EL SISTEMA reestructurará y actualizará automáticamente el mapa de calor sin recargar la página.
- **RF-3 (estado)**: MIENTRAS los minutos acumulados de un día sean 0, EL SISTEMA pintará la celda con el Nivel 0 (gris tenue `#e2e8f0`).
- **RF-4 (error)**: SI `localStorage` contiene un registro corrupto o fecha inválida, ENTONCES EL SISTEMA lo ignorará y emitirá una advertencia por consola sin detener el renderizado.
- **RF-5 (ubicuo)**: EL SISTEMA calculará el nivel de intensidad en función de los minutos totales acumulados en el día según la siguiente regla:
  - **Nivel 0**: 0 minutos (`#e2e8f0`)
  - **Nivel 1**: 1 a 30 minutos (`#bbf7d0`)
  - **Nivel 2**: 31 a 60 minutos (`#4ade80`)
  - **Nivel 3**: 61 a 120 minutos (`#22c55e`)
  - **Nivel 4**: más de 120 minutos (`#15803d`)
- **RF-6 (evento)**: CUANDO el usuario interactúe con una celda (hover / tap), EL SISTEMA mostrará un tooltip con la fecha en formato local (`DD/MM/AAAA`) y los minutos totales estudiados.

## Requisitos No Funcionales
- **RNF-1**: Desempeño fluido en el navegador sin retraso noticeable al recalcular el año.
- **RNF-2**: Diseño responsive que permita desplazamiento horizontal en pantallas móviles si la grilla supera el ancho del dispositivo.

## Casos Límite
- Múltiples sesiones en el mismo día sumarán sus minutos para determinar el nivel de la celda.
- Días futuros no mostrarán celdas de actividad ni computarán minutos.
- Límites de rango de minutos (30 min es Nivel 1, 31 min es Nivel 2; 60 min es Nivel 2, 61 min es Nivel 3; 120 min es Nivel 3, 121 min es Nivel 4).

## Fuera de Alcance
- Filtrado por materias específicas dentro del mapa de calor (se reserva para futuras versiones).

## Criterios de Finalización
- Cobertura total de pruebas unitarias para `calculateIntensity` y generación de datos del mapa con `node --test`.
- Integración visual impecable en `index.html` con soporte móvil.
