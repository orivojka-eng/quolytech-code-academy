import { allCourses } from '../curriculum/index.js';
import { ALL_ACHIEVEMENTS } from '../services/achievements.js';

export function renderDashboard(state) {
  const completed = state.progress.completedLessons || [];
  let totalLessons = 0;
  allCourses.forEach(c => totalLessons += c.lessons.length);
  const overallPercent = Math.round((completed.length / totalLessons) * 100);

  const unlockedAchievementIds = new Set((state.achievements || []).map(a => a.id));

  return `
    <div style="max-width: 980px; margin: 0 auto; padding: 32px 24px;">
      <!-- Hero Profile Welcome -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 28px; margin-bottom: 28px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <img src="${state.profile.avatar}" alt="Avatar" style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid var(--brand-blue);" />
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <h1 style="font-size: 24px; font-weight: 800;">${state.profile.name}</h1>
              <span class="meta-pill" style="color: var(--brand-blue); border-color: rgba(59, 130, 246, 0.4);">${state.profile.experience}</span>
            </div>
            <p style="color: var(--text-muted); font-size: 14px;">Goal: ${state.profile.goal}</p>
          </div>
        </div>

        <!-- 7-Day Streak Badge -->
        <div style="text-align: right; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 16px 20px; border-radius: var(--radius-lg);">
          <div style="display: flex; align-items: center; gap: 6px; font-size: 22px; font-weight: 800; color: var(--brand-amber);">
            🔥 ${state.progress.streak.days} Day Streak
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Active daily learner</div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 20px; border-radius: var(--radius-lg);">
          <div style="color: var(--text-faint); font-size: 12px; font-weight: 600; text-transform: uppercase;">Overall Academy Progress</div>
          <div style="font-size: 32px; font-weight: 800; margin: 6px 0; color: var(--brand-blue);">${overallPercent}%</div>
          <div style="font-size: 12px; color: var(--text-muted);">${completed.length} of ${totalLessons} lessons mastered</div>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 20px; border-radius: var(--radius-lg);">
          <div style="color: var(--text-faint); font-size: 12px; font-weight: 600; text-transform: uppercase;">Quizzes Completed</div>
          <div style="font-size: 32px; font-weight: 800; margin: 6px 0; color: var(--brand-purple);">${Object.keys(state.progress.quizScores || {}).length}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Avg. score: 100%</div>
        </div>
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 20px; border-radius: var(--radius-lg);">
          <div style="color: var(--text-faint); font-size: 12px; font-weight: 600; text-transform: uppercase;">Unlocked Badges</div>
          <div style="font-size: 32px; font-weight: 800; margin: 6px 0; color: var(--brand-emerald);">${state.achievements?.length || 1} / ${ALL_ACHIEVEMENTS.length}</div>
          <div style="font-size: 12px; color: var(--text-muted);">Developer achievements</div>
        </div>
      </div>

      <!-- Course by Course Breakdown -->
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: var(--text-main);">Curriculum Progress</h2>
      <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px;">
        ${allCourses.map(course => {
          const courseCompleted = course.lessons.filter(l => completed.includes(l.id)).length;
          const coursePercent = Math.round((courseCompleted / course.lessons.length) * 100);
          return `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 18px 24px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div>
                  <span style="font-weight: 700; font-size: 15px; color: var(--text-main);">${course.title}</span>
                  <span style="font-size: 12px; color: var(--text-faint); margin-left: 8px;">(${course.lessons.length} Lessons)</span>
                </div>
                <span style="font-weight: 700; font-size: 14px; color: var(--brand-blue);">${coursePercent}%</span>
              </div>
              <div style="height: 8px; background: var(--bg-card); border-radius: 9999px; overflow: hidden;">
                <div style="width: ${coursePercent}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #8b5cf6); border-radius: 9999px; transition: width 0.4s ease;"></div>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Achievements Showcase -->
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; color: var(--text-main);">Academy Badges & Honors</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-bottom: 36px;">
        ${ALL_ACHIEVEMENTS.map(ach => {
          const isUnlocked = unlockedAchievementIds.has(ach.id);
          return `
            <div style="background: ${isUnlocked ? 'var(--bg-surface)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isUnlocked ? 'var(--border-subtle)' : 'transparent'}; opacity: ${isUnlocked ? '1' : '0.4'}; border-radius: var(--radius-lg); padding: 18px; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">${isUnlocked ? '🏆' : '🔒'}</div>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${state.settings.language === 'sq' ? ach.titleSq : ach.title}</h3>
              <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4;">${state.settings.language === 'sq' ? ach.descSq : ach.desc}</p>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Certificate Preview Generator -->
      <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1)); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-xl); padding: 28px; text-align: center;">
        <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 6px; color: #60a5fa;">QuolyTech Verified Certificate of Achievement</h3>
        <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">Upon completing the full learning path, your verifiable credential is generated automatically.</p>
        <button 
          onclick="openCertificateModal()"
          class="btn-run" 
          style="margin: 0 auto; background: linear-gradient(135deg, #3b82f6, #8b5cf6);"
        >
          📜 Preview Academy Certificate
        </button>
      </div>
    </div>
  `;
}
