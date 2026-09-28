import { sounds } from '../services/sound.js';
import { allCourses } from '../curriculum/index.js';

export function renderIntroPage(state, onCompleteOnboarding) {
  const isSq = state.settings.language === "sq";

  return `
    <div style="min-height: 100%; background: var(--bg-primary); display: flex; flex-direction: column; padding-bottom: 80px;">
      <!-- Top Simple Header -->
      <div style="padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; max-width: 1100px; margin: 0 auto; width: 100%;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="brand-logo" style="width: 40px; height: 40px; font-size: 20px; border-radius: 12px;">Q</div>
          <span style="font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">QuolyTech <span style="color: var(--duo-green);">Academy</span></span>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="duo-btn duo-btn-white" style="padding: 10px 18px; font-size: 13px;" onclick="toggleLanguage();">
            🌐 ${isSq ? 'Language: SHQIP 🇦🇱' : 'Language: ENGLISH 🇺🇸'}
          </button>
          <button class="duo-btn duo-btn-blue" style="padding: 10px 20px; font-size: 13px;" onclick="window.enterAcademy('learn')">
            ${isSq ? 'Hyr Direkt në Mësime →' : 'Jump Straight to Studio →'}
          </button>
        </div>
      </div>

      <!-- Main Interactive Container -->
      <div style="flex: 1; max-width: 860px; margin: 0 auto; width: 100%; padding: 24px 20px 60px;" id="intro-step-container">
        ${renderStep1(isSq)}
      </div>
    </div>
  `;
}

function renderMascotSvg() {
  return `
    <svg class="duo-mascot" width="130" height="130" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="window.mascotEasterEgg()">
      <!-- Owl / Robot Body -->
      <rect x="25" y="25" width="110" height="115" rx="42" fill="#58CC02"/>
      <rect x="25" y="25" width="110" height="115" rx="42" stroke="#58A700" stroke-width="6"/>
      <!-- Belly -->
      <path d="M48 85C48 68 112 68 112 85C112 110 92 128 80 128C68 128 48 110 48 85Z" fill="#D7FFB8"/>
      <!-- Big Eyes -->
      <circle cx="56" cy="62" r="20" fill="white" stroke="#58A700" stroke-width="3"/>
      <circle cx="104" cy="62" r="20" fill="white" stroke="#58A700" stroke-width="3"/>
      <!-- Pupils -->
      <circle cx="60" cy="62" r="10" fill="#131F24"/>
      <circle cx="100" cy="62" r="10" fill="#131F24"/>
      <circle cx="58" cy="59" r="3.5" fill="white"/>
      <circle cx="98" cy="59" r="3.5" fill="white"/>
      <!-- Beak -->
      <polygon points="80,72 71,84 89,84" fill="#FFC800" stroke="#E5A500" stroke-width="2"/>
      <!-- Feet -->
      <ellipse cx="55" cy="144" rx="14" ry="7" fill="#FFC800"/>
      <ellipse cx="105" cy="144" rx="14" ry="7" fill="#FFC800"/>
      <!-- Glasses / Nerd Coding Goggles -->
      <rect x="34" y="44" width="44" height="36" rx="10" stroke="#1CB0F6" stroke-width="4" fill="none"/>
      <rect x="82" y="44" width="44" height="36" rx="10" stroke="#1CB0F6" stroke-width="4" fill="none"/>
      <line x1="78" y1="60" x2="82" y2="60" stroke="#1CB0F6" stroke-width="4"/>
    </svg>
  `;
}

