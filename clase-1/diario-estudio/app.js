/**
 * Diario de Estudio
 * Aplicación de registro de sesiones de estudio y cálculo de rachas diarias.
 * Regla de Oro: Manejo 100% en fecha local (sin UTC / toISOString).
 */

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

// ==========================================================================
// Utilidades de Fechas (Estrictamente Locales)
// ==========================================================================

/**
 * Devuelve la fecha actual en formato "AAAA-MM-DD" en hora local.
 */
function getTodayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calcula la diferencia en días exactos entre dos fechas en formato "AAAA-MM-DD".
 * Retorna (dateStrA - dateStrB) en días.
 */
function diffDays(dateStrA, dateStrB) {
  const [yA, mA, dA] = dateStrA.split('-').map(Number);
  const [yB, mB, dB] = dateStrB.split('-').map(Number);
  const utcA = Date.UTC(yA, mA - 1, dA);
  const utcB = Date.UTC(yB, mB - 1, dB);
  return Math.round((utcA - utcB) / (1000 * 60 * 60 * 24));
}

/**
 * Formatea "AAAA-MM-DD" a formato legible local "DD/MM/AAAA".
 */
function formatLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

// ==========================================================================
// Persistencia en LocalStorage
// ==========================================================================

function getStoredSessions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error al parsear localStorage:', e);
    return [];
  }
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

// ==========================================================================
// Lógica de Rachas (Actual y Mejor Racha Histórica)
// ==========================================================================

/**
 * Extrae y limpia la lista de fechas únicas que NO sean futuras,
 * ordenadas ascendentemente (de más antigua a más nueva).
 */
function getValidUniqueDatesAscending(sessions) {
  const today = getTodayLocalDateString();
  const dateSet = new Set();

  for (const session of sessions) {
    if (session.date && session.date <= today) {
      dateSet.add(session.date);
    }
  }

  return Array.from(dateSet).sort();
}

/**
 * Calcula la racha actual de días consecutivos.
 * Regla:
 * - Se cuenta hacia atrás sin huecos.
 * - Debe haber al menos una sesión hoy o ayer para mantener la racha activa.
 */
function calculateCurrentStreak(sessions) {
  const datesAsc = getValidUniqueDatesAscending(sessions);
  if (datesAsc.length === 0) return 0;

  const today = getTodayLocalDateString();
  const datesDesc = [...datesAsc].reverse(); // De más reciente a más antigua
  const mostRecent = datesDesc[0];

  const diffFromToday = diffDays(today, mostRecent);
  // Si la última sesión no es ni hoy (0) ni ayer (1), la racha se rompió
  if (diffFromToday > 1) {
    return 0;
  }

  let streak = 1;
  for (let i = 0; i < datesDesc.length - 1; i++) {
    const diff = diffDays(datesDesc[i], datesDesc[i + 1]);
    if (diff === 1) {
      streak++;
    } else {
      break; // Encontró un hueco, fin de la racha actual
    }
  }

  return streak;
}

/**
 * Calcula la mejor racha histórica de días consecutivos.
 * Regla:
 * - El tramo consecutivo más largo alcanzado en todo el historial.
 * - Con lista vacía es 0. Ignora fechas futuras.
 */
function calculateBestStreak(sessions) {
  const datesAsc = getValidUniqueDatesAscending(sessions);
  if (datesAsc.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < datesAsc.length; i++) {
    const diff = diffDays(datesAsc[i], datesAsc[i - 1]);
    if (diff === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

// ==========================================================================
// Renderizado y UI
// ==========================================================================

function updateUI() {
  const sessions = getStoredSessions();

  // Calcular rachas
  const currentStreak = calculateCurrentStreak(sessions);
  const bestStreak = calculateBestStreak(sessions);

  // Actualizar indicadores numéricos
  currentStreakDisplay.textContent = currentStreak;
  currentStreakUnit.textContent = currentStreak === 1 ? 'día consecutivo' : 'días consecutivos';

  bestStreakDisplay.textContent = bestStreak;
  bestStreakUnit.textContent = bestStreak === 1 ? 'día récord' : 'días récord';

  // Actualizar contador
  sessionCountBadge.textContent = `${sessions.length} ${sessions.length === 1 ? 'sesión' : 'sesiones'}`;

  // Actualizar lista de historial
  renderSessionList(sessions);
}

function renderSessionList(sessions) {
  sessionList.innerHTML = '';

  if (sessions.length === 0) {
    emptyHistory.style.display = 'block';
    return;
  }

  emptyHistory.style.display = 'none';

  // Mostrar ordenadas de más reciente a más antigua
  const sortedSessions = [...sessions].sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return (b.id || 0) - (a.id || 0);
  });

  sortedSessions.forEach(session => {
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
        <button type="button" class="btn-delete" aria-label="Eliminar sesión" data-id="${session.id}">
          ✕
        </button>
      </div>
    `;

    sessionList.appendChild(li);
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// ==========================================================================
// Manejadores de Eventos
// ==========================================================================

sessionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = sessionDateInput.value;
  const subject = sessionSubjectInput.value.trim();
  const topic = sessionTopicInput.value.trim();
  const minutes = parseInt(sessionMinutesInput.value, 10);

  if (!date || !subject || !topic || isNaN(minutes) || minutes <= 0) {
    alert('Por favor, completa todos los campos con valores válidos.');
    return;
  }

  const newSession = {
    id: Date.now(),
    date,
    subject,
    topic,
    minutes
  };

  const sessions = getStoredSessions();
  sessions.push(newSession);
  saveSessions(sessions);

  // Limpiar campos excepto la fecha (que se mantiene en hoy)
  sessionSubjectInput.value = '';
  sessionTopicInput.value = '';
  sessionMinutesInput.value = '';
  sessionDateInput.value = getTodayLocalDateString();
  sessionSubjectInput.focus();

  updateUI();
});

sessionList.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.btn-delete');
  if (!deleteBtn) return;

  const id = Number(deleteBtn.dataset.id);
  if (confirm('¿Deseas eliminar esta sesión de estudio?')) {
    const sessions = getStoredSessions().filter(s => s.id !== id);
    saveSessions(sessions);
    updateUI();
  }
});

// ==========================================================================
// Inicialización
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Establecer fecha de hoy en el selector por defecto
  sessionDateInput.value = getTodayLocalDateString();
  updateUI();
});
