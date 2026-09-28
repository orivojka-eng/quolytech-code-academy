import './styles/freecodecamp.css';
import { allCourses, capstoneProjects, findLessonById, getNextAndPrevLessons, searchAcademy } from './curriculum/index.js';
import { loadAcademyState, saveAcademyState, markLessonCompleted, recordQuizScore, saveCodeDraft, getCodeDraft } from './services/storage.js';
import { checkAchievements } from './services/achievements.js';
import { getChallengeHelp } from './services/gemini.js';
import { runStudentCode } from './components/runner.js';
import { renderDashboard } from './components/dashboard.js';
import { renderPlayground } from './components/playground.js';
import { renderProjectsHub } from './components/projects.js';

let appState = loadAcademyState();
let currentView = "challenge"; // "challenge" | "curriculum" | "playground" | "projects" | "profile"
let activeLesson = null;
let activeCourse = null;
let lastTestResult = null; // null | { success: boolean, tests: [], feedback: string }

function initApp() {
  document.documentElement.setAttribute("data-theme", appState.settings.theme || "dark");

  const savedLesson = findLessonById(appState.progress.currentLessonId);
  if (savedLesson) {
    activeCourse = savedLesson.course;
    activeLesson = savedLesson.lesson;
  } else {
    activeCourse = allCourses[0];
    activeLesson = activeCourse.lessons[0];
  }

  renderApp();
  setupKeyboardShortcuts();
}

function renderApp() {
  const root = document.getElementById("app");
  if (!root) return;

  const isSq = appState.settings.language === "sq";

  root.innerHTML = `
    <div class="fcc-app">
      <!-- freeCodeCamp Top Navigation Bar -->
      <header class="fcc-nav">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div class="fcc-brand" onclick="switchView('curriculum')">
            <span class="fcc-brand-logo">( / ) <span>QuolyTech</span> CodeCamp</span>
          </div>
          <button class="fcc-btn fcc-btn-navy" style="font-size: 13px; padding: 4px 10px;" onclick="switchView('curriculum')">
            📚 Menu / Curriculum
          </button>
        </div>

        <div class="fcc-nav-search">
          <span style="color: var(--text-faint); margin-right: 8px;">🔍</span>
          <input 
            type="text" 
            placeholder="${isSq ? 'Kërko tema, kode, HTML, CSS, React...' : 'Search challenges, HTML, CSS, JavaScript, React...'}" 
            oninput="handleFccSearch(this.value)"
          />
        </div>

        <div class="fcc-nav-actions">
          <button class="fcc-btn fcc-btn-navy" style="font-size: 13px; padding: 5px 12px;" onclick="toggleLanguage()">
            🌐 ${isSq ? 'Shqip 🇦🇱' : 'English 🇺🇸'}
          </button>

          <button class="fcc-btn fcc-btn-navy" style="font-size: 13px; padding: 5px 10px;" onclick="switchView('playground')">
            ⚡ Playground
          </button>

          <button class="fcc-btn fcc-btn-navy" style="font-size: 13px; padding: 5px 10px;" onclick="switchView('projects')">
            🚀 Projects
          </button>

          <button class="fcc-btn fcc-btn-navy" style="font-size: 13px; padding: 5px 10px;" onclick="switchView('profile')">
            🔥 ${appState.progress.streak.days}d Streak
          </button>

          <button class="fcc-btn fcc-btn-navy" style="padding: 5px 10px;" onclick="toggleTheme()">
            ${appState.settings.theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <!-- Main Body Viewport -->
      <main id="fcc-main-view" style="flex: 1; height: calc(100vh - 48px); overflow: hidden;">
        ${renderCurrentViewContent()}
      </main>
    </div>

    <!-- Modals & Overlays Container -->
    <div id="fcc-modal-container"></div>
  `;

  if (currentView === "challenge" && activeLesson) {
    loadSavedCodeOrStarter();
  }
}

