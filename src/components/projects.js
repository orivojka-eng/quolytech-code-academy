import { capstoneProjects } from '../curriculum/index.js';

export function renderProjectsHub(onSelectProject) {
  return `
    <div style="max-width: 980px; margin: 0 auto; padding: 32px 24px;">
      <div style="margin-bottom: 28px;">
        <span class="meta-pill" style="color: var(--brand-emerald); border-color: rgba(16, 185, 129, 0.4);">Capstone Milestones</span>
        <h1 style="font-size: 26px; font-weight: 800; margin: 8px 0 6px;">Hands-On Portfolio Projects</h1>
        <p style="color: var(--text-muted); font-size: 14px;">Build production-quality web applications that prove your capabilities to clients and engineering teams.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
        ${capstoneProjects.map(proj => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="meta-pill" style="font-size: 11px;">${proj.level}</span>
                <span style="font-size: 12px; color: var(--brand-blue); font-weight: 700;">${proj.technologies.join(" • ")}</span>
              </div>
              <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${proj.title}</h3>
              <p style="font-size: 13.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">${proj.description}</p>
            </div>
            <div>
              <button 
                onclick="loadCapstoneProject('${proj.id}')"
                class="btn-run" 
                style="width: 100%; justify-content: center;"
              >
                🚀 Open Project Studio
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}
