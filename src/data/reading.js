export const defaultSettings = {
  name: "Reader",
  annualGoal: 24,
  dailyMinutes: 20,
  showSamples: true,
  reduceMotion: false,
};

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("chapterlySettings")) || {};
    return {
      name: typeof saved.name === "string" && saved.name.trim() ? saved.name.slice(0, 40) : defaultSettings.name,
      annualGoal: Number.isInteger(saved.annualGoal) && saved.annualGoal >= 1 && saved.annualGoal <= 365 ? saved.annualGoal : defaultSettings.annualGoal,
      dailyMinutes: Number.isInteger(saved.dailyMinutes) && saved.dailyMinutes >= 1 && saved.dailyMinutes <= 720 ? saved.dailyMinutes : defaultSettings.dailyMinutes,
      showSamples: typeof saved.showSamples === "boolean" ? saved.showSamples : true,
      reduceMotion: typeof saved.reduceMotion === "boolean" ? saved.reduceMotion : false,
    };
  } catch {
    return { ...defaultSettings };
  }
}

export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function daysBefore(date, days) {
  const result = new Date(`${date}T12:00:00`);
  result.setDate(result.getDate() - days);
  return dateKey(result);
}

export function loadSessions() {
  try {
    const saved = JSON.parse(localStorage.getItem("chapterlySessions"));
    return Array.isArray(saved) ? saved.filter((entry) => entry && typeof entry.id === "string"
      && typeof entry.title === "string" && entry.title.trim()
      && typeof entry.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
      && Number.isInteger(entry.minutes) && entry.minutes > 0
      && Number.isInteger(entry.pages) && entry.pages >= 0) : [];
  } catch {
    return [];
  }
}

export function readingSummary(sessions, today, period) {
  const start = daysBefore(today, period - 1);
  const recent = sessions.filter((entry) => entry.date >= start && entry.date <= today);
  const activeDays = new Set(sessions.filter((entry) => entry.date <= today).map((entry) => entry.date));
  let cursor = activeDays.has(today) ? today : daysBefore(today, 1);
  let streak = 0;
  while (activeDays.has(cursor)) {
    streak += 1;
    cursor = daysBefore(cursor, 1);
  }
  const finished = new Set(sessions.filter((entry) => entry.finished && entry.date.slice(0, 4) === today.slice(0, 4)
    && entry.date <= today).map((entry) => entry.title.trim().toLowerCase()));
  return {
    recent,
    minutes: recent.reduce((total, entry) => total + entry.minutes, 0),
    pages: recent.reduce((total, entry) => total + entry.pages, 0),
    todayMinutes: sessions.filter((entry) => entry.date === today).reduce((total, entry) => total + entry.minutes, 0),
    streak,
    finished: finished.size,
    activity: Array.from({ length: period }, (_, index) => {
      const date = daysBefore(today, period - index - 1);
      return { date, minutes: recent.filter((entry) => entry.date === date).reduce((total, entry) => total + entry.minutes, 0) };
    }),
  };
}
