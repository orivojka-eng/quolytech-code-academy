import { course0 } from './course0_basics.js';
import { course1 } from './course1_html.js';
import { course2 } from './course2_css.js';
import { course3 } from './course3_javascript.js';
import { course4 } from './course4_react.js';

export const allCourses = [
  course0,
  course1,
  course2,
  course3,
  course4
];

export const capstoneProjects = [
  {
    id: "proj-profile-card",
    title: "Personal Developer Portfolio Card",
    titleSq: "Karta Personale e Portofolit të Zhvilluesit",
    courseId: "course-1",
    level: "Beginner",
    technologies: ["HTML5", "CSS3"],
    description: "Design a professional modern developer profile card featuring bio, social links, skills tags, and clean typography.",
    descriptionSq: "Krijoni një kartë elegante profili me bio, rrjete sociale, etiketa aftësish dhe tipografi moderne.",
    starterTemplate: {
      html: `<div class="profile-card">
  <div class="avatar-ring">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Developer Avatar" class="avatar" />
  </div>
  <h2 class="name">Elena Vance</h2>
  <p class="role">Frontend Engineer & QuolyTech Graduate</p>
  <div class="skills">
    <span class="badge">HTML5</span>
    <span class="badge">CSS3</span>
    <span class="badge">JavaScript</span>
    <span class="badge">React</span>
  </div>
  <p class="bio">Building high-performance accessible web applications. Passionate about design systems and modern web architecture.</p>
  <div class="actions">
    <button class="btn-primary">Connect on GitHub</button>
  </div>
</div>`,
      css: `.profile-card {
  max-width: 380px;
  margin: 40px auto;
  background: #1e293b;
  color: #f8fafc;
  padding: 32px 24px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
  border: 1px solid #334155;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.avatar-ring {
  width: 96px;
  height: 96px;
  margin: 0 auto 16px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.name {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
}

.role {
  margin: 0 0 16px;
  color: #94a3b8;
  font-size: 14px;
}

.skills {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.badge {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.bio {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.btn-primary {
  background: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 10px 24px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #2563eb;
}`,
      js: `console.log("Portfolio Card Initialized!");`
    }
  },
  {
    id: "proj-task-manager",
    title: "Interactive Task & Sprint Manager",
    titleSq: "Menaxhues Interaktiv i Detyrave dhe Projekteve",
    courseId: "course-3",
    level: "Intermediate",
    technologies: ["JavaScript", "DOM", "LocalStorage"],
    description: "Build an interactive task tracker with priority badges, completion checkboxes, and dynamic DOM updates.",
    descriptionSq: "Ndërtoni një aplikacion detyrash me prioritete, shënim të përfundimit dhe ruajtje në shfletues.",
    starterTemplate: {
      html: `<div class="todo-app">
  <header class="app-header">
    <h2>Sprint Task Tracker</h2>
    <p>QuolyTech Interactive JavaScript Project</p>
  </header>
  <div class="input-row">
    <input type="text" id="taskInput" placeholder="Add a new task..." />
    <button id="addBtn">Add Task</button>
  </div>
  <ul id="taskList" class="task-list"></ul>
  <div class="footer-stats">
    <span id="counter">0 tasks remaining</span>
  </div>
</div>`,
      css: `.todo-app {
  max-width: 480px;
  margin: 30px auto;
  background: #0f172a;
  color: #f8fafc;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #1e293b;
  font-family: sans-serif;
}
.app-header h2 { margin: 0 0 4px; color: #38bdf8; }
.app-header p { margin: 0 0 20px; color: #64748b; font-size: 13px; }
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.input-row input {
  flex: 1;
  background: #1e293b;
  border: 1px solid #334155;
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
}
.input-row button {
  background: #38bdf8;
  color: #0f172a;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
.task-list { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 8px; }
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #1e293b;
  border-radius: 8px;
}
.task-item.completed { text-decoration: line-through; opacity: 0.5; }
.del-btn { background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
.footer-stats { color: #94a3b8; font-size: 12px; }`,
      js: `const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

let tasks = [
  { id: 1, text: "Master HTML semantic layout", done: true },
  { id: 2, text: "Build Flexbox navigation bar", done: true },
  { id: 3, text: "Learn JavaScript array methods", done: false }
];

function render() {
  list.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "task-item" + (t.done ? " completed" : "");
    li.innerHTML = \`
      <span style="cursor:pointer;" onclick="toggleTask(\${t.id})">\${t.done ? "✅" : "⭕"} \${t.text}</span>
      <button class="del-btn" onclick="deleteTask(\${t.id})">Delete</button>
    \`;
    list.appendChild(li);
  });
  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = \`\${remaining} task\${remaining === 1 ? "" : "s"} remaining\`;
}

window.toggleTask = function(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
};

window.deleteTask = function(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
};

addBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;
  tasks.push({ id: Date.now(), text: input.value.trim(), done: false });
  input.value = "";
  render();
});

render();`
    }
  },
  {
    id: "proj-react-dashboard",
    title: "React SaaS Metric Analytics Dashboard",
    titleSq: "Paneli Analitik SaaS me React",
    courseId: "course-4",
    level: "Advanced",
    technologies: ["React 18", "Hooks", "Components"],
    description: "Build an interactive SaaS executive analytics dashboard in React featuring dynamic state counters, filterable metrics, and live reactive charts.",
    descriptionSq: "Ndërtoni një panel kontrolli ekzekutiv SaaS me React me numërues dinamikë, filtrim të dhënash dhe grafikë reaktivë.",
    starterTemplate: {
      type: "react",
      code: `function SaaSMetricsDashboard() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [mrr, setMrr] = React.useState(24850);
  const [subscribers, setSubscribers] = React.useState(1240);

  const metrics = [
    { label: "Monthly Recurring Revenue", value: "$" + mrr.toLocaleString(), change: "+14.2%", positive: true },
    { label: "Active Subscriptions", value: subscribers.toLocaleString(), change: "+8.6%", positive: true },
    { label: "Churn Rate", value: "1.8%", change: "-0.4%", positive: true },
    { label: "Customer LTV", value: "$1,820", change: "+5.1%", positive: true }
  ];

  return (
    <div style={{ fontFamily: "sans-serif", background: "#090d16", color: "#f1f5f9", minHeight: "100vh", padding: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid #1e293b", paddingBottom: "16px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "24px", color: "#60a5fa" }}>QuolyTech SaaS Intelligence</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Real-time business performance overview</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button 
            onClick={() => { setMrr(mrr + 1200); setSubscribers(subscribers + 45); }} 
            style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
          >
            + Simulate New Deal
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "#131b2e", border: "1px solid #1e293b", padding: "20px", borderRadius: "12px" }}>
            <div style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "8px" }}>{m.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "700", marginBottom: "6px" }}>{m.value}</div>
            <div style={{ color: "#10b981", fontSize: "12px", fontWeight: "600" }}>{m.change} this month</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{ background: "#131b2e", border: "1px solid #1e293b", borderRadius: "12px", padding: "20px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "18px" }}>Platform System Health</h3>
        <div style={{ display: "flex", gap: "20px", color: "#cbd5e1", fontSize: "14px" }}>
          <div>🟢 API Status: <strong>99.98%</strong></div>
          <div>⚡ Latency: <strong>42ms</strong></div>
          <div>🛡️ Security: <strong>Zero Vulnerabilities</strong></div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SaaSMetricsDashboard />);`
    }
  }
];

export function findLessonById(lessonId) {
  for (const course of allCourses) {
    const found = course.lessons.find(l => l.id === lessonId);
    if (found) return { course, lesson: found };
  }
  return null;
}

export function getNextAndPrevLessons(lessonId) {
  let all = [];
  allCourses.forEach(c => {
    c.lessons.forEach(l => {
      all.push({ courseId: c.id, lessonId: l.id });
    });
  });

  const idx = all.findIndex(item => item.lessonId === lessonId);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null
  };
}

export function searchAcademy(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results = [];

  allCourses.forEach(course => {
    course.lessons.forEach(lesson => {
      let score = 0;
      if (lesson.title.toLowerCase().includes(q)) score += 10;
      if (lesson.titleSq && lesson.titleSq.toLowerCase().includes(q)) score += 10;
      if (lesson.theory.toLowerCase().includes(q)) score += 3;
      if (lesson.metaphor.toLowerCase().includes(q)) score += 4;
      if (lesson.task.toLowerCase().includes(q)) score += 2;

      if (score > 0) {
        results.push({
          type: "lesson",
          courseId: course.id,
          courseTitle: course.title,
          lessonId: lesson.id,
          title: lesson.title,
          difficulty: lesson.difficulty,
          score
        });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score);
}
