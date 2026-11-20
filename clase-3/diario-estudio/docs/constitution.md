# Constitución del Proyecto Diario de Estudio

1. **Simplicidad primero**: HTML, CSS y JS puros en módulos ES. Sin dependencias de producción ni etapas de build.
2. **La spec manda**: Nada se implementa si no está definido previamente en la especificación activa (`specs/`).
3. **Lógica separada**: Funciones puras desacopladas del DOM y `localStorage`. Toda función dependiente de la fecha recibe `hoy` (`today`) como parámetro.
4. **Tests como puerta**: Cobertura con `node --test`. Prohibido dar por finalizada o avanzar de tarea con pruebas en rojo.
5. **Datos sagrados**: Compatibilidad total hacia atrás con la clave de `localStorage` (`diario-estudio-v1`) y uso exclusivo de hora local (`AAAA-MM-DD`).
6. **Idioma**: Código fuente e identificadores en inglés; interfaz de usuario, especificaciones y documentación en español.
