import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateIntensity,
  aggregateMinutesByDate,
  buildHeatmapWeeks,
  formatTooltip
} from '../js/heatmap.js';

// ---------------------------------------------------------------------------
// T2 · calculateIntensity
// ---------------------------------------------------------------------------
test('0 minutos es nivel 0', () => {
  assert.strictEqual(calculateIntensity(0), 0);
});

test('minutos negativos son nivel 0', () => {
  assert.strictEqual(calculateIntensity(-10), 0);
});

test('1 minuto es nivel 1', () => {
  assert.strictEqual(calculateIntensity(1), 1);
});

test('30 minutos es nivel 1', () => {
  assert.strictEqual(calculateIntensity(30), 1);
});

test('31 minutos es nivel 2', () => {
  assert.strictEqual(calculateIntensity(31), 2);
});

test('60 minutos es nivel 2', () => {
  assert.strictEqual(calculateIntensity(60), 2);
});

test('61 minutos es nivel 3', () => {
  assert.strictEqual(calculateIntensity(61), 3);
});

test('120 minutos es nivel 3', () => {
  assert.strictEqual(calculateIntensity(120), 3);
});

test('121 minutos es nivel 4', () => {
  assert.strictEqual(calculateIntensity(121), 4);
});

test('más de 120 minutos es nivel 4', () => {
  assert.strictEqual(calculateIntensity(150), 4);
});

// ---------------------------------------------------------------------------
// T3 · aggregateMinutesByDate
// ---------------------------------------------------------------------------
test('suma varias sesiones del mismo día', () => {
  const sessions = [
    { date: '2026-11-10', minutes: 30 },
    { date: '2026-11-10', minutes: 45 }
  ];
  const result = aggregateMinutesByDate(sessions);
  assert.strictEqual(result.get('2026-11-10'), 75);
});

test('ignora fechas futuras', () => {
  const sessions = [
    { date: '2026-11-10', minutes: 30 },
    { date: '2099-01-01', minutes: 60 }
  ];
  const result = aggregateMinutesByDate(sessions, '2026-11-19');
  assert.strictEqual(result.has('2099-01-01'), false);
  assert.strictEqual(result.get('2026-11-10'), 30);
});

test('ignora registros corruptos sin romper', () => {
  const sessions = [
    { date: '2026-11-10', minutes: 30 },
    { date: 'fecha-invalida', minutes: 20 },
    { date: '2026-13-45', minutes: 10 },
    { minutes: 5 },
    null
  ];
  const result = aggregateMinutesByDate(sessions, '2026-11-19');
  assert.strictEqual(result.size, 1);
  assert.strictEqual(result.get('2026-11-10'), 30);
});

test('lista vacía devuelve un mapa vacío', () => {
  assert.strictEqual(aggregateMinutesByDate([], '2026-11-19').size, 0);
});

// ---------------------------------------------------------------------------
// T4 · buildHeatmapWeeks
// ---------------------------------------------------------------------------
test('genera exactamente 365 días', () => {
  const cells = buildHeatmapWeeks([], '2026-11-19');
  assert.strictEqual(cells.length, 365);
});

test('el último día es hoy', () => {
  const cells = buildHeatmapWeeks([], '2026-11-19');
  assert.strictEqual(cells[cells.length - 1].date, '2026-11-19');
});

test('el primer día es hoy menos 364 días', () => {
  const cells = buildHeatmapWeeks([], '2026-11-19');
  assert.strictEqual(cells[0].date, '2025-11-20');
});

test('cada celda trae minutos e intensidad', () => {
  const sessions = [{ date: '2026-11-19', minutes: 75 }];
  const cells = buildHeatmapWeeks(sessions, '2026-11-19');
  const today = cells[cells.length - 1];
  assert.strictEqual(today.minutes, 75);
  assert.strictEqual(today.intensity, 3);
});

test('días sin sesiones son nivel 0', () => {
  const cells = buildHeatmapWeeks([], '2026-11-19');
  assert.ok(cells.every(c => c.minutes === 0 && c.intensity === 0));
});

test('cruza correctamente el cambio de año', () => {
  const cells = buildHeatmapWeeks([], '2026-01-05');
  assert.strictEqual(cells[0].date, '2025-01-06');
  assert.strictEqual(cells[cells.length - 1].date, '2026-01-05');
});

// ---------------------------------------------------------------------------
// T6 · formatTooltip
// ---------------------------------------------------------------------------
test('formatea fecha local DD/MM/AAAA y minutos', () => {
  assert.strictEqual(formatTooltip('2026-11-19', 45), '19/11/2026 · 45 min');
});

test('usa singular cuando hay 1 minuto', () => {
  assert.strictEqual(formatTooltip('2026-11-19', 1), '19/11/2026 · 1 min');
});

test('indica día sin estudio', () => {
  assert.strictEqual(formatTooltip('2026-11-19', 0), '19/11/2026 · Sin estudio');
});