function renderCurrentViewContent() {
  if (currentView === "curriculum") {
    return renderCurriculumView();
  }
  if (currentView === "playground") {
    return `<div style="height: 100%; overflow: hidden;">${renderPlayground()}</div>`;
  }
  if (currentView === "projects") {
    return `<div style="height: 100%; overflow-y: auto;">${renderProjectsHub()}</div>`;
  }
  if (currentView === "profile") {
    return `<div style="height: 100%; overflow-y: auto;">${renderDashboard(appState)}</div>`;
  }

  // Authentic freeCodeCamp 3-Pane Challenge View
  return renderChallengeWorkspace();
}

function renderChallengeWorkspace() {
  if (!activeLesson) return `<div style="padding: 40px; text-align: center;">Select a challenge to begin.</div>`;

  const isSq = appState.settings.language === "sq";
  const { prev, next } = getNextAndPrevLessons(activeLesson.id);

  return `
    <div class="fcc-workspace">
      <!-- Pane 1: Instructions, Theory, Code Examples, and Tests -->
      <div class="fcc-pane-instructions">
        <!-- Step Breadcrumb -->
        <div class="fcc-step-badge">${activeCourse.title} • ${activeLesson.module}</div>

        <!-- Challenge Title -->
        <h1 class="fcc-challenge-title">
          ${isSq && activeLesson.titleSq ? activeLesson.titleSq : activeLesson.title}
        </h1>

        <!-- Metadata Pills -->
        <div class="fcc-meta-row">
          <span class="fcc-tag">Difficulty: ${activeLesson.difficulty}</span>
          <span class="fcc-tag">Stack: ${activeLesson.type.toUpperCase()}</span>
          <span class="fcc-tag">Est: ${activeLesson.estimatedMinutes} mins</span>
        </div>

        <!-- Concept Theory & Explanation -->
        <div class="fcc-description">
          ${formatMarkdown(isSq && activeLesson.theorySq ? activeLesson.theorySq : activeLesson.theory)}
        </div>

        <!-- Real-World Metaphor Card -->
        <div style="background: rgba(153, 201, 255, 0.08); border-left: 3px solid var(--fcc-blue); padding: 12px 16px; border-radius: 3px; margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--fcc-blue); margin-bottom: 4px;">
            💡 Mental Model & Analogy
          </div>
          <div style="font-size: 14px; font-style: italic; color: #ffffff;">
            "${isSq && activeLesson.metaphorSq ? activeLesson.metaphorSq : activeLesson.metaphor}"
          </div>
        </div>

        <!-- Illustrative Code Example Box -->
        <div class="fcc-code-example-card">
          <div class="fcc-code-example-header">
            <span>Example Code to Understand:</span>
            <span>${activeLesson.type.toUpperCase()}</span>
          </div>
          <pre><code>${escapeHtml(activeLesson.codeExample || '// Example code')}</code></pre>
        </div>

        <!-- Line-by-Line Breakdown -->
        ${activeLesson.codeExplanation && activeLesson.codeExplanation.length > 0 ? `
          <div style="margin-bottom: 20px; font-size: 13.5px; color: var(--text-muted);">
            <div style="font-weight: 700; color: #ffffff; margin-bottom: 6px;">How this code works:</div>
            <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 4px;">
              ${activeLesson.codeExplanation.map(line => `<li>${formatMarkdown(line)}</li>`).join("")}
            </ul>
          </div>
        ` : ''}

        <!-- Bilingual Albanian Layer (Shqip) -->
        <div class="fcc-shqip-box">
          <div class="fcc-shqip-header">
            <span>🇦🇱 Shpjegimi në Gjuhën Shqipe</span>
            <button class="fcc-btn fcc-btn-navy" style="font-size: 11px; padding: 2px 8px;" onclick="toggleLanguage()">
              ${isSq ? 'English' : 'Shqip'}
            </button>
          </div>
          <div class="fcc-shqip-text">
            ${activeLesson.theorySq ? formatMarkdown(activeLesson.theorySq) : "Shpjegimi në shqip është gati për këtë ushtrim."}
          </div>
        </div>

        <!-- Task / Exercise Instructions -->
        <div class="fcc-task-box">
          <div class="fcc-task-title">🎯 Your Challenge Task</div>
          <div class="fcc-task-instruction">
            ${isSq && activeLesson.taskSq ? activeLesson.taskSq : activeLesson.task}
          </div>
        </div>

        <!-- Test Results Output Box -->
        <div class="fcc-test-output" id="fcc-test-output" style="${lastTestResult ? 'display: block;' : 'display: none;'}">
          <div class="fcc-test-header">Test Runner Output</div>
          <div id="fcc-test-items-list">
            ${lastTestResult ? renderTestFeedback(lastTestResult) : ''}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="fcc-actions-bar">
          <button class="fcc-btn-check" onclick="checkChallengeCode()">
            ${lastTestResult && lastTestResult.success ? 'Submit and go to next challenge (Ctrl + Enter) →' : 'Check Your Code (Ctrl + Enter)'}
          </button>

          <div class="fcc-sub-actions">
            <button class="fcc-sub-btn" onclick="openAskForHelpModal()">
              ❓ Ask for Help
            </button>
            <button class="fcc-sub-btn" onclick="openHintModal()">
              💡 Get a Hint
            </button>
            <button class="fcc-sub-btn" onclick="resetChallengeCode()">
              ↺ Reset Code
            </button>
          </div>
        </div>

        <!-- Navigation Footer -->
        <div style="display: flex; justify-content: space-between; margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--fcc-navy-border);">
          ${prev ? `
            <button class="fcc-btn fcc-btn-navy" style="font-size: 12px;" onclick="selectLesson('${prev.lessonId}')">
              ← Previous Challenge
            </button>
          ` : `<div></div>`}

          ${next ? `
            <button class="fcc-btn fcc-btn-navy" style="font-size: 12px;" onclick="selectLesson('${next.lessonId}')">
              Next Challenge →
            </button>
          ` : `<div></div>`}
        </div>
      </div>

      <!-- Pane 2: Monospace Code Editor -->
      <div class="fcc-pane-editor">
        <div class="fcc-editor-tabs">
          <div class="fcc-tab-active">
            ${activeLesson.type === 'html' ? 'index.html' : activeLesson.type === 'css' ? 'styles.css' : activeLesson.type === 'react' ? 'App.jsx' : 'script.js'}
          </div>
          <span style="font-size: 11px; color: var(--text-faint); font-family: var(--font-mono);">UTF-8 • Monospace</span>
        </div>
        <textarea 
          id="fcc-code-editor" 
          class="fcc-code-area" 
          spellcheck="false" 
          oninput="handleCodeInput(this.value)"
        ></textarea>
      </div>

      <!-- Pane 3: Live Preview & Console Output -->
      <div class="fcc-pane-preview">
        <div class="fcc-preview-header">
          <span>Browser Preview</span>
          <span id="fcc-preview-status">Live Sandbox</span>
        </div>
        <iframe id="academy-preview-frame" class="fcc-preview-frame"></iframe>
        
        <div class="fcc-console-drawer">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-faint); margin-bottom: 6px; font-weight: 700;">
            Console Output:
          </div>
          <div id="fcc-console-lines" style="display: flex; flex-direction: column; gap: 2px;">
            <div style="color: var(--text-faint); font-style: italic;">// Logs will appear here upon execution</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTestFeedback(res) {
  if (res.success) {
    return `
      <div class="fcc-test-feedback-msg pass">
        ✓ 100% Passed! Great work! Click "Submit and go to next challenge" to proceed.
      </div>
      ${(res.tests || []).map(t => `
        <div class="fcc-test-item pass">
          <span>✓</span>
          <span>${t.description}</span>
        </div>
      `).join("")}
    `;
  }

  return `
    <div class="fcc-test-feedback-msg fail">
      ✗ Your code did not pass all test assertions yet. Check the requirements below.
    </div>
    ${(res.tests || []).map(t => `
      <div class="fcc-test-item ${t.passed ? 'pass' : 'fail'}">
        <span>${t.passed ? '✓' : '✗'}</span>
        <span>${t.description}</span>
      </div>
    `).join("")}
  `;
}

// Curriculum Directory View (Like freeCodeCamp Certification Tracks)
function renderCurriculumView() {
  const completed = appState.progress.completedLessons || [];

  return `
    <div class="fcc-curriculum-container">
      <div style="text-align: center; margin-bottom: 36px;">
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
          QuolyTech CodeCamp Curriculum
        </h1>
        <p style="font-size: 15px; color: var(--text-muted); max-width: 600px; margin: 0 auto;">
          Learn to code with free, structured, interactive certifications. Start from zero and build modern React applications.
        </p>
      </div>

      <!-- Certifications List -->
      ${allCourses.map((course, cIdx) => {
        const completedCount = course.lessons.filter(l => completed.includes(l.id)).length;
        const percent = Math.round((completedCount / course.lessons.length) * 100);

        return `
          <div class="fcc-cert-card">
            <div class="fcc-cert-header" onclick="toggleCertDropdown('cert-${course.id}')">
              <div>
                <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--fcc-gold);">
                  Certification Track 0${cIdx}
                </span>
                <div class="fcc-cert-title">${course.title}</div>
              </div>
              <div class="fcc-cert-progress">${completedCount}/${course.lessons.length} Completed (${percent}%)</div>
            </div>

            <div class="fcc-block-list" id="cert-${course.id}">
              ${course.lessons.map(lesson => {
                const isDone = completed.includes(lesson.id);
                return `
                  <div class="fcc-block-item ${isDone ? 'completed' : ''}" onclick="selectLesson('${lesson.id}'); switchView('challenge');">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div class="fcc-check-circle">${isDone ? '✓' : ''}</div>
                      <span>${lesson.title}</span>
                    </div>
                    <span style="font-size: 12px; color: var(--text-faint); font-family: var(--font-mono);">${lesson.estimatedMinutes}m</span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// Global actions
window.switchView = function(view) {
  currentView = view;
  renderApp();
};

window.selectLesson = function(lessonId) {
  const res = findLessonById(lessonId);
  if (res) {
    activeCourse = res.course;
    activeLesson = res.lesson;
    lastTestResult = null;
    appState.progress.currentCourseId = res.course.id;
    appState.progress.currentLessonId = res.lesson.id;
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
  const textarea = document.getElementById("fcc-code-editor");
  if (!textarea || !activeLesson) return;

  const saved = getCodeDraft(activeLesson.id);
  textarea.value = saved || activeLesson.starterCode;

  // Run initial sandbox
  setTimeout(() => {
    runLivePreview();
  }, 100);
};

window.resetChallengeCode = function() {
  if (!activeLesson) return;
  const textarea = document.getElementById("fcc-code-editor");
  if (textarea) {
    textarea.value = activeLesson.starterCode;
    saveCodeDraft(activeLesson.id, activeLesson.starterCode);
    lastTestResult = null;
    renderApp();
  }
};

function runLivePreview() {
  const textarea = document.getElementById("fcc-code-editor");
  if (!textarea || !activeLesson) return;

  const code = textarea.value;
  const consoleLines = document.getElementById("fcc-console-lines");

  runStudentCode({
    type: activeLesson.type,
    code,
    testAssertions: [],
    onLog: (log) => {
      if (log.type === "clear" && consoleLines) {
        consoleLines.innerHTML = "";
        return;
      }
      if (consoleLines) {
        const line = document.createElement("div");
        line.style.color = log.level === "error" ? "#f58383" : "#99c9ff";
        line.textContent = `> ${log.text}`;
        consoleLines.appendChild(line);
      }
    }
  });
}

window.checkChallengeCode = function() {
  const textarea = document.getElementById("fcc-code-editor");
  if (!textarea || !activeLesson) return;

  // If already passed and clicked, proceed to next challenge!
  if (lastTestResult && lastTestResult.success) {
    completeAndGoNext();
    return;
  }

  const code = textarea.value;
  const consoleLines = document.getElementById("fcc-console-lines");
  if (consoleLines) consoleLines.innerHTML = "";

  runStudentCode({
    type: activeLesson.type,
    code,
    testAssertions: activeLesson.testAssertions,
    onLog: (log) => {
      if (consoleLines && log.text) {
        const line = document.createElement("div");
        line.style.color = log.level === "error" ? "#f58383" : "#99c9ff";
        line.textContent = `> ${log.text}`;
        consoleLines.appendChild(line);
      }
    },
    onResult: (res) => {
      lastTestResult = res;
      if (res.success) {
        markLessonCompleted(activeLesson.id);
        appState = loadAcademyState();
        checkAchievements();
      }
      renderApp();
    }
  });
};

function completeAndGoNext() {
  markLessonCompleted(activeLesson.id);
  appState = loadAcademyState();
  const { next } = getNextAndPrevLessons(activeLesson.id);
  if (next) {
    selectLesson(next.lessonId);
  } else {
    alert("🎉 Congratulations! You have completed all challenges in this curriculum track!");
    switchView("curriculum");
  }
}

window.openHintModal = function() {
  if (!activeLesson) return;
  const modalContainer = document.getElementById("fcc-modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fcc-modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="fcc-modal-content">
        <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 12px; color: var(--fcc-gold);">💡 Challenge Hint</h2>
        <p style="font-size: 15px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px;">
          ${activeLesson.hint}
        </p>
        <div style="display: flex; justify-content: flex-end;">
          <button class="fcc-btn fcc-btn-gold" onclick="closeModal()">Got it!</button>
        </div>
      </div>
    </div>
  `;
};

window.openAskForHelpModal = function() {
  if (!activeLesson) return;
  const textarea = document.getElementById("fcc-code-editor");
  const studentCode = textarea ? textarea.value : "";
  const advice = getChallengeHelp({
    challenge: activeLesson,
    studentCode,
    language: appState.settings.language
  });

  const modalContainer = document.getElementById("fcc-modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fcc-modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="fcc-modal-content">
        <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 12px; color: #99c9ff;">👨‍🏫 Built-In Instructor Help</h2>
        <div style="font-size: 14.5px; line-height: 1.6; color: var(--text-muted); margin-bottom: 24px;">
          ${formatMarkdown(advice)}
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button class="fcc-btn fcc-btn-navy" onclick="closeModal()">Close Help</button>
        </div>
      </div>
    </div>
  `;
};

window.closeModal = function() {
  const c = document.getElementById("fcc-modal-container");
  if (c) c.innerHTML = "";
};

window.toggleLanguage = function() {
  appState.settings.language = appState.settings.language === "en" ? "sq" : "en";
  saveAcademyState(appState);
  renderApp();
};

window.toggleTheme = function() {
  appState.settings.theme = appState.settings.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", appState.settings.theme);
  saveAcademyState(appState);
  renderApp();
};

window.toggleCertDropdown = function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === "none" ? "block" : "none";
  }
};

window.handleFccSearch = function(query) {
  if (!query || query.trim().length < 2) return;
  const results = searchAcademy(query);
  if (results.length > 0) {
    selectLesson(results[0].lessonId);
    currentView = "challenge";
    renderApp();
  }
};

function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    // Ctrl + Enter or Cmd + Enter checks code! (signature freeCodeCamp shortcut)
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (currentView === "challenge") {
        checkChallengeCode();
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
