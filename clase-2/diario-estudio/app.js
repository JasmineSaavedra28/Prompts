/**
 * Diario de Estudio · UI
 * Lee y escribe localStorage; delega los cálculos en js/heatmap.js.
 * Fechas siempre locales (ver js/date-utils.js).
 */

import {
  addDays,
  formatLocalDate,
  isValidDateString,
  todayLocalString
} from './js/date-utils.js';
import {
  LEVEL_COLORS,
  LEVEL_LABELS,
  buildHeatmapWeeks,
  formatTooltip,
  groupCellsByWeek
} from './js/heatmap.js';

const STORAGE_KEY = 'diario-estudio-v1';

// Elementos del DOM
const sessionForm = document.getElementById('sessionForm');
const sessionDateInput = document.getElementById('sessionDate');
const sessionSubjectInput = document.getElementById('sessionSubject');
const sessionTopicInput = document.getElementById('sessionTopic');
const sessionMinutesInput = document.getElementById('sessionMinutes');

const currentStreakDisplay = document.getElementById('currentStreakDisplay');
const currentStreakUnit = document.getElementById('currentStreakUnit');
const bestStreakDisplay = document.getElementById('bestStreakDisplay');
const bestStreakUnit = document.getElementById('bestStreakUnit');

const sessionList = document.getElementById('sessionList');
const emptyHistory = document.getElementById('emptyHistory');
const sessionCountBadge = document.getElementById('sessionCountBadge');

const heatmapGrid = document.getElementById('heatmapGrid');
const heatmapMonths = document.getElementById('heatmapMonths');
const heatmapTooltip = document.getElementById('heatmapTooltip');
const heatmapSummary = document.getElementById('heatmapSummary');
const heatmapLegend = document.getElementById('heatmapLegend');

// ==========================================================================
// Persistencia
// ==========================================================================

