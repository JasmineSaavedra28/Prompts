# Material Symbols · Iconos locales

Los archivos SVG de esta carpeta provienen de **Material Symbols** (Google Fonts).

- Sitio: https://fonts.google.com/icons
- Repositorio: https://github.com/google/material-design-icons
- Licencia: **Apache License 2.0** — https://www.apache.org/licenses/LICENSE-2.0

Se descargaron una sola vez desde `fonts.gstatic.com` y se sirven localmente.
El proyecto **no** carga fuentes ni CDN en tiempo de ejecución.

## Archivos usados

| Archivo | Icono |
| :--- | :--- |
| `menu-book.svg` | `menu_book` |
| `fire.svg` | `local_fire_department` |
| `emoji-events.svg` | `emoji_events` |
| `flag.svg` | `flag` |
| `calendar-month.svg` | `calendar_month` |
| `add.svg` | `add` |
| `delete.svg` | `delete` |
| `timer.svg` | `timer` |
| `history.svg` | `history` |
| `grid-view.svg` | `grid_view` |
| `check-circle.svg` | `check_circle` |
| `insights.svg` | `insights` |

Los íconos se insertaron como **SVG inline** directamente en `index.html` y en
la plantilla del historial de `app.js`, usando los *paths* oficiales y
`fill: currentColor`, para que hereden el color del texto sin depender de
máscaras CSS, `<use>` ni peticiones extra.

Los archivos de esta carpeta son los originales descargados y quedan como
respaldo y trazabilidad de la licencia; la app no los solicita en tiempo de
ejecución.
