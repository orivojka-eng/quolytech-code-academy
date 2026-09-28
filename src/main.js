import './styles/notebooklm-theme.css';
import { allCourses, capstoneProjects, findLessonById, getNextAndPrevLessons, searchAcademy } from './curriculum/index.js';
import { loadAcademyState, saveAcademyState, markLessonCompleted, recordQuizScore, saveCodeDraft, getCodeDraft } from './services/storage.js';
import { checkAchievements } from './services/achievements.js';
import { askGeminiTeacher, generateDynamicTask, generateNotebookLMAudioOverview } from './services/gemini.js';
import { runStudentCode } from './components/runner.js';
import { renderQuizCard } from './components/quiz.js';
import { renderDashboard } from './components/dashboard.js';
import { renderPlayground } from './components/playground.js';
import { renderProjectsHub } from './components/projects.js';
import { renderAdminPanel } from './components/admin.js';

let appState = loadAcademyState();
let currentView = "learn"; // "learn" | "playground" | "projects" | "dashboard" | "admin"
let activeLesson = null;
let activeCourse = null;
let currentChatHistory = [
  {
    sender: "ai",
    text: "👋 Welcome to **QuolyTech Code Academy**! I am your AI Co-Instructor powered by Gemini. You can ask me to explain concepts, translate to Shqip, debug errors, or generate practice tasks!"
  }
];

function initApp() {
  // Apply saved theme
  document.documentElement.setAttribute("data-theme", appState.settings.theme);

  // Set initial lesson
  const savedLesson = findLessonById(appState.progress.currentLessonId);
  if (savedLesson) {
    activeCourse = savedLesson.course;
    activeLesson = savedLesson.lesson;
  } else {
    activeCourse = allCourses[0];
    activeLesson = activeCourse.lessons[0];
  }

  renderApp();
  setupGlobalShortcuts();
}

