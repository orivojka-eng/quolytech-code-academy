export const course3 = {
  id: "course-3",
  title: "JavaScript Engine",
  titleSq: "Motori i JavaScript",
  description: "Master the programming language of the web. Learn data structures, algorithms, DOM manipulation, and asynchronous APIs.",
  descriptionSq: "Mësoni gjuhën kryesore të programimit në web. Mësoni strukturat e të dhënave, DOM manipulation, dhe lidhjen me API.",
  icon: "cpu",
  badge: "Core Logic",
  lessons: [
    {
      id: "js-variables-datatypes",
      title: "Variables (let, const) & Data Types",
      titleSq: "Variablat (let, const) dhe Llojet e të Dhënave",
      module: "JS Fundamentals",
      difficulty: "Beginner",
      estimatedMinutes: 12,
      objectives: [
        "Learn what a variable is and why we use let vs const",
        "Master primitive data types: String, Number, Boolean, null, undefined",
        "Understand type coercion and template literals (${})"
      ],
      whyItMatters: "Variables are the foundational building blocks of all logic; they allow programs to remember and transform information dynamically.",
      theory: `A **variable** is a named storage container in the computer's memory.

### How to Declare Variables:
- **\`const\`**: Use this by default! It creates a constant variable whose value **cannot** be reassigned.
- **\`let\`**: Use only when the value is expected to change over time (like a score counter).
- *(Avoid \`var\`: It is the outdated legacy way with confusing scoping rules).*

### Primitive Data Types:
1. **String**: Text wrapped in quotes: \`"QuolyTech"\`, \`'Alex'\`
2. **Number**: Integers or decimals: \`42\`, \`99.95\`
3. **Boolean**: Only two possibilities: \`true\` or \`false\`
4. **null**: Intentional absence of any value.
5. **undefined**: A variable declared but not yet assigned a value.`,
      theorySq: `Një **variabël** është një kuti e emërtuar në memorien e kompjuterit ku ruan një të dhënë.

### Si të Krijoni Variabla:
- **\`const\`**: Përdoreni gjithmonë si zgjedhje të parë! Krijon një vlerë konstante që **nuk** ndryshon më vonë gjatë programit.
- **\`let\`**: Përdoreni vetëm kur vlera do të ndryshojë (p.sh. pikët e një loje ose numëruesi).
- *(Mos përdorni \`var\`: Është mënyra e vjetër që krijonte gabime të fshehura).*

### Llojet Kryesore të të Dhënave:
1. **String (Tekst)**: Fjalë brenda thonjëzave: \`"QuolyTech"\`
2. **Number (Numër)**: Numra të plotë ose me presje: \`100\`, \`3.14\`
3. **Boolean**: Vetëm dy gjendje logjike: \`true\` (e vërtetë) ose \`false\` (e gabuar).
4. **null**: Mungesë e qëllimshme e vlerës.
5. **undefined**: Variabël që ekziston por ende nuk i është dhënë vlerë.`,
      metaphor: "A variable is like a labeled moving box: The label is the variable name (e.g. 'kitchen_utensils'), and the contents inside the box is the value.",
      metaphorSq: "Një variabël është si një kuti me etiketë: Etiketa sipër është emri i variablit (p.sh. 'mosha'), dhe sendi brenda kutisë është vlera (p.sh. 25).",
      codeExample: `const academyName = "QuolyTech Code Academy";
let activeStudents = 1420;
const isEnrolled = true;

// Template literal with backticks allows inserting variables cleanly
console.log(\`Welcome to \${academyName}! Students: \${activeStudents}\`);

// Reassigning let variable as more students enroll
activeStudents = activeStudents + 1;
console.log("Updated student count:", activeStudents);`,
      codeExplanation: [
        "`const academyName` creates a permanent string.",
        "`let activeStudents` allows increasing the number later.",
        "Template literals (backticks \`\`) let you embed variables using \`${variable}\`."
      ],
      type: "javascript",
      starterCode: `// 1. Declare a const named studentName with your name as a string
// 2. Declare a let named lessonsCompleted with the number 0
// 3. Increment lessonsCompleted by 1
// 4. Log both values using console.log
`,
      task: "Declare const studentName, let lessonsCompleted = 0, increment it to 1, and log them.",
      taskSq: "Krijo const studentName, let lessonsCompleted = 0, rrite në 1, dhe printoji në console.",
      hint: "const studentName = \"Alex\"; let lessonsCompleted = 0; lessonsCompleted++; console.log(studentName, lessonsCompleted);",
      solution: `const studentName = "Elena";
let lessonsCompleted = 0;
lessonsCompleted = lessonsCompleted + 1;

console.log(\`Student: \${studentName}, Lessons completed: \${lessonsCompleted}\`);`,
      solutionExplanation: "Using const for invariant values and let for mutating counters is standard modern JavaScript practice.",
      testAssertions: [
        {
          description: "Declares studentName, lessonsCompleted, and logs them",
          test: (logs, code) => /const\s+studentName/i.test(code) && /let\s+lessonsCompleted/i.test(code)
        }
      ],
      quiz: {
        question: "What happens if you attempt to reassign a variable declared with 'const'?",
        options: [
          "The computer turns off.",
          "JavaScript throws a TypeError: Assignment to constant variable.",
          "It automatically converts the variable into a string.",
          "It silently ignores the command."
        ],
        correctIndex: 1,
        explanation: "const enforces immutability of the variable identifier binding; trying to reassign it triggers an immediate TypeError."
      }
    },
    {
      id: "js-functions-scope",
      title: "Functions, Parameters, Return Values & Arrow Syntax",
      titleSq: "Funksionet, Parametrat, Kthimi i Vlerave dhe Arrow Functions",
      module: "Core Logic",
      difficulty: "Intermediate",
      estimatedMinutes: 14,
      objectives: [
        "Understand why functions prevent repetitive code (DRY: Don't Repeat Yourself)",
        "Learn parameters (inputs) and return values (outputs)",
        "Master modern ES6 Arrow Function syntax: () => {}"
      ],
      whyItMatters: "Functions are the workhorses of software; they package reusable logic that can be executed on command anywhere in your application.",
      theory: `A **function** is a self-contained block of code designed to perform a specific task.

### Anatomy of a Function:
\`\`\`javascript
function calculateTotal(price, taxRate) {
  const tax = price * taxRate;
  return price + tax;
}
\`\`\`
- **Parameters**: \`price\` and \`taxRate\` are placeholder inputs.
- **\`return\`**: Sends the final calculated result back to whoever called the function.

### Modern Arrow Functions (ES6):
Arrow functions are a concise modern syntax widely used in modern JavaScript and React:
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
const add = (a, b) => a + b;
\`\`\``,
      theorySq: `Një **funksion** është një bllok kodi i ripërdorshëm i krijuar për të kryer një detyrë të caktuar sa herë që e thërret.

### Anatomia e një Funksioni:
\`\`\`javascript
function llogaritTotale(qmimi, tvsh) {
  const shumaTvsh = qmimi * tvsh;
  return qmimi + shumaTvsh;
}
\`\`\`
- **Parametrat**: Të dhënat hyrëse që i japim makinës.
- **\`return\`**: Prodhimi përfundimtar që funksioni na kthen mbrapsht.

### Arrow Functions (Funksionet me Shigjetë):
Mënyra moderne e shkrimit në JavaScript dhe React:
\`\`\`javascript
const pershendet = (emri) => \`Përshëndetje, \${emri}!\`;
const mblidh = (a, b) => a + b;
\`\`\``,
      metaphor: "A function is like a coffee maker: You pour in water and coffee beans (parameters), it brews internally (logic), and it pours out a hot cup of espresso (return value).",
      metaphorSq: "Një funksion është si një aparat kafeje: I hedh ujin dhe kafen (parametrat), ai e zien brenda (logjika), dhe të nxjerr filxhanin me ekspres (return value).",
      codeExample: `// Arrow function calculating completion percentage
const getProgressPercent = (completed, total) => {
  const ratio = (completed / total) * 100;
  return Math.round(ratio);
};

const currentProgress = getProgressPercent(4, 10);
console.log(\`Academy Progress: \${currentProgress}%\`);`,
      codeExplanation: [
        "`(completed, total)` are the input parameters.",
        "`return Math.round(ratio)` produces the rounded percentage output.",
        "`getProgressPercent(4, 10)` invokes the function with actual numbers."
      ],
      type: "javascript",
      starterCode: `// Write an arrow function named calculateDiscount
// It should accept two parameters: (price, discountPercent)
// It should return the discounted price: price - (price * (discountPercent / 100))

const calculateDiscount = (price, discountPercent) => {
  // Your code here
};

// Test your function:
console.log("Discounted price:", calculateDiscount(100, 20)); // Should print 80
`,
      task: "Complete calculateDiscount arrow function so it returns the price minus the discount percentage.",
      taskSq: "Plotëso funksionin me shigjetë calculateDiscount që të kthejë çmimin me zbritje.",
      hint: "Return price - (price * (discountPercent / 100));",
      solution: `const calculateDiscount = (price, discountPercent) => {
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
};

console.log("Discounted price:", calculateDiscount(100, 20));`,
      solutionExplanation: "Functions take inputs, compute cleanly without global side-effects, and return predictable output values.",
      testAssertions: [
        {
          description: "calculateDiscount returns 80 for 100 and 20",
          test: (logs, code) => logs.some(l => /80/.test(l)) || /calculateDiscount\s*=\s*\(/i.test(code)
        }
      ],
      quiz: {
        question: "What does the 'return' keyword do inside a function?",
        options: [
          "It restarts the computer.",
          "It terminates execution of the function and sends a specified value back to the caller.",
          "It prints text to the screen in green.",
          "It undoes the last git commit."
        ],
        correctIndex: 1,
        explanation: "The return statement ends function execution immediately and delivers the resulting expression to the calling statement."
      }
    },
    {
      id: "js-arrays-methods",
      title: "Arrays & Modern Array Methods (map, filter)",
      titleSq: "Listat (Arrays) dhe Metodat Moderne (map, filter)",
      module: "Data Structures",
      difficulty: "Intermediate",
      estimatedMinutes: 15,
      objectives: [
        "Understand indexed lists in JavaScript",
        "Add and remove items with push, pop, shift, unshift",
        "Master the superpowers of modern functional programming: .map() and .filter()"
      ],
      whyItMatters: ".map() and .filter() are used hundreds of times in every real-world React app to transform lists of data into user interface elements.",
      theory: `An **Array** is an ordered list of values stored in a single variable:
\`\`\`javascript
const technologies = ["HTML", "CSS", "JavaScript", "React"];
console.log(technologies[0]); // "HTML" (zero-indexed!)
\`\`\`

### The Two Most Important Array Methods:
1. **\`.map()\`**: Transforms every item in the array into something new, returning a new array of the exact same length:
\`\`\`javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]
\`\`\`

2. **\`.filter()\`**: Tests every item with a true/false condition and keeps only those that pass:
\`\`\`javascript
const scores = [85, 42, 98, 60];
const passing = scores.filter(score => score >= 70); // [85, 98]
\`\`\``,
      theorySq: `Një **Array (Listë)** është një koleksion i renditur vlerash brenda një variabli të vetëm:
\`\`\`javascript
const gjuhet = ["HTML", "CSS", "JavaScript", "React"];
console.log(gjuhet[0]); // "HTML" (numërimi fillon nga 0!)
\`\`\`

### Dy Metodat më të Fuqishme:
1. **\`.map()\`**: Merr çdo element të listës, i bën një ndryshim, dhe kthen një listë të re me rezultatet:
\`\`\`javascript
const numrat = [1, 2, 3];
const dyfishi = numrat.map(n => n * 2); // [2, 4, 6]
\`\`\`

2. **\`.filter()\`**: Filtruesi që mban vetëm elementet që plotësojnë një kusht të caktuar:
\`\`\`javascript
const notat = [10, 4, 8, 5];
const kaluese = notat.filter(nota => nota >= 6); // [10, 8]
\`\`\``,
      metaphor: "An array is like an organizer box with numbered slots. .map() is like taking every item out, painting it gold, and placing it back. .filter() is like a security checkpoint only letting certain items through.",
      metaphorSq: "Array është si një kuti me ndarje të numëruara. .map() është sikur të marrësh çdo send nga kutia, ta lyesh me ngjyrë dhe ta vendosësh në kutinë e re. .filter() është si një roje sigurie që kontrollon dhe lejon të kalojnë vetëm ata me biletë.",
      codeExample: `const courses = [
  { title: "HTML Basics", completed: true },
  { title: "CSS Flexbox", completed: true },
  { title: "JavaScript Logic", completed: false },
  { title: "React Components", completed: false }
];

// Keep only completed courses
const finishedCourses = courses.filter(c => c.completed);

// Extract just the titles
const courseTitles = courses.map(c => c.title);

console.log("Finished:", finishedCourses.length);
console.log("Titles:", courseTitles);`,
      codeExplanation: [
        "`courses.filter(c => c.completed)` tests each object's completed boolean.",
        "`courses.map(c => c.title)` transforms objects into an array of simple strings."
      ],
      type: "javascript",
      starterCode: `const numbers = [10, 25, 4, 88, 15, 3];

// 1. Use .filter() to find all numbers greater than or equal to 20
// 2. Use .map() to double each of those filtered numbers
// 3. Log the final array

const bigNumbers = numbers.filter(/* your condition */);
const doubledBigNumbers = bigNumbers.map(/* your transform */);

console.log("Result:", doubledBigNumbers);
`,
      task: "Filter numbers >= 20 and map them to double (* 2). Expected result: [50, 176].",
      taskSq: "Filtro numrat >= 20 dhe dyfishoji me map (* 2). Rezultati i pritur: [50, 176].",
      hint: "numbers.filter(n => n >= 20) and bigNumbers.map(n => n * 2)",
      solution: `const numbers = [10, 25, 4, 88, 15, 3];

const bigNumbers = numbers.filter(n => n >= 20);
const doubledBigNumbers = bigNumbers.map(n => n * 2);

console.log("Result:", doubledBigNumbers);`,
      solutionExplanation: "Chaining filter and map is the quintessential pattern for data pipeline transformations in modern web apps.",
      testAssertions: [
        {
          description: "Produces array containing [50, 176]",
          test: (logs, code) => logs.some(l => /50,\s*176|\[50, 176\]/i.test(l)) || /filter/i.test(code) && /map/i.test(code)
        }
      ],
      quiz: {
        question: "Does the .map() method mutate (change) the original array it was called on?",
        options: [
          "Yes, it overwrites the original array immediately.",
          "No, it creates and returns a brand-new array without modifying the original.",
          "Only if the array contains strings.",
          "Only when running in Google Chrome."
        ],
        correctIndex: 1,
        explanation: "Array.prototype.map is a pure immutable function: it leaves the original array untouched and returns a new transformed array."
      }
    },
    {
      id: "js-dom-events",
      title: "The DOM: Selecting Elements & Click Events",
      titleSq: "DOM: Zgjedhja e Elementeve dhe Ngjarjet e Klikimit",
      module: "Web Interactivity",
      difficulty: "Intermediate",
      estimatedMinutes: 15,
      objectives: [
        "Understand the Document Object Model (DOM) tree representation of HTML",
        "Select elements using document.querySelector()",
        "Listen to user clicks with addEventListener('click', ...)",
        "Dynamically change text and styles in real-time"
      ],
      whyItMatters: "The DOM is the bridge between JavaScript logic and visual HTML on the user's screen. It makes static pages fully interactive.",
      theory: `When a browser loads an HTML file, it transforms the tags into a tree of JavaScript objects called the **DOM (Document Object Model)**.

### 1. Selecting Elements:
\`\`\`javascript
const heading = document.querySelector("#page-title");
const button = document.querySelector(".btn-submit");
\`\`\`

### 2. Modifying Content:
\`\`\`javascript
heading.textContent = "Welcome Back, Elena!";
heading.style.color = "#3b82f6";
\`\`\`

### 3. Listening for User Interactions (Events):
\`\`\`javascript
button.addEventListener("click", () => {
  console.log("Button was clicked by the user!");
  heading.classList.toggle("active");
});
\`\`\``,
      theorySq: `Kur shfletuesi hap një faqe HTML, ai e kthen çdo etiketë në një objekt që mund të komandohet me JavaScript. Kjo quhet **DOM (Document Object Model)**.

### 1. Si të Kapim një Element:
\`\`\`javascript
const titulli = document.querySelector("#titulli-faqes");
const butoni = document.querySelector(".butoni-klik");
\`\`\`

### 2. Si të Ndryshojmë Tekstin ose Pamjen:
\`\`\`javascript
titulli.textContent = "Mirë se erdhe Elena!";
titulli.style.color = "#2563eb";
\`\`\`

### 3. Dëgjimi i Veprimeve të Përdoruesit (Events):
\`\`\`javascript
butoni.addEventListener("click", () => {
  console.log("Butoni u klikua me sukses!");
  titulli.textContent = "Urime! E klikove butonin.";
});
\`\`\``,
      metaphor: "HTML is a puppet made of wood. The DOM is the strings attached to its arms and legs. JavaScript is the puppeteer pulling the strings whenever the audience (user) shouts a command.",
      metaphorSq: "HTML është si një kukull prej druri. DOM-i janë fijet e lidhura te duart dhe këmbët e saj. JavaScript është mjeshtri që tërheq fijet sa herë që spektatori shtyp një buton.",
      codeExample: `// HTML: <button id="counter-btn">Clicks: 0</button>
let count = 0;
const btn = document.querySelector("#counter-btn");

btn.addEventListener("click", () => {
  count++;
  btn.textContent = \`Clicks: \${count}\`;
});`,
      codeExplanation: [
        "`document.querySelector` locates the button in the page DOM.",
        "`addEventListener('click', ...)` registers an event listener callback.",
        "`btn.textContent` updates the displayed label immediately upon every click."
      ],
      type: "javascript",
      starterCode: `// HTML context:
// <h2 id="status-text">System Offline</h2>
// <button id="power-btn">Power On</button>

// 1. Select the heading #status-text and button #power-btn
// 2. Add an event listener to the button for "click"
// 3. Inside the click handler, change status-text textContent to "System Online: Active"

const statusHeading = document.querySelector("#status-text");
const powerBtn = document.querySelector("#power-btn");

// Add your event listener below:
`,
      task: "Add a click listener to powerBtn that sets statusHeading.textContent = 'System Online: Active'.",
      taskSq: "Shto një dëgjues klikimi te powerBtn që vendos statusHeading.textContent = 'System Online: Active'.",
      hint: "powerBtn.addEventListener('click', () => { statusHeading.textContent = 'System Online: Active'; });",
      solution: `const statusHeading = document.querySelector("#status-text");
const powerBtn = document.querySelector("#power-btn");

powerBtn.addEventListener("click", () => {
  statusHeading.textContent = "System Online: Active";
});`,
      solutionExplanation: "Connecting events to DOM mutations is the fundamental pattern of client-side web interactivity.",
      testAssertions: [
        {
          description: "Attaches click event listener to update textContent",
          test: (logs, code) => /addEventListener\s*\(\s*['"]click['"]/i.test(code) && /textContent/i.test(code)
        }
      ],
      quiz: {
        question: "What does the first argument of addEventListener('click', handler) specify?",
        options: [
          "The name of the CSS file to load.",
          "The specific event type to listen for (such as 'click', 'keydown', or 'submit').",
          "The database password.",
          "The width of the button in pixels."
        ],
        correctIndex: 1,
        explanation: "The first parameter defines the event string identifier (e.g. 'click', 'mouseover', 'scroll') that triggers the handler callback function."
      }
    }
  ]
};
