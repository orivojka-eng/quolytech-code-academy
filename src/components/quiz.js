export function renderQuizCard(quiz, onAnswer) {
  if (!quiz) return "";

  return `
    <div class="quiz-card" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--brand-purple); letter-spacing: 0.5px;">Knowledge Verification Quiz</span>
        <span class="quiz-status-pill" style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: var(--bg-card); color: var(--text-faint);">1 Question</span>
      </div>
      <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px; color: var(--text-main);">${quiz.question}</h3>
      <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 10px;">
        ${quiz.options.map((opt, i) => `
          <button 
            class="quiz-opt-btn" 
            data-index="${i}"
            onclick="handleQuizOptionClick(${i})"
            style="text-align: left; padding: 12px 16px; border-radius: var(--radius-md); background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-main); font-size: 14px; cursor: pointer; transition: all 0.2s;"
          >
            <span style="font-weight: 700; margin-right: 8px; color: var(--text-muted);">${String.fromCharCode(65 + i)}.</span>
            ${opt}
          </button>
        `).join("")}
      </div>
      <div id="quiz-explanation-box" style="display: none; margin-top: 16px; padding: 14px 18px; border-radius: var(--radius-md); font-size: 13.5px; line-height: 1.5;"></div>
    </div>
  `;
}