function renderApp() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    <div class="app-layout">
      <!-- Top Navigation -->
      <header class="top-nav">
        <div class="brand-section">
          <div class="brand-logo">Q</div>
          <div class="brand-name">
            QuolyTech <span style="font-weight: 400; color: var(--text-muted);">Academy</span>
            <span class="brand-badge">NotebookLM Edition</span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="nav-tabs">
          <button class="nav-tab-btn ${currentView === 'learn' ? 'active' : ''}" onclick="switchView('learn')">
            📖 Learn
          </button>
          <button class="nav-tab-btn ${currentView === 'playground' ? 'active' : ''}" onclick="switchView('playground')">
            ⚡ Playground
          </button>
          <button class="nav-tab-btn ${currentView === 'projects' ? 'active' : ''}" onclick="switchView('projects')">
            🚀 Projects
          </button>
          <button class="nav-tab-btn ${currentView === 'dashboard' ? 'active' : ''}" onclick="switchView('dashboard')">
            📊 Dashboard
          </button>
          <button class="nav-tab-btn ${currentView === 'admin' ? 'active' : ''}" onclick="switchView('admin')">
            ⚙️ Admin
          </button>
        </nav>

        <!-- Utilities -->
        <div class="nav-controls">
          <button class="pill-btn" onclick="openSearchModal()">
            🔍 Search <kbd style="font-size: 10px; background: var(--bg-hover); padding: 1px 4px; border-radius: 3px;">⌘K</kbd>
          </button>

          <button class="pill-btn ${appState.settings.beginnerMode ? 'active' : ''}" onclick="toggleBeginnerMode()">
            🌱 Beginner Mode: ${appState.settings.beginnerMode ? 'ON' : 'OFF'}
          </button>

          <button class="pill-btn" onclick="toggleLanguage()">
            🌐 ${appState.settings.language === 'en' ? 'EN' : 'SHQIP'}
          </button>

          <button class="pill-btn" onclick="openGeminiSettings()">
            ✨ Gemini API
          </button>

          <div class="streak-pill">
            🔥 ${appState.progress.streak.days}d
          </div>

          <button class="pill-btn" onclick="toggleTheme()">
            ${appState.settings.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <!-- Main Workspace -->
      <main class="notebook-workspace" id="main-workspace">
        ${renderWorkspaceContent()}
      </main>
    </div>

    <!-- Modals Container -->
    <div id="modal-container"></div>
  `;

  // Post-render attachments
  if (currentView === "learn" && activeLesson) {
    loadSavedCodeOrStarter();
  }
}

function renderWorkspaceContent() {
  if (currentView === "playground") {
    return `<div style="grid-column: 1 / -1; height: 100%;">${renderPlayground()}</div>`;
  }
  if (currentView === "projects") {
    return `<div style="grid-column: 1 / -1; height: 100%; overflow-y: auto;">${renderProjectsHub()}</div>`;
  }
  if (currentView === "dashboard") {
    return `<div style="grid-column: 1 / -1; height: 100%; overflow-y: auto;">${renderDashboard(appState)}</div>`;
  }
  if (currentView === "admin") {
    return `<div style="grid-column: 1 / -1; height: 100%; overflow-y: auto;">${renderAdminPanel()}</div>`;
  }

  // "learn" 3-pane layout:
  return `
    <!-- Left Sidebar: Curriculum Explorer -->
    <aside class="sidebar-panel">
      <div class="sidebar-header">
        <span class="sidebar-title">Curriculum Sources</span>
        <span style="font-size: 11px; color: var(--text-faint);">${allCourses.length} Tracks</span>
      </div>
      <div class="sidebar-list">
        ${allCourses.map(course => {
          const isCurrentCourse = activeCourse?.id === course.id;
          const courseCompletedCount = course.lessons.filter(l => appState.progress.completedLessons.includes(l.id)).length;
          return `
            <div class="course-group">
              <div class="course-group-header" onclick="selectCourse('${course.id}')">
                <span>${course.title}</span>
                <span class="course-progress-tag">${courseCompletedCount}/${course.lessons.length}</span>
              </div>
              <ul class="lesson-list">
                ${course.lessons.map(lesson => {
                  const isActive = activeLesson?.id === lesson.id;
                  const isDone = appState.progress.completedLessons.includes(lesson.id);
                  return `
                    <li 
                      class="lesson-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" 
                      onclick="selectLesson('${lesson.id}')"
                    >
                      <span>${lesson.title}</span>
                    </li>
                  `;
                }).join("")}
              </ul>
            </div>
          `;
        }).join("")}
      </div>
    </aside>

    <!-- Center Studio: Lesson Content & Code Editor -->
    <section class="studio-panel" id="studio-scrollable">
      ${renderLessonStudio()}
    </section>

    <!-- Right Panel: NotebookLM AI Co-Teacher & Studio -->
    <aside class="ai-panel">
      <div class="ai-panel-header">
        <div class="ai-panel-title">
          <span>✨ Gemini AI Teacher</span>
        </div>
        <span class="meta-pill" style="font-size: 10px;">${appState.settings.geminiApiKey ? 'Live Gemini 1.5' : 'Academy Engine'}</span>
      </div>

      <!-- NotebookLM Simulated Audio Overview -->
      <div class="audio-overview-card">
        <div class="audio-title">🎙️ Audio Discussion Overview</div>
        <p class="audio-desc">Simulate a NotebookLM podcast discussion between instructors for this lesson.</p>
        <button onclick="playNotebookLMAudioOverview()" class="btn-run" style="width: 100%; justify-content: center; font-size: 12px; padding: 6px 12px;">
          🎧 Generate Audio Overview
        </button>
      </div>

      <!-- Quick Action Chips -->
      <div class="prompt-chips-row">
        <button class="chip-btn" onclick="sendQuickPrompt('Shpjoma në Shqip të lutem')">🇦🇱 Shqip</button>
        <button class="chip-btn" onclick="sendQuickPrompt('Give me a simple real-world metaphor')">💡 Metaphor</button>
        <button class="chip-btn" onclick="sendQuickPrompt('Why is my code failing? Please give me a hint')">🔍 Debug Code</button>
        <button class="chip-btn" onclick="requestDynamicTask()">🎯 Give Me a Task</button>
      </div>

      <!-- Chat History -->
      <div class="chat-history" id="ai-chat-history">
        ${currentChatHistory.map(msg => `
          <div class="chat-bubble ${msg.sender}">
            ${formatMarkdown(msg.text)}
          </div>
        `).join("")}
      </div>

      <!-- AI Prompt Input -->
      <div class="ai-input-row">
        <input 
          type="text" 
          id="ai-user-input" 
          class="ai-input-field" 
          placeholder="Ask teacher anything..." 
          onkeydown="if(event.key==='Enter') sendChatMessage()"
        />
        <button class="btn-send" onclick="sendChatMessage()">➤</button>
      </div>
    </aside>
  `;
}

function renderLessonStudio() {
  if (!activeLesson) return `<div style="padding: 40px; text-align: center;">Select a lesson to begin.</div>`;

  const isSq = appState.settings.language === "sq";
  const { prev, next } = getNextAndPrevLessons(activeLesson.id);

  return `
    <article class="lesson-article">
      <!-- Breadcrumb -->
      <div class="lesson-breadcrumb">${activeCourse.title} • ${activeLesson.module}</div>

      <!-- Main Title -->
      <h1 class="lesson-main-title">${isSq && activeLesson.titleSq ? activeLesson.titleSq : activeLesson.title}</h1>

      <!-- Meta Bar -->
      <div class="lesson-meta-bar">
        <span class="meta-pill">⏱️ ${activeLesson.estimatedMinutes} mins</span>
        <span class="meta-pill">🎯 ${activeLesson.difficulty}</span>
        <span class="meta-pill">🏷️ ${activeLesson.type.toUpperCase()}</span>
        <span class="meta-pill" style="color: var(--brand-emerald);">✓ Beginner-First</span>
      </div>

      <!-- Bilingual Albanian Box (Shqip Layer) -->
      <div class="bilingual-box">
        <div class="bilingual-header">
          <div class="bilingual-title">
            <span>🇦🇱 Shpjegimi në Gjuhën Shqipe</span>
          </div>
          <button class="chip-btn" onclick="toggleLanguage()">
            Kalo në: ${isSq ? 'English' : 'Shqip'}
          </button>
        </div>
        <div style="font-size: 14.5px; color: var(--text-main); line-height: 1.6;">
          ${activeLesson.theorySq ? formatMarkdown(activeLesson.theorySq) : "Shpjegimi në shqip është aktiv për këtë mësim."}
        </div>
      </div>

      <!-- Metaphor Box -->
      <div class="metaphor-box">
        <div class="metaphor-title">💡 Real-Life Metaphor / Analogi nga Jeta Reale</div>
        <div class="metaphor-text">
          "${isSq && activeLesson.metaphorSq ? activeLesson.metaphorSq : activeLesson.metaphor}"
        </div>
      </div>

      <!-- Theory Explanation -->
      <div class="theory-content">
        ${formatMarkdown(isSq && activeLesson.theorySq ? activeLesson.theorySq : activeLesson.theory)}
      </div>

      <!-- Interactive Code Studio -->
      <div class="code-studio">
        <div class="studio-toolbar">
          <div class="studio-lang-tag">
            <span>⚡ ${activeLesson.type.toUpperCase()} Studio</span>
          </div>
          <div class="studio-actions">
            <button class="btn-secondary" onclick="resetLessonCode()">↺ Reset</button>
            <button class="btn-run" onclick="executeActiveLessonCode()">▶ Run Code</button>
          </div>
        </div>

        <div class="studio-body">
          <!-- Code Editor -->
          <div class="editor-wrapper">
            <textarea 
              id="lesson-code-editor" 
              class="code-textarea" 
              spellcheck="false"
              oninput="handleCodeInput(this.value)"
            ></textarea>
          </div>

          <!-- Live Preview Sandbox -->
          <div class="preview-wrapper">
            <iframe id="academy-preview-frame" class="preview-frame"></iframe>
          </div>
        </div>

        <!-- Terminal & Logs Drawer -->
        <div class="terminal-drawer" id="academy-terminal">
          <div class="terminal-header">
            <span>Console Output</span>
            <span id="log-count">0 logs</span>
          </div>
          <div id="terminal-lines"></div>
        </div>

        <!-- Unit Test Results -->
        <div id="test-results-bar" class="test-results-bar" style="display: none;">
          <div id="test-status-pill"></div>
          <div style="font-size: 12px; color: var(--text-faint);">QuolyTech Test Runner</div>
        </div>
      </div>

      <!-- Exercise Task Card -->
      <div class="exercise-task-card">
        <div class="task-title">🎯 Your Coding Task</div>
        <p class="task-text">${isSq && activeLesson.taskSq ? activeLesson.taskSq : activeLesson.task}</p>
        <div class="task-tools">
          <button class="btn-secondary" onclick="toggleHint()">💡 Need a Hint?</button>
          <button class="btn-secondary" onclick="toggleSolution()">🔑 Reveal Solution</button>
        </div>
        <div id="hint-drawer" style="display: none; margin-top: 12px; padding: 12px; background: var(--bg-card); border-radius: var(--radius-md); font-size: 13px; color: var(--brand-amber);">
          <strong>Hint:</strong> ${activeLesson.hint}
        </div>
        <div id="solution-drawer" style="display: none; margin-top: 12px; padding: 16px; background: var(--bg-card); border-radius: var(--radius-md); font-size: 13px;">
          <div style="font-weight: 700; color: var(--brand-emerald); margin-bottom: 6px;">Reference Solution:</div>
          <pre style="background: #090d16; padding: 12px; border-radius: 6px; color: #38bdf8; font-family: var(--font-mono); overflow-x: auto;"><code>${escapeHtml(activeLesson.solution)}</code></pre>
          <p style="margin-top: 8px; color: var(--text-muted);">${activeLesson.solutionExplanation}</p>
        </div>
      </div>

      <!-- Quiz Section -->
      ${renderQuizCard(activeLesson.quiz)}

      <!-- Bottom Nav Footer -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-subtle);">
        ${prev ? `
          <button class="btn-secondary" onclick="selectLesson('${prev.lessonId}')">
            ← Previous Lesson
          </button>
        ` : `<div></div>`}

        <button class="btn-run" onclick="completeAndNextLesson()">
          Mark Completed & Next →
        </button>
      </div>
    </article>
  `;
}

// Global window actions
window.switchView = function(view) {
  currentView = view;
  renderApp();
};

window.selectCourse = function(courseId) {
  const c = allCourses.find(item => item.id === courseId);
  if (c && c.lessons.length > 0) {
    activeCourse = c;
    activeLesson = c.lessons[0];
    appState.progress.currentCourseId = c.id;
    appState.progress.currentLessonId = activeLesson.id;
    saveAcademyState(appState);
    renderApp();
  }
};

window.selectLesson = function(lessonId) {
  const res = findLessonById(lessonId);
  if (res) {
    activeCourse = res.course;
    activeLesson = res.lesson;
    appState.progress.currentCourseId = activeCourse.id;
    appState.progress.currentLessonId = activeLesson.id;
    saveAcademyState(appState);
    renderApp();
  }
};

window.handleCodeInput = function(code) {
  if (activeLesson) {
    saveCodeDraft(activeLesson.id, code);
  }
};

window.loadSavedCodeOrStarter = function() {
  const textarea = document.getElementById("lesson-code-editor");
  if (!textarea || !activeLesson) return;

  const saved = getCodeDraft(activeLesson.id);
  textarea.value = saved || activeLesson.starterCode;

  // Run initial preview
  setTimeout(() => {
    executeActiveLessonCode();
  }, 100);
};

window.resetLessonCode = function() {
  if (!activeLesson) return;
  const textarea = document.getElementById("lesson-code-editor");
  if (textarea) {
    textarea.value = activeLesson.starterCode;
    saveCodeDraft(activeLesson.id, activeLesson.starterCode);
    executeActiveLessonCode();
  }
};

window.executeActiveLessonCode = function() {
  const textarea = document.getElementById("lesson-code-editor");
  if (!textarea || !activeLesson) return;

  const code = textarea.value;
  const terminalLines = document.getElementById("terminal-lines");
  const logCount = document.getElementById("log-count");
  let count = 0;

  if (terminalLines) terminalLines.innerHTML = "";

  runStudentCode({
    type: activeLesson.type,
    code,
    testAssertions: activeLesson.testAssertions,
    onLog: (log) => {
      if (log.type === "clear") {
        if (terminalLines) terminalLines.innerHTML = "";
        count = 0;
        return;
      }
      count++;
      if (logCount) logCount.textContent = `${count} log${count === 1 ? '' : 's'}`;
      if (terminalLines) {
        const div = document.createElement("div");
        div.className = `terminal-line ${log.level}`;
        div.textContent = `> ${log.text}`;
        terminalLines.appendChild(div);
      }
    },
    onResult: (res) => {
      const resultsBar = document.getElementById("test-results-bar");
      const statusPill = document.getElementById("test-status-pill");
      if (resultsBar && statusPill) {
        resultsBar.style.display = "flex";
        if (res.success) {
          statusPill.className = "test-pill-success";
          statusPill.innerHTML = `✅ All tests passed! Ready to proceed.`;
          // Trigger achievement check
          const unlocked = checkAchievements();
          if (unlocked.length > 0) {
            unlocked.forEach(ach => showAchievementToast(ach));
          }
        } else {
          statusPill.className = "test-pill-fail";
          statusPill.innerHTML = `❌ Some tests need adjustments. Check task instructions or ask AI Teacher!`;
        }
      }
    }
  });
};

window.toggleHint = function() {
  const d = document.getElementById("hint-drawer");
  if (d) d.style.display = d.style.display === "none" ? "block" : "none";
};

window.toggleSolution = function() {
  const d = document.getElementById("solution-drawer");
  if (d) d.style.display = d.style.display === "none" ? "block" : "none";
};

window.handleQuizOptionClick = function(selectedIndex) {
  if (!activeLesson || !activeLesson.quiz) return;
  const quiz = activeLesson.quiz;
  const expBox = document.getElementById("quiz-explanation-box");
  const buttons = document.querySelectorAll(".quiz-opt-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === quiz.correctIndex) {
      btn.style.borderColor = "var(--brand-emerald)";
      btn.style.background = "rgba(16, 185, 129, 0.15)";
      btn.style.color = "var(--brand-emerald)";
    } else if (idx === selectedIndex) {
      btn.style.borderColor = "var(--brand-red)";
      btn.style.background = "rgba(239, 68, 68, 0.15)";
      btn.style.color = "var(--brand-red)";
    }
  });

  if (expBox) {
    expBox.style.display = "block";
    const isCorrect = selectedIndex === quiz.correctIndex;
    if (isCorrect) {
      expBox.style.background = "rgba(16, 185, 129, 0.1)";
      expBox.style.color = "var(--brand-emerald)";
      expBox.style.border = "1px solid rgba(16, 185, 129, 0.3)";
      expBox.innerHTML = `<strong>Correct! 🎉</strong> ${quiz.explanation}`;
      recordQuizScore(activeLesson.id, 100);
    } else {
      expBox.style.background = "rgba(239, 68, 68, 0.1)";
      expBox.style.color = "var(--brand-red)";
      expBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
      expBox.innerHTML = `<strong>Incorrect.</strong> ${quiz.explanation}`;
    }
  }
};

window.completeAndNextLesson = function() {
  if (!activeLesson) return;
  markLessonCompleted(activeLesson.id);
  appState = loadAcademyState();

  const { next } = getNextAndPrevLessons(activeLesson.id);
  if (next) {
    selectLesson(next.lessonId);
  } else {
    alert("🎉 Congratulations! You have completed all lessons in this track!");
    switchView("dashboard");
  }
};

window.toggleLanguage = function() {
  appState.settings.language = appState.settings.language === "en" ? "sq" : "en";
  saveAcademyState(appState);
  renderApp();
};

window.toggleBeginnerMode = function() {
  appState.settings.beginnerMode = !appState.settings.beginnerMode;
  saveAcademyState(appState);
  renderApp();
};

window.toggleTheme = function() {
  appState.settings.theme = appState.settings.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", appState.settings.theme);
  saveAcademyState(appState);
  renderApp();
};

// AI Teacher & Chat
window.sendChatMessage = async function() {
  const input = document.getElementById("ai-user-input");
  if (!input || !input.value.trim()) return;

  const question = input.value.trim();
  input.value = "";

  currentChatHistory.push({ sender: "user", text: question });
  updateChatHistoryUI();

  // Show thinking indicator
  currentChatHistory.push({ sender: "ai", text: "Thinking..." });
  updateChatHistoryUI();

  const editor = document.getElementById("lesson-code-editor");
  const studentCode = editor ? editor.value : "";

  const response = await askGeminiTeacher({
    question,
    lesson: activeLesson,
    studentCode,
    language: appState.settings.language
  });

  // Replace thinking message
  currentChatHistory.pop();
  currentChatHistory.push({ sender: "ai", text: response.text });
  updateChatHistoryUI();
};

window.sendQuickPrompt = function(promptText) {
  const input = document.getElementById("ai-user-input");
  if (input) {
    input.value = promptText;
    sendChatMessage();
  }
};

window.requestDynamicTask = function() {
  if (!activeLesson) return;
  const task = generateDynamicTask(activeLesson);
  currentChatHistory.push({
    sender: "ai",
    text: `🎯 **Personalized Practice Task:**\n\n**${task.title}**\n${task.desc}\n\n💡 *Hint:* \`${task.hint}\`\n\nTry implementing this in the Playground or right here in the editor!`
  });
  updateChatHistoryUI();
};

