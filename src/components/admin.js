import { allCourses } from '../curriculum/index.js';

export function renderAdminPanel() {
  return `
    <div style="max-width: 980px; margin: 0 auto; padding: 32px 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <span class="meta-pill" style="color: var(--brand-purple); border-color: rgba(139, 92, 246, 0.4);">Academy Operations</span>
          <h1 style="font-size: 26px; font-weight: 800; margin: 8px 0 4px;">Curriculum & Content Management</h1>
          <p style="color: var(--text-muted); font-size: 14px;">QuolyTech internal course structuring and student progress telemetry.</p>
        </div>
        <button onclick="exportAcademyData()" class="btn-secondary">📥 Export Curriculum JSON</button>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; margin-bottom: 28px;">
        <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 16px; color: var(--text-main);">Course Catalog Overview</h3>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${allCourses.map(c => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div>
                <div style="font-weight: 700; color: var(--text-main);">${c.title}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${c.lessons.length} Modules • Bilingual EN/SQ Supported</div>
              </div>
              <span class="brand-badge">${c.badge}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}
