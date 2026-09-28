const STORAGE_KEY = "quolytech_academy_state_v1";

const DEFAULT_STATE = {
  profile: {
    name: "Alex",
    experience: "Complete beginner",
    goal: "Become a frontend developer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  },
  settings: {
    language: "en", // 'en' | 'sq'
    theme: "dark",   // 'dark' | 'light'
    beginnerMode: true,
    geminiApiKey: ""
  },
  progress: {
    currentCourseId: "course-0",
    currentLessonId: "basics-what-is-code",
    completedLessons: ["basics-what-is-code"],
    quizScores: {
      "basics-what-is-code": 100
    },
    completedProjects: [],
    streak: {
      days: 5,
      lastActive: new Date().toISOString()
    },
    codeDrafts: {}
  },
  achievements: [
    {
      id: "first-line",
      title: "First Line of Code",
      titleSq: "Rreshti i Parë i Kodit",
      desc: "Ran your first computer instruction.",
      descSq: "Ekzekutove komandën tënde të parë kompjuterike.",
      icon: "terminal",
      unlockedAt: new Date().toISOString()
    }
  ]
};

export function loadAcademyState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (err) {
    console.warn("Failed to parse academy state, using defaults:", err);
    return DEFAULT_STATE;
  }
}

export function saveAcademyState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save academy state:", err);
  }
}

export function markLessonCompleted(lessonId) {
  const state = loadAcademyState();
  if (!state.progress.completedLessons.includes(lessonId)) {
    state.progress.completedLessons.push(lessonId);
    saveAcademyState(state);
  }
  return state;
}

export function recordQuizScore(lessonId, score) {
  const state = loadAcademyState();
  state.progress.quizScores[lessonId] = score;
  saveAcademyState(state);
  return state;
}

export function saveCodeDraft(lessonId, code) {
  const state = loadAcademyState();
  state.progress.codeDrafts[lessonId] = code;
  saveAcademyState(state);
}

export function getCodeDraft(lessonId) {
  const state = loadAcademyState();
  return state.progress.codeDrafts[lessonId] || null;
}