window.playNotebookLMAudioOverview = function() {
  if (!activeLesson) return;
  const overview = generateNotebookLMAudioOverview(activeLesson);
  let scriptText = `🎙️ **${overview.title}**\n*Featuring ${overview.hosts.map(h => h.name).join(" & ")}*\n\n`;
  overview.transcript.forEach(line => {
    scriptText += `**${line.speaker}:** "${line.text}"\n\n`;
  });

  currentChatHistory.push({
    sender: "ai",
    text: scriptText
  });
  updateChatHistoryUI();
};

function updateChatHistoryUI() {
  const chatDiv = document.getElementById("ai-chat-history");
  if (!chatDiv) return;
  chatDiv.innerHTML = currentChatHistory.map(msg => `
    <div class="chat-bubble ${msg.sender}">
      ${formatMarkdown(msg.text)}
    </div>
  `).join("");
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Playground actions
window.runPlaygroundCode = function() {
  const editor = document.getElementById("playground-editor");
  const iframe = document.getElementById("playground-preview-frame");
  const consoleDiv = document.getElementById("playground-console");
  if (!editor || !iframe) return;

  if (consoleDiv) consoleDiv.innerHTML = "<div style='color:#64748b;'>// Playground Console Output</div>";

  const code = editor.value;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>body { margin: 0; font-family: sans-serif; background: #090d16; color: #fff; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        console.log = function(...args) {
          window.parent.postMessage({ type: 'PLAYGROUND_LOG', text: args.join(' ') }, '*');
        };
      </script>
      <script type="text/babel">
        try {
          ${code}
        } catch(err) {
          document.getElementById('root').innerHTML = '<div style="color:red; padding:20px;">' + err.message + '</div>';
        }
      </script>
    </body>
    </html>
  `;

  iframe.srcdoc = html;
};

window.loadPlaygroundTemplate = function(val) {
  const editor = document.getElementById("playground-editor");
  if (!editor) return;

  if (val === "react-counter") {
    editor.value = `function InteractiveApp() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="p-8 max-w-sm mx-auto my-10 bg-slate-900 border border-slate-800 rounded-2xl text-center">
      <h2 className="text-xl font-bold text-blue-400 mb-4">React Counter</h2>
      <div className="text-4xl font-extrabold mb-6">{count}</div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-blue-600 rounded-lg">Increment</button>
        <button onClick={() => setCount(0)} className="px-4 py-2 bg-slate-700 rounded-lg">Reset</button>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<InteractiveApp />);`;
  } else if (val === "react-todo") {
    editor.value = `function TodoApp() {
  const [items, setItems] = React.useState(["Learn HTML", "Style with CSS", "Master React"]);
  const [text, setText] = React.useState("");

  return (
    <div className="p-6 max-w-md mx-auto my-6 bg-slate-900 rounded-xl border border-slate-800">
      <h2 className="text-lg font-bold text-blue-400 mb-4">React Tasks</h2>
      <div className="flex gap-2 mb-4">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 bg-slate-800 p-2 rounded border border-slate-700 text-sm" placeholder="New task..." />
        <button onClick={() => { if(text.trim()) { setItems([...items, text]); setText(""); } }} className="px-3 bg-blue-600 rounded text-sm font-semibold">Add</button>
      </div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="p-2 bg-slate-800 rounded flex justify-between text-sm">
            <span>{it}</span>
            <button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="text-red-400 text-xs">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<TodoApp />);`;
  }

  runPlaygroundCode();
};

// Capstone Projects
window.loadCapstoneProject = function(projId) {
  const p = capstoneProjects.find(item => item.id === projId);
  if (!p) return;
  switchView("playground");
  setTimeout(() => {
    const editor = document.getElementById("playground-editor");
    if (editor && p.starterTemplate) {
      if (p.starterTemplate.type === "react") {
        editor.value = p.starterTemplate.code;
      } else {
        editor.value = `// Project: ${p.title}\n// HTML Structure:\n/*\n${p.starterTemplate.html}\n*/\n\n// JavaScript Engine:\n${p.starterTemplate.js}`;
      }
      runPlaygroundCode();
    }
  }, 100);
};

