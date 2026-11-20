/**
 * Lógica pura del objetivo semanal.
 * Sin DOM, sin localStorage: recibe sesiones y "hoy" como parámetros.
 */

import {
  addDays,
  isValidDateString,
  mondayFirstWeekday,
  todayLocalString
} from './date-utils.js';

export const MIN_WEEKLY_GOAL = 1;
export const MAX_WEEKLY_GOAL = 10080; // 7 días × 1440 minutos

/**
 * Rango de la semana calendario (lunes a domingo) que contiene `today`.
 */
export function getWeekRange(today = todayLocalString()) {
  const start = addDays(today, -mondayFirstWeekday(today));
  return { start, end: addDays(start, 6) };
}

/**
 * Un objetivo válido es un entero entre 1 y 10080 minutos.
 */
export function isValidWeeklyGoal(value) {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= MIN_WEEKLY_GOAL &&
    value <= MAX_WEEKLY_GOAL
  );
}

/**
 * Progreso de la semana actual frente al objetivo.
 * Ignora sesiones futuras, inválidas o con minutos no numéricos.
 */
export function calculateWeeklyProgress(
  sessions,
  today = todayLocalString(),
  goalMinutes = 0
) {
  const { start, end } = getWeekRange(today);
  const validGoal = isValidWeeklyGoal(goalMinutes);
  let minutes = 0;

  if (Array.isArray(sessions)) {
    for (const session of sessions) {
      if (!session || typeof session !== 'object') continue;
      const { date } = session;
      if (!isValidDateString(date)) continue;
      if (date < start || date > end) continue;
      if (date > today) continue; // futuro

      const value = Number(session.minutes);
      if (!Number.isFinite(value) || value <= 0) continue;
      minutes += value;
    }
  }

  if (!validGoal) {
    return {
      weekStart: start,
      weekEnd: end,
      minutes,
      goal: null,
      percentage: 0,
      remaining: 0,
      met: false,
      validGoal: false
    };
  }

  const met = minutes >= goalMinutes;
  return {
    weekStart: start,
    weekEnd: end,
    minutes,
    goal: goalMinutes,
    percentage: Math.min(100, Math.round((minutes / goalMinutes) * 100)),
    remaining: Math.max(0, goalMinutes - minutes),
    met,
    validGoal: true
  };
}

/**
 * "135" -> "2 h 15 min"; "60" -> "1 h"; "45" -> "45 min".
 */
export function formatMinutes(minutes) {
  const value = Number(minutes);
  if (!Number.isFinite(value) || value <= 0) return '0 min';

  const total = Math.floor(value);
  const hours = Math.floor(total / 60);
  const rest = total % 60;

  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours} h`;
  return `${hours} h ${rest} min`;
}
