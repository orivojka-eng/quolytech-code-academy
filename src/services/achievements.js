import { loadAcademyState, saveAcademyState } from './storage.js';

export const ALL_ACHIEVEMENTS = [
  {
    id: "first-line",
    title: "First Line",
    titleSq: "Rreshti i Parë",
    desc: "Run your first piece of working code.",
    descSq: "Ekzekuto rreshtin e parë të kodit funksional.",
    icon: "zap"
  },
  {
    id: "html-explorer",
    title: "HTML Architect",
    titleSq: "Arkitekti HTML",
    desc: "Master all core HTML tags and forms.",
    descSq: "Mëso të gjitha etiketat dhe formularët HTML.",
    icon: "code"
  },
  {
    id: "style-master",
    title: "Style Master",
    titleSq: "Mjeshtri i Stilit",
    desc: "Tame the Box Model and Flexbox layouts.",
    descSq: "Përvetëso modelin e kutisë dhe Flexbox.",
    icon: "palette"
  },
  {
    id: "js-starter",
    title: "JavaScript Engineer",
    titleSq: "Inxhinier JavaScript",
    desc: "Write functions, arrays, and interactive DOM events.",
    descSq: "Shkruaj funksione, lista dhe ngjarje në DOM.",
    icon: "cpu"
  },
  {
    id: "react-beginner",
    title: "React Component Pro",
    titleSq: "Mjeshtër i Komponentëve React",
    desc: "Create reactive stateful components with JSX.",
    descSq: "Krijo komponentë reaktivë me gjendje dhe JSX.",
    icon: "layers"
  },
  {
    id: "quiz-whiz",
    title: "Quiz Champion",
    titleSq: "Kampion i Kuizeve",
    desc: "Score 100% on three quizzes in a row.",
    descSq: "Merr 100% pikë në 3 kuize radhazi.",
    icon: "award"
  },
  {
    id: "streak-warrior",
    title: "Daily Consistency",
    titleSq: "Përkushtim Ditor",
    desc: "Maintain a 5+ day learning streak.",
    descSq: "Mbaj një seri mësimore 5+ ditëshe.",
    icon: "flame"
  }
];

export function checkAchievements() {
  const state = loadAcademyState();
  const unlockedIds = new Set(state.achievements.map(a => a.id));
  const newUnlocks = [];

  const completed = state.progress.completedLessons || [];

  // Check first line
  if (completed.length >= 1 && !unlockedIds.has("first-line")) {
    newUnlocks.push("first-line");
  }

  // Check HTML
  const hasHtml = completed.some(id => id.startsWith("html-"));
  if (hasHtml && !unlockedIds.has("html-explorer")) {
    newUnlocks.push("html-explorer");
  }

  // Check CSS
  const hasCss = completed.some(id => id.startsWith("css-"));
  if (hasCss && !unlockedIds.has("style-master")) {
    newUnlocks.push("style-master");
  }

  // Check JS
  const hasJs = completed.some(id => id.startsWith("js-"));
  if (hasJs && !unlockedIds.has("js-starter")) {
    newUnlocks.push("js-starter");
  }

  // Check React
  const hasReact = completed.some(id => id.startsWith("react-"));
  if (hasReact && !unlockedIds.has("react-beginner")) {
    newUnlocks.push("react-beginner");
  }

  if (newUnlocks.length > 0) {
    newUnlocks.forEach(id => {
      const match = ALL_ACHIEVEMENTS.find(a => a.id === id);
      if (match) {
        state.achievements.push({
          ...match,
          unlockedAt: new Date().toISOString()
        });
      }
    });
    saveAcademyState(state);
    return newUnlocks.map(id => ALL_ACHIEVEMENTS.find(a => a.id === id));
  }

  return [];
}