// Modals
window.openGeminiSettings = function() {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-content">
        <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">✨ Google Gemini AI Configuration</h2>
        <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">
          Connect your Google Gemini API key to activate live real-time AI pedagogical instruction. If no key is entered, QuolyTech uses our intelligent built-in teaching model.
        </p>
        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; color: var(--text-main);">Gemini API Key</label>
          <input 
            type="password" 
            id="gemini-key-input" 
            value="${appState.settings.geminiApiKey || ''}" 
            placeholder="AIzaSy..." 
            style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 10px 14px; border-radius: var(--radius-md); color: var(--text-main); font-family: var(--font-mono); font-size: 13px; outline: none;" 
          />
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn-secondary" onclick="closeModal()">Cancel</button>
          <button class="btn-run" onclick="saveGeminiKey()">Save Configuration</button>
        </div>
      </div>
    </div>
  `;
};

window.saveGeminiKey = function() {
  const input = document.getElementById("gemini-key-input");
  if (input) {
    appState.settings.geminiApiKey = input.value.trim();
    saveAcademyState(appState);
    closeModal();
    alert("✅ Gemini API settings updated successfully!");
    renderApp();
  }
};

window.openCertificateModal = function() {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-content" style="max-width: 650px; background: #0c1222; border: 2px solid #3b82f6; text-align: center; padding: 40px;">
        <div style="font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #60a5fa; margin-bottom: 8px;">QuolyTech Code Academy</div>
        <h1 style="font-size: 26px; font-weight: 900; color: #ffffff; margin-bottom: 12px;">CERTIFICATE OF COMPLETION</h1>
        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 24px;">This certifies that</p>
        <div style="font-size: 30px; font-weight: 800; color: #38bdf8; border-bottom: 1px solid #1e293b; display: inline-block; padding-bottom: 8px; margin-bottom: 24px;">${appState.profile.name}</div>
        <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; max-width: 480px; margin: 0 auto 32px;">
          has demonstrated foundational proficiency in <strong>Computer Science Basics, Semantic HTML5, Modern CSS Layouts, JavaScript Algorithms, and React 18 Component Architecture</strong>.
        </p>
        <div style="display: flex; justify-content: space-around; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 12px; color: #64748b;">
          <div>Date: ${new Date().toLocaleDateString()}</div>
          <div>Verification ID: QTC-${Math.random().toString(36).substring(2, 9).toUpperCase()}</div>
          <div>Signatory: QuolyTech Board</div>
        </div>
        <div style="margin-top: 28px;">
          <button class="btn-run" onclick="closeModal()">Close Certificate</button>
        </div>
      </div>
    </div>
  `;
};

