export function renderPlayground() {
  return `
    <div style="height: 100%; display: flex; flex-direction: column; background: var(--bg-primary);">
      <!-- Playground Header -->
      <div style="padding: 12px 24px; background: var(--bg-surface); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <h2 style="font-size: 16px; font-weight: 700; color: var(--text-main);">Interactive Code Playground</h2>
          <span class="meta-pill">Experiment Freely</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <select id="playground-template" onchange="loadPlaygroundTemplate(this.value)" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-subtle); padding: 6px 12px; border-radius: var(--radius-full); font-size: 12px; outline: none;">
            <option value="react-counter">Template: React Interactive Counter</option>
            <option value="react-todo">Template: React Todo App</option>
            <option value="html-landing">Template: HTML/CSS Hero Section</option>
            <option value="blank">Blank Canvas</option>
          </select>
          <button onclick="runPlaygroundCode()" class="btn-run">▶ Run Playground</button>
        </div>
      </div>

      <!-- Playground Split Area -->
      <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; overflow: hidden;">
        <!-- Code Editor Area -->
        <div style="display: flex; flex-direction: column; border-right: 1px solid var(--border-subtle);">
          <div style="padding: 8px 16px; background: #06090e; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-mono); font-size: 11.5px; color: #38bdf8; font-weight: 700;">React 18 JSX + Tailwind CSS Enabled</span>
            <span style="font-size: 11px; color: var(--text-faint);">Auto-saved locally</span>
          </div>
          <textarea 
            id="playground-editor" 
            style="flex: 1; background: #090d16; color: #38bdf8; font-family: var(--font-mono); font-size: 13.5px; line-height: 1.6; padding: 16px; border: none; resize: none; outline: none;"
          >function InteractiveApp() {
  const [likes, setLikes] = React.useState(0);
  const [quote, setQuote] = React.useState("The best way to learn code is to write code.");

  return (
    <div className="p-8 max-w-md mx-auto my-10 bg-slate-900 border border-slate-800 rounded-2xl text-white shadow-2xl">
      <h2 className="text-xl font-bold text-blue-400 mb-2">QuolyTech Code Playground</h2>
      <p className="text-slate-400 text-sm mb-6">"{quote}"</p>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setLikes(likes + 1)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold text-sm transition"
        >
          ❤️ Like App: {likes}
        </button>
        <button 
          onClick={() => setQuote("React makes building modern UIs a joyful experience.")}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<InteractiveApp />);</textarea>
        </div>

        <!-- Live Preview Iframe & Console -->
        <div style="display: flex; flex-direction: column;">
          <iframe id="playground-preview-frame" style="flex: 1; border: none; background: #ffffff;"></iframe>
          <div id="playground-console" style="height: 120px; background: #06090e; border-top: 1px solid var(--border-subtle); padding: 10px 16px; font-family: var(--font-mono); font-size: 12px; color: #94a3b8; overflow-y: auto;">
            <div style="color: #64748b; margin-bottom: 4px;">// Playground Console Output</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
