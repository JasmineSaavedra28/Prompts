/**
 * Utilidades de fecha 100% locales (nunca UTC).
 * Formato canónico: "AAAA-MM-DD".
 */

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Valida que el texto sea AAAA-MM-DD y una fecha real del calendario.
 */
export function isValidDateString(value) {
  if (typeof value !== 'string') return false;
  const match = DATE_RE.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/**
 * Convierte "AAAA-MM-DD" en un Date local a medianoche.
 */
export function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Convierte un Date a "AAAA-MM-DD" usando componentes locales.
 */
export function toLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Fecha de hoy (o la indicada) como "AAAA-MM-DD" en hora local.
 */
export function todayLocalString(date = new Date()) {
  return toLocalDateString(date);
}

/**
 * Suma (o resta) días usando setDate(), nunca milisegundos.
 */
export function addDays(dateStr, days) {
  const date = parseLocalDate(dateStr);
  date.setDate(date.getDate() + days);
  return toLocalDateString(date);
}

/**
 * "AAAA-MM-DD" -> "DD/MM/AAAA".
 */
export function formatLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Día de la semana con lunes = 0 ... domingo = 6.
 */
export function mondayFirstWeekday(dateStr) {
  return (parseLocalDate(dateStr).getDay() + 6) % 7;
}