window.openSearchModal = function() {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;
  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal-content" style="max-width: 580px;">
        <div style="position: relative; margin-bottom: 16px;">
          <input 
            type="text" 
            id="academy-search-input" 
            placeholder="Search lessons, concepts, 'flexbox', 'useState'..." 
            oninput="handleSearchQuery(this.value)"
            autofocus
            style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle); padding: 12px 18px; border-radius: var(--radius-lg); color: var(--text-main); font-size: 14px; outline: none;" 
          />
        </div>
        <div id="search-results-list" style="max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px;">
          <div style="color: var(--text-faint); font-size: 13px; text-align: center; padding: 20px;">Type to search curriculum...</div>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => {
    document.getElementById("academy-search-input")?.focus();
  }, 50);
};

window.handleSearchQuery = function(q) {
  const list = document.getElementById("search-results-list");
  if (!list) return;

  const results = searchAcademy(q);
  if (results.length === 0) {
    list.innerHTML = `<div style="color: var(--text-faint); font-size: 13px; text-align: center; padding: 20px;">No matching lessons found.</div>`;
    return;
  }

  list.innerHTML = results.map(res => `
    <div 
      onclick="selectLesson('${res.lessonId}'); closeModal();"
      style="padding: 12px 16px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
    >
      <div>
        <div style="font-weight: 700; color: var(--text-main); font-size: 14px;">${res.title}</div>
        <div style="font-size: 12px; color: var(--text-muted);">${res.courseTitle}</div>
      </div>
      <span class="meta-pill" style="font-size: 10px;">${res.difficulty}</span>
    </div>
  `).join("");
};