export function renderStep1(isSq) {
  return `
    <!-- Hero Row with Mascot & Speech Bubble -->
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 36px; flex-wrap: wrap;">
      ${renderMascotSvg()}
      <div class="duo-speech-bubble">
        ${isSq 
          ? "Tungjatjeta! Jam <strong>Quoly</strong>, mentori yt personal i kodimit. Çfarë dëshiron të arrish me QuolyTech Code Academy?" 
          : "Hello! I am <strong>Quoly</strong>, your coding mentor. What is your primary learning goal today?"}
      </div>
    </div>

    <h2 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px; color: var(--text-main);">
      ${isSq ? "Zgjidh qëllimin tënd kryesor:" : "Choose your primary goal:"}
    </h2>

    <!-- Options Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px;">
      <div class="duo-option-card" onclick="window.selectIntroGoal(this, 'career')">
        <span style="font-size: 36px;">💼</span>
        <div>
          <div style="font-weight: 800; font-size: 16px; color: var(--text-main);">
            ${isSq ? "Të Bëhem Frontend Zhvillues" : "Become a Frontend Engineer"}
          </div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            ${isSq ? "Mëso nga zero deri te punësimi në kompani teknologjike." : "Learn job-ready React & modern web engineering from zero."}
          </div>
        </div>
      </div>

      <div class="duo-option-card" onclick="window.selectIntroGoal(this, 'websites')">
        <span style="font-size: 36px;">🚀</span>
        <div>
          <div style="font-weight: 800; font-size: 16px; color: var(--text-main);">
            ${isSq ? "Ndërtim Faqesh & Biznesi" : "Build Websites & Startups"}
          </div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            ${isSq ? "Ndërto platforma për veten dhe për klientët e tu." : "Create custom software, SaaS prototypes, and apps."}
          </div>
        </div>
      </div>

      <div class="duo-option-card" onclick="window.selectIntroGoal(this, 'react')">
        <span style="font-size: 36px;">⚛️</span>
        <div>
          <div style="font-weight: 800; font-size: 16px; color: var(--text-main);">
            ${isSq ? "Përvetësim i React & JavaScript" : "Master Modern React & JS"}
          </div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            ${isSq ? "Krijo komponentë modernë dhe logjikë reaktive." : "Deep dive into components, state, hooks, and clean code."}
          </div>
        </div>
      </div>

      <div class="duo-option-card" onclick="window.selectIntroGoal(this, 'fun')">
        <span style="font-size: 36px;">🧠</span>
        <div>
          <div style="font-weight: 800; font-size: 16px; color: var(--text-main);">
            ${isSq ? "Mësim për Kureshtje & Logjikë" : "Brain Training & Curiosity"}
          </div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            ${isSq ? "Mëso si funksionon bota dixhitale 5 minuta në ditë." : "Understand how computers think with bite-sized daily lessons."}
          </div>
        </div>
      </div>
    </div>

    <!-- Continue Button Row -->
    <div style="display: flex; justify-content: center;">
      <button class="duo-btn duo-btn-green" style="width: 100%; max-width: 380px;" onclick="window.goToIntroStep2()">
        ${isSq ? "VAZHDO HAPIN TJETËR →" : "CONTINUE TO NEXT STEP →"}
      </button>
    </div>
  `;
}

export function renderStep2(isSq) {
  return `
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 36px; flex-wrap: wrap;">
      ${renderMascotSvg()}
      <div class="duo-speech-bubble">
        ${isSq 
          ? "Shkëlqyer! Sa kohë dëshiron të investosh çdo ditë për të mbajtur <strong>Serinë tënde (Streak)</strong>?" 
          : "Awesome! How much daily learning time can you commit to maintain your <strong>Daily Streak</strong>?"}
      </div>
    </div>

    <h2 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 24px; color: var(--text-main);">
      ${isSq ? "Zgjidh ritmin tënd ditor:" : "Choose your daily commitment:"}
    </h2>

    <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; max-width: 600px; margin-left: auto; margin-right: auto;">
      <div class="duo-option-card" onclick="window.selectCommitment(this, 5)">
        <span style="font-size: 28px;">☕</span>
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 16px; color: var(--text-main);">${isSq ? 'Relaks' : 'Casual'}</span>
          <span style="font-size: 14px; font-weight: 700; color: var(--duo-blue);">${isSq ? '5 minuta në ditë' : '5 mins / day'}</span>
        </div>
      </div>

      <div class="duo-option-card selected" onclick="window.selectCommitment(this, 10)">
        <span style="font-size: 28px;">⚡</span>
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 16px; color: var(--text-main);">${isSq ? 'I Rregullt (E rekomanduar)' : 'Regular (Recommended)'}</span>
          <span style="font-size: 14px; font-weight: 700; color: var(--duo-green);">${isSq ? '10 minuta në ditë' : '10 mins / day'}</span>
        </div>
      </div>

      <div class="duo-option-card" onclick="window.selectCommitment(this, 15)">
        <span style="font-size: 28px;">🔥</span>
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 16px; color: var(--text-main);">${isSq ? 'Serioz' : 'Serious'}</span>
          <span style="font-size: 14px; font-weight: 700; color: var(--duo-gold);">${isSq ? '15 minuta në ditë' : '15 mins / day'}</span>
        </div>
      </div>

      <div class="duo-option-card" onclick="window.selectCommitment(this, 25)">
        <span style="font-size: 28px;">🚀</span>
        <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; font-size: 16px; color: var(--text-main);">${isSq ? 'Intensiv' : 'Intense'}</span>
          <span style="font-size: 14px; font-weight: 700; color: var(--duo-purple);">${isSq ? '25 minuta në ditë' : '25 mins / day'}</span>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: center;">
      <button class="duo-btn duo-btn-green" style="width: 100%; max-width: 380px;" onclick="window.goToIntroStep3()">
        ${isSq ? "VAZHDO TE SFIDA E PARË →" : "TRY FIRST MINI-CHALLENGE →"}
      </button>
    </div>
  `;
}

