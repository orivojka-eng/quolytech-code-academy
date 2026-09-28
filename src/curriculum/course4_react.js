export const course4 = {
  id: "course-4",
  title: "Modern React Ecosystem",
  titleSq: "Ekosistemi Modern i React",
  description: "Learn how the world's top tech companies build scalable, component-driven user interfaces with React 18+.",
  descriptionSq: "Mësoni si kompanitë më të mëdha botërore ndërtojnë aplikacione moderne me komponentë dhe React 18+.",
  icon: "layers",
  badge: "Advanced Frontend",
  lessons: [
    {
      id: "react-mental-model-jsx",
      title: "The React Mental Model & JSX Syntax",
      titleSq: "Modeli Mendor i React dhe Sintaksa JSX",
      module: "React Foundations",
      difficulty: "Intermediate",
      estimatedMinutes: 12,
      objectives: [
        "Understand why React was invented by Facebook/Meta to replace manual DOM updates",
        "Learn what JSX is: HTML written directly inside JavaScript",
        "Master JSX rules: className instead of class, closing all tags, single parent element"
      ],
      whyItMatters: "React is the undisputed industry standard for frontend engineering, powering millions of SaaS products, dashboards, and mobile apps worldwide.",
      theory: `In plain JavaScript, if your data changes, you must manually find the DOM elements and manually update their text:
\`\`\`javascript
document.querySelector("#score").textContent = newScore;
\`\`\`
In large apps with hundreds of buttons, this becomes an unmaintainable tangled mess!

### The React Mental Model:
In React, you don't touch the DOM directly. Instead, you describe:
**"Given this data, here is what the UI should look like."**
When data changes, React's **Virtual DOM** automatically figures out the exact minimal changes needed and updates the screen in microseconds!

### What is JSX?
JSX stands for **JavaScript XML**. It allows you to write HTML-like tags directly inside JavaScript files:
\`\`\`jsx
function WelcomeCard() {
  const student = "Alex";
  return (
    <div className="card">
      <h2>Welcome, {student}!</h2>
      <p>Your journey into React starts now.</p>
    </div>
  );
}
\`\`\`
Notice curly braces \`{student}\`: Inside JSX, curly braces switch back to JavaScript mode to evaluate variables!`,
      theorySq: `Në JavaScript të zakonshëm, sa herë që të dhënat ndryshojnë, të duhet të kërkosh manualisht elementet në faqe dhe t'ua ndryshosh tekstin një nga një. Në projekte të mëdha, kjo bëhet e ndërlikuar dhe sjell shumë defekte.

### Modeli Mendor i React:
Në React ti nuk e prek DOM-in me dorë. Ti vetëm deklaron:
**"Duke pasur këto të dhëna, ja si duhet të duket ndërfaqja në ekran."**
Kur të dhënat ndryshojnë, React llogarit vetë në mënyrë automatike vetëm pjesën që ndryshoi dhe e përditëson ekranin menjëherë!

### Çfarë është JSX?
JSX të lejon të shkruash kode që duken ekzaktësisht si HTML direkt brenda funksioneve në JavaScript:
\`\`\`jsx
function Karta() {
  const emri = "Elena";
  return (
    <div className="karta-stil">
      <h2>Përshëndetje, {emri}!</h2>
    </div>
  );
}
\`\`\`
Kllapat gjarpëruese \`{emri}\` i tregojnë React-it: "Këtu vendos vlerën e variablit JavaScript!"`,
      metaphor: "React is like playing with Lego bricks: instead of carving an entire house out of a single block of wood, you build reusable small blocks (doors, windows, roofs) and snap them together.",
      metaphorSq: "React është si të ndërtosh me lodra LEGO: në vend që ta bësh të gjithë shtëpinë nga një copë e vetme, ti krijon kube të ripërdorshme (dritare, dyer, mure) dhe i bashkon si të duash.",
      codeExample: `// A pure React component written in JSX
function AcademyHeader() {
  const academy = "QuolyTech Code Academy";
  const year = 2026;
  
  return (
    <header className="academy-hero">
      <h1>{academy}</h1>
      <p>Empowering the next generation of engineers in {year}.</p>
    </header>
  );
}`,
      codeExplanation: [
        "`function AcademyHeader()` is a React component (always Capitalized!).",
        "It returns JSX describing the rendered HTML structure.",
        "`className` is used instead of `class` because `class` is a reserved keyword in JavaScript.",
        "`{academy}` evaluates the JavaScript variable inside the template."
      ],
      type: "react",
      starterCode: `// Welcome to the Live React Interactive Sandbox!
function ProfileBadge() {
  const username = "CodeMaster2026";
  const tracksCompleted = 3;

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700">
      {/* 1. Render username inside an <h2> */}
      {/* 2. Render tracksCompleted inside a <p> */}
    </div>
  );
}

// Render the component
ReactDOM.createRoot(document.getElementById("root")).render(<ProfileBadge />);
`,
      task: "Complete the ProfileBadge component to render username inside an <h2> and tracksCompleted inside a <p>.",
      taskSq: "Plotëso komponentin ProfileBadge që të shfaqë username brenda një <h2> dhe tracksCompleted brenda një <p>.",
      hint: "Use <h2>Student: {username}</h2> and <p>Tracks: {tracksCompleted}</p> inside the JSX return.",
      solution: `function ProfileBadge() {
  const username = "CodeMaster2026";
  const tracksCompleted = 3;

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700">
      <h2>Student: {username}</h2>
      <p>Tracks Completed: {tracksCompleted}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ProfileBadge />);`,
      solutionExplanation: "JSX seamlessly merges HTML structure with JavaScript dynamic variables inside functional components.",
      testAssertions: [
        {
          description: "Renders username and tracksCompleted in JSX",
          test: (logs, code) => /\{username\}/.test(code) && /\{tracksCompleted\}/.test(code)
        }
      ],
      quiz: {
        question: "Why do we write 'className' instead of 'class' when adding CSS classes in JSX?",
        options: [
          "Because JSX is case-sensitive and preferred longer words.",
          "Because 'class' is a reserved keyword in JavaScript for OOP classes, so JSX uses 'className' to avoid syntax clashes.",
          "Because className looks prettier in dark mode.",
          "Because HTML5 deprecated the class attribute."
        ],
        correctIndex: 1,
        explanation: "Because JSX transpiles directly into JavaScript function calls (React.createElement), using the reserved JS keyword 'class' would cause a compiler syntax error."
      }
    },
    {
      id: "react-usestate-reactivity",
      title: "useState: Reactive State & Re-rendering",
      titleSq: "useState: Gjendja Reaktive dhe Rindërtimi Automatik",
      module: "State Management",
      difficulty: "Intermediate",
      estimatedMinutes: 15,
      objectives: [
        "Learn what state is and how it differs from regular variables",
        "Master the useState hook syntax: const [state, setState] = useState(initial)",
        "Understand that calling setState triggers automatic component re-rendering"
      ],
      whyItMatters: "State is the heart of React. Whenever state changes, React automatically re-draws the UI to reflect the new reality instantly.",
      theory: `In a regular JavaScript function, variables disappear when the function finishes running:
\`\`\`javascript
let likes = 0;
likes++; // Regular variables don't tell the screen to update!
\`\`\`

### The \`useState\` Hook:
React provides a special function called \`useState\` that allows a component to remember data between renders:
\`\`\`jsx
import React, { useState } from 'react';

function LikeButton() {
  // Array destructuring: [currentValue, updateFunction]
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ Likes: {likes}
    </button>
  );
}
\`\`\`
### What happens when you click?
1. \`setLikes(likes + 1)\` is called.
2. React updates the internal state value.
3. React **re-renders** the \`LikeButton\` component with the new \`likes\` number!
4. The user sees the new number without refreshing the page!`,
      theorySq: `Në JavaScript të zakonshëm, kur një variabël ndryshon, ekrani nuk e di dhe nuk përditësohet automatikisht.

### Hook-u \`useState\`:
React ka një funksion special të quajtur \`useState\` që i lejon komponentit të mbajë mend të dhëna:
\`\`\`jsx
const [likes, setLikes] = useState(0);
\`\`\`
- \`likes\`: Vlera aktuale (nis me 0).
- \`setLikes\`: Funksioni i vetëm që ka të drejtë të ndryshojë vlerën.

Sa herë thërret \`setLikes(likes + 1)\`, React e rindërton (re-render) menjëherë komponentin në ekran brenda një fraksioni sekonde!`,
      metaphor: "State is like the score display on a digital basketball scoreboard. When a player scores, the referee pushes the remote button (setState), and the big illuminated digits immediately flip to the new score.",
      metaphorSq: "State (Gjendja) është si tabela elektronike e rezultateve në stadium. Kur shënohet gol, arbitri shtyp pultin (setState) dhe numrat ndriçues në tabelë ndryshojnë në çast para syve të të gjithë tifozëve.",
      codeExample: `function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Current Count: {count}</h3>
      <button onClick={() => setCount(count + 1)} style={{ padding: "8px 16px", marginRight: "8px" }}>
        Increment +1
      </button>
      <button onClick={() => setCount(0)} style={{ padding: "8px 16px" }}>
        Reset
      </button>
    </div>
  );
}`,
      codeExplanation: [
        "`React.useState(0)` initializes `count` at 0.",
        "`setCount(count + 1)` schedules an immediate UI re-render with the new number.",
        "`onClick={() => ...}` wires user button clicks to the state updater."
      ],
      type: "react",
      starterCode: `function StepTracker() {
  // 1. Declare state for steps initialized at 0 using React.useState(0)
  // 2. Complete the increment button to add 500 steps on each click
  // 3. Complete the reset button to set steps back to 0

  const [steps, setSteps] = React.useState(0);

  return (
    <div className="p-6 bg-slate-800 text-white rounded-xl">
      <h3 className="text-xl font-bold">Daily Steps: {steps}</h3>
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => /* Add 500 steps */} 
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Walk 500 Steps
        </button>
        <button 
          onClick={() => /* Reset to 0 */} 
          className="px-4 py-2 bg-slate-600 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<StepTracker />);
`,
      task: "Complete the onClick handlers: add 500 to steps on the Walk button, and reset to 0 on the Reset button.",
      taskSq: "Plotëso veprimet onClick: shto 500 hapa te butoni Walk dhe ktheje në 0 te butoni Reset.",
      hint: "Use onClick={() => setSteps(steps + 500)} and onClick={() => setSteps(0)}.",
      solution: `function StepTracker() {
  const [steps, setSteps] = React.useState(0);

  return (
    <div className="p-6 bg-slate-800 text-white rounded-xl">
      <h3 className="text-xl font-bold">Daily Steps: {steps}</h3>
      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => setSteps(steps + 500)} 
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
        >
          Walk 500 Steps
        </button>
        <button 
          onClick={() => setSteps(0)} 
          className="px-4 py-2 bg-slate-600 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<StepTracker />);`,
      solutionExplanation: "Calling setSteps updates component state immutably and causes React to re-render the DOM automatically.",
      testAssertions: [
        {
          description: "Uses setSteps to update state by +500 and reset to 0",
          test: (logs, code) => /setSteps\s*\(\s*steps\s*\+\s*500\s*\)/.test(code) && /setSteps\s*\(\s*0\s*\)/.test(code)
        }
      ],
      quiz: {
        question: "Why should you never mutate state directly, such as 'count = count + 1' in React?",
        options: [
          "It deletes the React library from the server.",
          "Direct mutation does not notify React, so no re-render will occur and the UI will not update.",
          "It forces the browser to restart.",
          "React only accepts multiplication, not addition."
        ],
        correctIndex: 1,
        explanation: "State updates must go through the setter function (setState) so that React knows the value changed and schedules an automated UI re-render."
      }
    }
  ]
};