function getStoredSessions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Formato inesperado');
    return parsed;
  } catch (error) {
    console.warn('Registro corrupto en localStorage, se ignora:', error);
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

// ==========================================================================
// Rachas (fechas locales, sin UTC)
// ==========================================================================

function diffDays(dateStrA, dateStrB) {
  const [yA, mA, dA] = dateStrA.split('-').map(Number);
  const [yB, mB, dB] = dateStrB.split('-').map(Number);
  return Math.round(
    (Date.UTC(yA, mA - 1, dA) - Date.UTC(yB, mB - 1, dB)) / 86400000
  );
}

function getValidUniqueDatesAscending(sessions, today) {
  const dateSet = new Set();
  for (const session of sessions) {
    if (session && isValidDateString(session.date) && session.date <= today) {
      dateSet.add(session.date);
    }
  }
  return Array.from(dateSet).sort();
}

function calculateCurrentStreak(sessions, today = todayLocalString()) {
  const datesAsc = getValidUniqueDatesAscending(sessions, today);
  if (datesAsc.length === 0) return 0;

  const datesDesc = [...datesAsc].reverse();
  if (diffDays(today, datesDesc[0]) > 1) return 0;

  let streak = 1;
  for (let i = 0; i < datesDesc.length - 1; i++) {
    if (diffDays(datesDesc[i], datesDesc[i + 1]) !== 1) break;
    streak++;
  }
  return streak;
}

function calculateBestStreak(sessions, today = todayLocalString()) {
  const datesAsc = getValidUniqueDatesAscending(sessions, today);
  if (datesAsc.length === 0) return 0;

  let best = 1;
  let run = 1;
  for (let i = 1; i < datesAsc.length; i++) {
    if (diffDays(datesAsc[i], datesAsc[i - 1]) === 1) {
      run++;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

// ==========================================================================
// Mapa de calor
// ==========================================================================

const MONTH_NAMES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
];

function renderHeatmap(sessions, today) {
  const cells = buildHeatmapWeeks(sessions, today);
  const weeks = groupCellsByWeek(cells);

  heatmapGrid.innerHTML = '';
  heatmapGrid.style.setProperty('--weeks', weeks.length);

  const fragment = document.createDocumentFragment();

  weeks.forEach((week, weekIndex) => {
    week.forEach((cell, dayIndex) => {
      const square = document.createElement('div');
      square.className = 'heatmap-cell';

      if (!cell) {
        square.classList.add('heatmap-cell--empty');
        square.setAttribute('aria-hidden', 'true');
        square.style.gridColumn = String(weekIndex + 1);
        square.style.gridRow = String(dayIndex + 1);
        fragment.appendChild(square);
        return;
      }

      square.dataset.date = cell.date;
      square.dataset.minutes = String(cell.minutes);
      square.dataset.level = String(cell.intensity);
      square.style.backgroundColor = LEVEL_COLORS[cell.intensity];
      square.style.gridColumn = String(weekIndex + 1);
      square.style.gridRow = String(dayIndex + 1);

      const label = cell.intensity > 0
        ? `${formatTooltip(cell.date, cell.minutes)} · ${LEVEL_LABELS[cell.intensity]}`
        : formatTooltip(cell.date, cell.minutes);
      square.setAttribute('role', 'img');
      square.setAttribute('aria-label', label);
      square.setAttribute('title', label);

      fragment.appendChild(square);
    });
  });

  heatmapGrid.appendChild(fragment);

  renderHeatmapMonths(cells, weeks.length);
  renderHeatmapSummary(sessions, today);
}

function renderHeatmapMonths(cells, weekCount) {
  heatmapMonths.innerHTML = '';
  heatmapMonths.style.setProperty('--weeks', weekCount);

  let lastMonth = -1;
  cells.forEach((cell, index) => {
    const month = Number(cell.date.slice(5, 7));
    if (month === lastMonth) return;
    lastMonth = month;

    const label = document.createElement('span');
    label.className = 'heatmap-month';
    label.textContent = MONTH_NAMES[month - 1];
    label.style.gridColumn = String(Math.floor(index / 7) + 1);
    heatmapMonths.appendChild(label);
  });
}

function renderHeatmapSummary(sessions, today) {
  const weekStart = addDays(today, -6);
  const monthStart = `${today.slice(0, 7)}-01`;

  let weekMinutes = 0;
  let monthMinutes = 0;
  const monthDays = new Set();

  for (const session of sessions) {
    if (!session || !isValidDateString(session.date)) continue;
    const minutes = Number(session.minutes);
    if (!Number.isFinite(minutes) || minutes <= 0) continue;

    if (session.date >= weekStart && session.date <= today) {
      weekMinutes += minutes;
    }
    if (session.date >= monthStart && session.date <= today) {
      monthMinutes += minutes;
      monthDays.add(session.date);
    }
  }

  const uniqueActiveDays = new Set(
    sessions
      .filter(s => s && isValidDateString(s.date) && s.date >= addDays(today, -364) && s.date <= today)
      .map(s => s.date)
  ).size;

  heatmapSummary.textContent =
    `Esta semana: ${weekMinutes} min · Este mes: ${monthMinutes} min en ${monthDays.size} día(s) · ` +
    `Último año: ${uniqueActiveDays} día(s) con estudio`;
}

function renderHeatmapLegend() {
  heatmapLegend.innerHTML = '';
  const caption = document.createElement('span');
  caption.textContent = 'Menos';
  heatmapLegend.appendChild(caption);

  LEVEL_COLORS.forEach((color, level) => {
    const box = document.createElement('span');
    box.className = 'heatmap-legend-box';
    box.style.backgroundColor = color;
    box.title = LEVEL_LABELS[level];
    heatmapLegend.appendChild(box);
  });

  const captionEnd = document.createElement('span');
  captionEnd.textContent = 'Más';
  heatmapLegend.appendChild(captionEnd);
}

function setupHeatmapTooltip() {
  heatmapGrid.addEventListener('mouseover', event => {
    const cell = event.target.closest('.heatmap-cell[data-date]');
    if (!cell) return;
    heatmapTooltip.textContent = formatTooltip(
      cell.dataset.date,
      Number(cell.dataset.minutes)
    );
    heatmapTooltip.hidden = false;
  });

  heatmapGrid.addEventListener('mouseout', event => {
    if (!event.target.closest('.heatmap-cell[data-date]')) return;
    heatmapTooltip.hidden = true;
  });
}

// ==========================================================================
// Historial
// ==========================================================================

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function renderSessionList(sessions) {
  sessionList.innerHTML = '';

  if (sessions.length === 0) {
    emptyHistory.style.display = 'block';
    return;
  }

  emptyHistory.style.display = 'none';

  const sorted = [...sessions].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return (b.id || 0) - (a.id || 0);
  });

  for (const session of sorted) {
    const li = document.createElement('li');
    li.className = 'session-item';
    li.innerHTML = `
      <div class="session-main">
        <div class="session-header-row">
          <span class="session-subject">${escapeHtml(session.subject)}</span>
          <span class="session-date-pill">${formatLocalDate(session.date)}</span>
        </div>
        <p class="session-topic">${escapeHtml(session.topic)}</p>
      </div>
      <div class="session-side">
        <span class="session-minutes">⏱ ${session.minutes} min</span>
        <button type="button" class="btn-delete" aria-label="Eliminar sesión" data-id="${session.id}">✕</button>
      </div>
    `;
    sessionList.appendChild(li);
  }
}

// ==========================================================================
// Render general
// ==========================================================================

function updateUI() {
  const sessions = getStoredSessions();
  const today = todayLocalString();

  const currentStreak = calculateCurrentStreak(sessions, today);
  const bestStreak = calculateBestStreak(sessions, today);

  currentStreakDisplay.textContent = currentStreak;
  currentStreakUnit.textContent = currentStreak === 1 ? 'día consecutivo' : 'días consecutivos';

  bestStreakDisplay.textContent = bestStreak;
  bestStreakUnit.textContent = bestStreak === 1 ? 'día récord' : 'días récord';

  sessionCountBadge.textContent =
    `${sessions.length} ${sessions.length === 1 ? 'sesión' : 'sesiones'}`;

  renderSessionList(sessions);
  renderHeatmap(sessions, today);
}

// ==========================================================================
// Eventos
// ==========================================================================

sessionForm.addEventListener('submit', event => {
  event.preventDefault();

  const date = sessionDateInput.value;
  const subject = sessionSubjectInput.value.trim();
  const topic = sessionTopicInput.value.trim();
  const minutes = parseInt(sessionMinutesInput.value, 10);

  if (!isValidDateString(date)) {
    alert('La fecha no es válida.');
    return;
  }
  if (!subject || !topic) {
    alert('Completá la materia y el tema.');
    return;
  }
  if (!Number.isFinite(minutes) || minutes <= 0 || minutes > 1440) {
    alert('Los minutos deben estar entre 1 y 1440.');
    return;
  }

  const sessions = getStoredSessions();
  sessions.push({ id: Date.now(), date, subject, topic, minutes });
  saveSessions(sessions);

  sessionSubjectInput.value = '';
  sessionTopicInput.value = '';
  sessionMinutesInput.value = '';
  sessionDateInput.value = todayLocalString();
  sessionSubjectInput.focus();

  updateUI();
});

sessionList.addEventListener('click', event => {
  const deleteBtn = event.target.closest('.btn-delete');
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);
  if (!confirm('¿Deseas eliminar esta sesión de estudio?')) return;

  saveSessions(getStoredSessions().filter(session => session.id !== id));
  updateUI();
});

// ==========================================================================
// Inicio
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  sessionDateInput.value = todayLocalString();
  renderHeatmapLegend();
  setupHeatmapTooltip();
  updateUI();
});