export function renderStep3(isSq) {
  return `
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap;">
      ${renderMascotSvg()}
      <div class="duo-speech-bubble">
        ${isSq 
          ? "Le të provojmë të shkruajmë <strong>rreshtin tënd të parë të kodit</strong> tani! Kliko blloqet me radhë për të ndërtuar titullin e parë të uebsajtit tënd." 
          : "Let's write your <strong>very first line of code</strong> right now! Click the blocks in order to build your first website title."}
      </div>
    </div>

    <div style="background: var(--bg-surface); border: 2px solid var(--border-subtle); border-radius: 24px; padding: 28px; max-width: 650px; margin: 0 auto 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
      <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--duo-blue); letter-spacing: 0.8px; margin-bottom: 12px;">
        ${isSq ? "SFIDA E SHPEJTË E QUOLY-T" : "QUOLY'S QUICK WIN CHALLENGE"}
      </div>

      <div style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">
        ${isSq ? "Qëllimi: Ndërto titullin <h1>Hello, World!</h1>" : "Target: Assemble <h1>Hello, World!</h1>"}
      </div>

      <!-- Puzzle Slot Target -->
      <div class="duo-puzzle-slot" id="duo-puzzle-slot" style="margin-bottom: 20px;">
        <span id="slot-placeholder" style="color: var(--text-faint); font-size: 13px;">${isSq ? "Kliko blloqet poshtë për t'i vendosur këtu..." : "Tap the code blocks below to assemble..."}</span>
      </div>

      <!-- Code Blocks Pool -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
        <button class="duo-puzzle-block" onclick="window.tapCodeBlock(this, '<h1>')">&lt;h1&gt;</button>
        <button class="duo-puzzle-block" onclick="window.tapCodeBlock(this, 'Hello, World!')">Hello, World!</button>
        <button class="duo-puzzle-block" onclick="window.tapCodeBlock(this, '</h1>')">&lt;/h1&gt;</button>
        <button class="duo-puzzle-block" onclick="window.resetPuzzleSlot()">↺ Reset</button>
      </div>

      <!-- Live Mini Preview -->
      <div id="mini-preview-container" style="display: none; padding: 16px; background: rgba(88, 204, 2, 0.1); border: 2px solid var(--duo-green); border-radius: 16px; margin-top: 16px; text-align: center;">
        <div style="font-size: 12px; font-weight: 800; color: var(--duo-green); text-transform: uppercase; margin-bottom: 4px;">🎉 Real Live Browser Render:</div>
        <div id="mini-preview-content" style="font-size: 26px; font-weight: 900; color: var(--text-main);"></div>
      </div>
    </div>

    <div style="display: flex; justify-content: center;">
      <button id="btn-finish-intro" class="duo-btn duo-btn-green" style="width: 100%; max-width: 380px; display: none;" onclick="window.completeIntroOnboarding()">
        ${isSq ? "FILLONI AKADEMINË QUOLYTECH 🚀" : "START QUOLYTECH ACADEMY 🚀"}
      </button>
    </div>
  `;
}

