/**
 * Lógica pura del mapa de calor.
 * Sin DOM, sin localStorage: recibe las sesiones y "hoy" como parámetros.
 */

import {
  addDays,
  formatLocalDate,
  isValidDateString,
  mondayFirstWeekday,
  todayLocalString
} from './date-utils.js';

export const LEVEL_COLORS = [
  '#e2e8f0', // 0
  '#bbf7d0', // 1
  '#4ade80', // 2
  '#22c55e', // 3
  '#15803d'  // 4
];

export const LEVEL_LABELS = [
  'Sin estudio',
  '1–30 min',
  '31–60 min',
  '61–120 min',
  'Más de 120 min'
];

/**
 * Nivel de intensidad (0 a 4) según minutos acumulados en el día.
 */
export function calculateIntensity(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  if (minutes <= 30) return 1;
  if (minutes <= 60) return 2;
  if (minutes <= 120) return 3;
  return 4;
}

/**
 * Agrupa los minutos por fecha. Ignora fechas inválidas, futuras y
 * registros corruptos sin romper.
 * @returns {Map<string, number>}
 */
export function aggregateMinutesByDate(sessions, today = todayLocalString()) {
  const totals = new Map();
  if (!Array.isArray(sessions)) return totals;

  for (const session of sessions) {
    if (!session || typeof session !== 'object') continue;
    const { date, minutes } = session;
    if (!isValidDateString(date)) continue;
    if (date > today) continue;

    const value = Number(minutes);
    if (!Number.isFinite(value) || value <= 0) continue;

    totals.set(date, (totals.get(date) ?? 0) + value);
  }

  return totals;
}

/**
 * Genera las celdas del mapa, en orden cronológico ascendente.
 * @returns {Array<{date: string, minutes: number, intensity: number, weekday: number}>}
 */
export function buildHeatmapWeeks(sessions, today = todayLocalString(), days = 365) {
  const totals = aggregateMinutesByDate(sessions, today);
  const start = addDays(today, -(days - 1));
  const cells = [];

  for (let i = 0; i < days; i++) {
    const date = addDays(start, i);
    const minutes = totals.get(date) ?? 0;
    cells.push({
      date,
      minutes,
      intensity: calculateIntensity(minutes),
      weekday: mondayFirstWeekday(date)
    });
  }

  return cells;
}

/**
 * Agrupa las celdas en columnas semanales (lunes a domingo).
 */
export function groupCellsByWeek(cells) {
  if (!cells.length) return [];

  const weeks = [];
  let current = new Array(7).fill(null);

  for (const cell of cells) {
    if (cell.weekday === 0 && current.some(Boolean)) {
      weeks.push(current);
      current = new Array(7).fill(null);
    }
    current[cell.weekday] = cell;
  }

  if (current.some(Boolean)) weeks.push(current);
  return weeks;
}

/**
 * Texto del tooltip: "DD/MM/AAAA · 45 min" o "· Sin estudio".
 */
export function formatTooltip(date, minutes) {
  const prefix = formatLocalDate(date);
  if (!minutes || minutes <= 0) return `${prefix} · Sin estudio`;
  return `${prefix} · ${minutes} min`;
}
