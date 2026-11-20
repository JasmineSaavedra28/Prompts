import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getWeekRange,
  isValidWeeklyGoal,
  calculateWeeklyProgress,
  formatMinutes
} from '../js/weekly-goal.js';

// ---------------------------------------------------------------------------
// T1 · getWeekRange (lunes a domingo, hora local)
// ---------------------------------------------------------------------------
test('jueves pertenece a la semana del lunes 16 al domingo 22', () => {
  const range = getWeekRange('2026-11-19');
  assert.deepEqual(range, { start: '2026-11-16', end: '2026-11-22' });
});

test('lunes es el inicio de su propia semana', () => {
  const range = getWeekRange('2026-11-16');
  assert.deepEqual(range, { start: '2026-11-16', end: '2026-11-22' });
});

test('domingo cierra la semana que empezó el lunes', () => {
  const range = getWeekRange('2026-11-22');
  assert.deepEqual(range, { start: '2026-11-16', end: '2026-11-22' });
});

test('la semana cruza el cambio de año', () => {
  const range = getWeekRange('2026-01-01');
  assert.deepEqual(range, { start: '2025-12-29', end: '2026-01-04' });
});

test('la semana cruza el cambio de mes', () => {
  const range = getWeekRange('2026-12-01');
  assert.deepEqual(range, { start: '2026-11-30', end: '2026-12-06' });
});

// ---------------------------------------------------------------------------
// T2 · isValidWeeklyGoal
// ---------------------------------------------------------------------------
test('1 minuto es un objetivo válido', () => {
  assert.strictEqual(isValidWeeklyGoal(1), true);
});

test('10080 minutos (una semana) es un objetivo válido', () => {
  assert.strictEqual(isValidWeeklyGoal(10080), true);
});

test('0, negativos, decimales, texto y null son inválidos', () => {
  assert.strictEqual(isValidWeeklyGoal(0), false);
  assert.strictEqual(isValidWeeklyGoal(-30), false);
  assert.strictEqual(isValidWeeklyGoal(1.5), false);
  assert.strictEqual(isValidWeeklyGoal('300'), false);
  assert.strictEqual(isValidWeeklyGoal(null), false);
  assert.strictEqual(isValidWeeklyGoal(undefined), false);
  assert.strictEqual(isValidWeeklyGoal(10081), false);
});

// ---------------------------------------------------------------------------
// T3 · calculateWeeklyProgress
// ---------------------------------------------------------------------------
test('suma solo las sesiones dentro de la semana', () => {
  const sessions = [
    { date: '2026-11-16', minutes: 30 }, // lunes de la semana
    { date: '2026-11-19', minutes: 45 }, // jueves de la semana
    { date: '2026-11-15', minutes: 60 }, // domingo anterior
    { date: '2026-11-23', minutes: 90 }  // lunes siguiente
  ];
  const progress = calculateWeeklyProgress(sessions, '2026-11-19', 300);
  assert.strictEqual(progress.minutes, 75);
  assert.strictEqual(progress.weekStart, '2026-11-16');
  assert.strictEqual(progress.weekEnd, '2026-11-22');
});

test('varias sesiones del mismo día suman', () => {
  const sessions = [
    { date: '2026-11-19', minutes: 30 },
    { date: '2026-11-19', minutes: 20 }
  ];
  assert.strictEqual(calculateWeeklyProgress(sessions, '2026-11-19', 300).minutes, 50);
});

test('ignora sesiones futuras dentro de la semana', () => {
  const sessions = [
    { date: '2026-11-19', minutes: 40 },
    { date: '2026-11-20', minutes: 100 } // viernes futuro respecto de hoy jueves
  ];
  const progress = calculateWeeklyProgress(sessions, '2026-11-19', 300);
  assert.strictEqual(progress.minutes, 40);
});

test('ignora registros corruptos sin romper', () => {
  const sessions = [
    { date: '2026-11-19', minutes: 40 },
    { date: 'fecha-invalida', minutes: 50 },
    { date: '2026-13-40', minutes: 10 },
    { date: '2026-11-18', minutes: 'mucho' },
    null
  ];
  assert.strictEqual(calculateWeeklyProgress(sessions, '2026-11-19', 300).minutes, 40);
});

test('calcula porcentaje, restante y estado no cumplido', () => {
  const sessions = [{ date: '2026-11-19', minutes: 75 }];
  const progress = calculateWeeklyProgress(sessions, '2026-11-19', 300);
  assert.strictEqual(progress.percentage, 25);
  assert.strictEqual(progress.remaining, 225);
  assert.strictEqual(progress.met, false);
  assert.strictEqual(progress.validGoal, true);
});

test('objetivo exacto se considera cumplido', () => {
  const sessions = [{ date: '2026-11-19', minutes: 300 }];
  const progress = calculateWeeklyProgress(sessions, '2026-11-19', 300);
  assert.strictEqual(progress.percentage, 100);
  assert.strictEqual(progress.remaining, 0);
  assert.strictEqual(progress.met, true);
});

test('objetivo superado topa el porcentaje en 100 y el restante en 0', () => {
  const sessions = [{ date: '2026-11-19', minutes: 450 }];
  const progress = calculateWeeklyProgress(sessions, '2026-11-19', 300);
  assert.strictEqual(progress.percentage, 100);
  assert.strictEqual(progress.remaining, 0);
  assert.strictEqual(progress.met, true);
});

test('sin sesiones el progreso es 0 %', () => {
  const progress = calculateWeeklyProgress([], '2026-11-19', 300);
  assert.strictEqual(progress.minutes, 0);
  assert.strictEqual(progress.percentage, 0);
  assert.strictEqual(progress.remaining, 300);
  assert.strictEqual(progress.met, false);
});

test('objetivo inválido se marca como no válido', () => {
  const progress = calculateWeeklyProgress([], '2026-11-19', 0);
  assert.strictEqual(progress.validGoal, false);
  assert.strictEqual(progress.percentage, 0);
  assert.strictEqual(progress.met, false);
});

// ---------------------------------------------------------------------------
// T4 · formatMinutes
// ---------------------------------------------------------------------------
test('0 minutos se muestra como "0 min"', () => {
  assert.strictEqual(formatMinutes(0), '0 min');
});

test('45 minutos se muestra como "45 min"', () => {
  assert.strictEqual(formatMinutes(45), '45 min');
});

test('60 minutos se muestra como "1 h"', () => {
  assert.strictEqual(formatMinutes(60), '1 h');
});

test('135 minutos se muestra como "2 h 15 min"', () => {
  assert.strictEqual(formatMinutes(135), '2 h 15 min');
});

test('valores no numéricos o negativos se muestran como "0 min"', () => {
  assert.strictEqual(formatMinutes(-5), '0 min');
  assert.strictEqual(formatMinutes('abc'), '0 min');
});