// Interactive Duolingo Stepping-Stones Adventure Map
export function renderDuolingoPath(state) {
  const isSq = state.settings.language === "sq";
  const completed = state.progress.completedLessons || [];

  return `
    <div style="background: var(--bg-primary); min-height: 100%; padding-bottom: 60px;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, var(--duo-green), #46a302); color: white; padding: 24px 20px; text-align: center; border-bottom: 4px solid var(--duo-green-dark);">
        <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 6px;">🦉 QuolyTech Adventure Map</h1>
        <p style="font-size: 14px; opacity: 0.9;">
          ${isSq ? "Rruga jote e përditshme drejt bërjes një zhvillues i plotë React!" : "Your daily stepping stones from complete beginner to React Developer!"}
        </p>
      </div>

      <div class="duo-path-wrapper">
        ${allCourses.map((course, cIdx) => `
          <div style="width: 100%; text-align: center; margin: 16px 0 8px;">
            <span class="brand-badge" style="font-size: 13px; padding: 6px 16px; background: rgba(59, 130, 246, 0.15); border-color: var(--duo-blue); color: var(--duo-blue); font-weight: 800;">
              ${course.title.toUpperCase()}
            </span>
          </div>

          ${course.lessons.map((lesson, lIdx) => {
            const isDone = completed.includes(lesson.id);
            const isCurrent = state.progress.currentLessonId === lesson.id;
            const nodeClass = isDone ? 'duo-node-green' : isCurrent ? 'duo-node-gold' : 'duo-node-blue';
            const icon = isDone ? '★' : isCurrent ? '▶' : '●';

            // Alternating zig-zag offset
            const offset = (lIdx % 3 === 0) ? '0px' : (lIdx % 3 === 1) ? '-35px' : '35px';

            return `
              <div style="display: flex; flex-direction: column; align-items: center; transform: translateX(${offset});">
                <div 
                  class="duo-path-node ${nodeClass}" 
                  onclick="window.selectPathNode('${lesson.id}')"
                  title="${lesson.title}"
                >
                  ${isDone ? '<div class="duo-node-crown">👑</div>' : ''}
                  <span style="color: white; font-weight: 900;">${icon}</span>
                </div>
                <div style="margin-top: 8px; font-size: 12px; font-weight: 700; color: var(--text-main); text-align: center; max-width: 130px;">
                  ${lesson.title}
                </div>
              </div>
            `;
          }).join("")}
        `).join("")}

        <!-- Final Chest Celebration -->
        <div style="text-align: center; margin-top: 20px;">
          <div style="font-size: 56px; cursor: pointer;" onclick="window.openCertificateModal()">🎁</div>
          <div style="font-weight: 800; font-size: 15px; color: var(--duo-gold);">Full React Mastery Chest!</div>
        </div>
      </div>
    </div>
  `;
}

// Window actions for Intro
window.selectIntroGoal = function(cardEl, goal) {
  sounds.playPop();
  document.querySelectorAll('.duo-option-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
};

window.selectCommitment = function(cardEl, mins) {
  sounds.playPop();
  document.querySelectorAll('.duo-option-card').forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
};

window.goToIntroStep2 = function() {
  sounds.playPop();
  const c = document.getElementById("intro-step-container");
  if (c) c.innerHTML = renderStep2(window.getAcademyLanguage() === "sq");
};

window.goToIntroStep3 = function() {
  sounds.playPop();
  const c = document.getElementById("intro-step-container");
  if (c) c.innerHTML = renderStep3(window.getAcademyLanguage() === "sq");
};

let slottedBlocks = [];
window.tapCodeBlock = function(btnEl, token) {
  sounds.playPop();
  slottedBlocks.push(token);
  btnEl.classList.add('slotted');

  const slot = document.getElementById("duo-puzzle-slot");
  const placeholder = document.getElementById("slot-placeholder");
  if (placeholder) placeholder.style.display = "none";

  const chip = document.createElement("span");
  chip.className = "duo-puzzle-block";
  chip.style.borderColor = "var(--duo-green)";
  chip.textContent = token;
  slot.appendChild(chip);

  // Check if assembled correctly
  const full = slottedBlocks.join("");
  if (full === "<h1>Hello, World!</h1>") {
    sounds.playCorrect();
    const previewContainer = document.getElementById("mini-preview-container");
    const previewContent = document.getElementById("mini-preview-content");
    const finishBtn = document.getElementById("btn-finish-intro");

    if (previewContainer && previewContent) {
      previewContainer.style.display = "block";
      previewContent.innerHTML = full;
    }
    if (finishBtn) finishBtn.style.display = "block";
  }
};

window.resetPuzzleSlot = function() {
  slottedBlocks = [];
  const slot = document.getElementById("duo-puzzle-slot");
  if (slot) {
    slot.innerHTML = `<span id="slot-placeholder" style="color: var(--text-faint); font-size: 13px;">Tap the code blocks below to assemble...</span>`;
  }
  document.querySelectorAll('.duo-puzzle-block').forEach(b => b.classList.remove('slotted'));
};

window.completeIntroOnboarding = function() {
  sounds.playLevelUp();
  window.enterAcademy('learn');
};

window.mascotEasterEgg = function() {
  sounds.playPop();
  alert("🦉 Quoly says: 'Keep up the streak! You are becoming an incredible developer!'");
};

window.selectPathNode = function(lessonId) {
  sounds.playPop();
  window.selectLesson(lessonId);
  window.switchView('learn');
};