window.closeModal = function() {
  const modalContainer = document.getElementById("modal-container");
  if (modalContainer) modalContainer.innerHTML = "";
};

window.exportAcademyData = function() {
  const data = JSON.stringify(allCourses, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quolytech-academy-curriculum.json";
  a.click();
};

function showAchievementToast(ach) {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.background = "linear-gradient(135deg, #1e293b, #0f172a)";
  toast.style.border = "2px solid #3b82f6";
  toast.style.color = "#ffffff";
  toast.style.padding = "16px 20px";
  toast.style.borderRadius = "14px";
  toast.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.6)";
  toast.style.zIndex = "9999";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "12px";

  toast.innerHTML = `
    <div style="font-size: 28px;">🏆</div>
    <div>
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #60a5fa;">Achievement Unlocked!</div>
      <div style="font-size: 14px; font-weight: 700;">${ach.title}</div>
      <div style="font-size: 12px; color: #94a3b8;">${ach.desc}</div>
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4500);
}

function setupGlobalShortcuts() {
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearchModal();
    }
  });

  window.addEventListener("message", (e) => {
    if (e.data && e.data.type === "PLAYGROUND_LOG") {
      const consoleDiv = document.getElementById("playground-console");
      if (consoleDiv) {
        const line = document.createElement("div");
        line.style.color = "#38bdf8";
        line.textContent = `> ${e.data.text}`;
        consoleDiv.appendChild(line);
      }
    }
  });
}

function formatMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.addEventListener("DOMContentLoaded", initApp);
