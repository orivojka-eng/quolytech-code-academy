export const course0 = {
  id: "course-0",
  title: "Computer & Web Basics",
  titleSq: "Bazat e Kompjuterit dhe Web-it",
  description: "Understand how computers think, how the internet delivers websites, and how software is built from scratch.",
  descriptionSq: "Kuptoni si mendon kompjuteri, si funksionon interneti dhe si ndërtohet programi nga e para.",
  icon: "monitor",
  badge: "Prerequisite",
  lessons: [
    {
      id: "basics-what-is-code",
      title: "What is Code & How Computers Think",
      titleSq: "Çfarë është Kodi dhe si Mendon Kompjuteri",
      module: "Digital Foundations",
      difficulty: "Beginner",
      estimatedMinutes: 8,
      objectives: [
        "Demystify what a computer program actually is",
        "Understand why computers only understand precise instructions",
        "Run your very first computer command"
      ],
      whyItMatters: "Every software engineer must understand that computers are not magical—they are extremely fast calculators that follow exact orders without question.",
      theory: `A computer is fundamentally an electronic machine that processes information. At its lowest electrical level, it only understands two states: ON (1) or OFF (0), known as binary digits or **bits**.

Because humans cannot reasonably write millions of 1s and 0s by hand, computer scientists created **programming languages**. A programming language is simply a structured, human-readable language (using English words like \`if\`, \`function\`, \`return\`) that translates your instructions into machine code.

When you write code, you are writing a detailed recipe. If a recipe says *"stir the soup for 3 minutes"*, you know what to do. If it says *"stir until nice"*, a computer would crash because *"nice"* is vague! Coding is the art of being unambiguous.`,
      theorySq: `Kompjuteri në thelb është një pajisje elektronike që përpunon të dhëna. Në nivelin më themelor elektrik, ai njeh vetëm dy gjendje: NDEZUR (1) ose FIKUR (0), të njohura si shifra binare ose **bits**.

Meqenëse njerëzit nuk mund të shkruajnë me dorë miliona njëshe dhe zero, inxhinierët krijuan **gjuhët e programimit**. Një gjuhë programimi është një gjuhë e lexueshme nga njeriu (me fjalë angleze si \`if\`, \`function\`, \`return\`) që përkthen dëshirat tuaja në udhëzime precize për procesorin.

Kur shkruani kod, po shkruani një recetë gatimi hap-pas-hapi. Nëse receta thotë *"përziej supën për 3 minuta"*, kompjuteri e di saktë çfarë të bëjë. Por nëse thotë *"përziej derisa të bëhet e mirë"*, kompjuteri bllokohet sepse *"e mirë"* është term i paqartë. Të programosh do të thotë të japësh udhëzime të sakta pa asnjë paqartësi.`,
      metaphor: "Code is like an architectural blueprint combined with a cooking recipe: it instructs the computer step-by-step on what to build and how to react.",
      metaphorSq: "Kodi është si një recetë gatimi për një robot: roboti bën fiks atë që i shkruan në letër, asnjë miligram më pak e asnjë më shumë.",
      codeExample: `// Telling the computer to display a message to the world
console.log("Hello, World! I am learning to code with QuolyTech.");`,
      codeExplanation: [
        "`console` is a built-in tool in the computer where messages are displayed.",
        "`.log(...)` is an instruction that orders the computer to print or record the text inside.",
        "The quotes `\"...\"` tell the computer: 'Treat this as plain human text (a string), not code commands.'",
        "The semicolon `;` marks the end of an instruction, like a period at the end of a sentence."
      ],
      type: "javascript",
      starterCode: `// Write your first message to the QuolyTech Console!
console.log("Welcome to QuolyTech Code Academy!");
`,
      task: "Change the text inside console.log so it prints your name: \"Hello, my name is [Your Name] and I am a future developer!\"",
      taskSq: "Ndrysho tekstin brenda console.log që të printojë emrin tënd: \"Hello, my name is [Emri Yt] and I am a future developer!\"",
      hint: "Make sure you keep the double quotation marks around your text!",
      solution: `console.log("Hello, my name is Alex and I am a future developer!");`,
      solutionExplanation: "The text between quotes is sent to console.log, which prints it directly to our live output terminal.",
      testAssertions: [
        {
          description: "Logs a welcoming greeting containing 'future developer'",
          test: (logs, code) => logs.some(l => /future developer/i.test(l)) || /future developer/i.test(code)
        }
      ],
      quiz: {
        question: "Why do computers need programming languages instead of human speech?",
        options: [
          "Computers only understand English with a British accent.",
          "Human speech is full of ambiguity, metaphors, and context that machines cannot guess; code provides mathematically precise steps.",
          "Programming languages make computers run 1000x hotter.",
          "Because computers do not have microphones."
        ],
        correctIndex: 1,
        explanation: "Computers require 100% precision. In human speech, 'pick it up' could mean anything; in code, we must specify exactly what object, where, and what action to perform."
      }
    },
    {
      id: "basics-how-web-works",
      title: "How the Web Works: Browsers, Servers & IP",
      titleSq: "Si Funksionon Web-i: Shfletuesi, Serveri dhe IP",
      module: "Internet Architecture",
      difficulty: "Beginner",
      estimatedMinutes: 10,
      objectives: [
        "Learn what happens behind the scenes when you type a URL into Chrome or Safari",
        "Understand the difference between a Client and a Server",
        "Understand HTTP requests and responses"
      ],
      whyItMatters: "When you build websites, your code doesn't just run on your laptop—it is served over global optical cables to millions of users worldwide.",
      theory: `When you type \`https://quolytech.com\` into your browser and press Enter:
1. **DNS Lookup**: Your browser asks a Domain Name System (the internet's phonebook): *"What is the numerical IP address of quolytech.com?"* (e.g., \`142.250.190.46\`).
2. **HTTP Request**: Your browser (the **Client**) sends a request packet over the internet to that computer (the **Server**): *"Please send me the home page files."*
3. **HTTP Response**: The server receives the request, packages up the **HTML, CSS, and JavaScript** files, and sends them back.
4. **Rendering**: Your browser parses the HTML into boxes, applies CSS colors, runs JavaScript animations, and renders the visual page in milliseconds!`,
      theorySq: `Kur shkruani \`https://quolytech.com\` në shfletues (Chrome, Safari) dhe shtypni Enter:
1. **Kërkimi DNS**: Shfletuesi pyet librin telefonik të internetit (DNS): *"Cila është adresa numerike IP për quolytech.com?"*
2. **Kërkesa HTTP (Request)**: Shfletuesi juaj (që quhet **Klienti**) dërgon një kërkesë te kompjuteri i largët (që quhet **Serveri**): *"Të lutem më dërgo faqen kryesore."*
3. **Përgjigjja HTTP (Response)**: Serveri e pranon kërkesën, paketon skedarët **HTML, CSS dhe JavaScript**, dhe jua dërgon mbrapsht.
4. **Vizualizimi (Rendering)**: Shfletuesi juaj i lexon këto skedarë dhe i shndërron në butona, tekste, imazhe dhe ngjyra brenda pak milisekondave!`,
      metaphor: "The browser is a customer at a restaurant table. The URL is pointing at the menu item. The internet is the waiter bringing the order to the kitchen (Server), and bringing back the freshly prepared dish (the website)!",
      metaphorSq: "Shfletuesi është si një klient në restorant. URL-ja është emri i pjatës në menu. Interneti është kamarieri që çon porosinë në kuzhinë (Server), dhe sjell pjatën e gatuar (faqen e internetit) në tavolinën tënde!",
      codeExample: `// A simulated HTTP Request in JavaScript
const url = "https://api.quolytech.com/status";
console.log("Client -> Sending GET request to:", url);
console.log("Server -> 200 OK: Returning HTML & Assets");`,
      codeExplanation: [
        "A client sends a request to an endpoint address.",
        "The server responds with a status code (like 200 for OK, or 404 for Not Found).",
        "The payload returned contains the code files your browser needs."
      ],
      type: "javascript",
      starterCode: `// Simulate client-server communication
const clientRequest = "GET /index.html HTTP/1.1";
const serverResponseCode = 200; // 200 means success!

console.log("Browser requested:", clientRequest);
console.log("Server responded with code:", serverResponseCode);
`,
      task: "Simulate a page not found scenario by changing serverResponseCode from 200 to 404, and add a console.log that says 'Page Not Found'.",
      taskSq: "Simulo rastin kur faqja nuk gjendet duke e ndryshuar serverResponseCode nga 200 në 404, dhe shto një console.log që shkruan 'Page Not Found'.",
      hint: "Change the number 200 to 404 and write console.log(\"Page Not Found\"); on the next line.",
      solution: `const clientRequest = "GET /index.html HTTP/1.1";
const serverResponseCode = 404;

console.log("Browser requested:", clientRequest);
console.log("Server responded with code:", serverResponseCode);
console.log("Page Not Found");`,
      solutionExplanation: "HTTP status 404 is the universal standard code meaning the requested resource does not exist on the server.",
      testAssertions: [
        {
          description: "Sets response code to 404 and logs Page Not Found",
          test: (logs, code) => /404/.test(code) && logs.some(l => /not found/i.test(l))
        }
      ],
      quiz: {
        question: "What is the primary role of a Web Browser (like Chrome, Edge, or Safari)?",
        options: [
          "To manufacture computer chips.",
          "To request code files from servers and render them into visual interactive pages for humans.",
          "To create electricity for internet cables.",
          "To store all websites permanently on your local hard drive."
        ],
        correctIndex: 1,
        explanation: "Browsers are rendering engines. They read code (HTML, CSS, JS) and draw it on your screen as buttons, text, and graphics."
      }
    },
    {
      id: "basics-frontend-backend",
      title: "Frontend vs. Backend: The Complete Mental Model",
      titleSq: "Frontend vs Backend: Modeli i Plotë Mendor",
      module: "Digital Foundations",
      difficulty: "Beginner",
      estimatedMinutes: 8,
      objectives: [
        "Clearly distinguish what code runs on the user's device versus the cloud",
        "Understand the Trinity of the Web: HTML, CSS, JavaScript",
        "Learn where React fits into the modern development stack"
      ],
      whyItMatters: "Knowing where your code runs saves you countless hours of confusion when building real-world web applications.",
      theory: `Every web application consists of two complementary halves:

1. **Frontend (Client-side)**: Everything the user sees, clicks, and touches in their browser.
   - **HTML**: Structure & Content (the nouns)
   - **CSS**: Appearance, Layout & Styling (the adjectives)
   - **JavaScript**: Behavior, Logic & Reactivity (the verbs)
   - **React**: An advanced JavaScript library to build modular, component-based frontends.

2. **Backend (Server-side)**: The invisible engine running in data centers. It manages databases, authenticates passwords, processes payments, and secures confidential data.`,
      theorySq: `Çdo aplikacion në internet përbëhet nga dy pjesë thelbësore:

1. **Frontend (Ana e Klientit)**: Çdo gjë që përdoruesi sheh, prek dhe klikon në ekran.
   - **HTML**: Skeleti dhe Përmbajtja (emrat)
   - **CSS**: Ngjyrat, Dizajni dhe Paraqitja (mbiemrat)
   - **JavaScript**: Veprimet, Logjika dhe Lëvizja (foljet)
   - **React**: Një sistem modern JavaScript për të ndërtuar ndërfaqe të shpejta me blloqe të ripërdorshme.

2. **Backend (Ana e Serverit)**: Motori i padukshëm që punon në qendrat e të dhënave (cloud). Ai ruan fjalëkalimet në baza të dhënash, kryen pagesat bankare dhe siguron llogaritë.`,
      metaphor: "Think of a car: The Frontend is the steering wheel, leather seats, dashboard screen, and paint job. The Backend is the engine under the hood, the fuel injection system, and the transmission.",
      metaphorSq: "Mendo një makinë: Frontend-i është timoni, sediljet prej lëkure, ekrani me prekje dhe ngjyra metalike. Backend-i është motori poshtë kapakut, depozita e benzinës dhe transmisioni që bën rrotat të lëvizin.",
      codeExample: `// The Frontend Stack summary:
const frontendTrinity = {
  HTML: "Structure (Skeleton)",
  CSS: "Design (Skin & Clothes)",
  JavaScript: "Interactivity (Muscles & Brain)"
};
console.log("Ready to master frontend:", frontendTrinity);`,
      codeExplanation: [
        "HTML builds the buttons and paragraphs.",
        "CSS makes them look beautiful with sleek colors and shadows.",
        "JavaScript listens for clicks and updates the page dynamically."
      ],
      type: "javascript",
      starterCode: `const role = "Frontend Developer";
const skills = ["HTML", "CSS", "JavaScript"];

// Add "React" to your skills list!
console.log("My target role:", role);
console.log("Core skills:", skills);
`,
      task: "Add \"React\" to the skills array and log the total number of skills using skills.length.",
      taskSq: "Shto \"React\" në listën e skills dhe printo numrin total të aftësive duke përdorur skills.length.",
      hint: "Use skills.push(\"React\"); or add it directly inside the array [\"HTML\", \"CSS\", \"JavaScript\", \"React\"].",
      solution: `const role = "Frontend Developer";
const skills = ["HTML", "CSS", "JavaScript", "React"];

console.log("My target role:", role);
console.log("Core skills:", skills);
console.log("Total skills to master:", skills.length);`,
      solutionExplanation: "React builds directly on top of JavaScript skills, completing your modern frontend developer toolkit.",
      testAssertions: [
        {
          description: "Skills array contains React and logs length",
          test: (logs, code) => /React/i.test(code) && (logs.some(l => /4/.test(l)) || /length/.test(code))
        }
      ],
      quiz: {
        question: "Which of the following describes the role of JavaScript on the web?",
        options: [
          "It defines the paragraph fonts and background colors.",
          "It creates the basic bones and raw text of the document.",
          "It provides the brain and nervous system: responding to user clicks, validating inputs, and fetching live data.",
          "It is only used to format printed paper documents."
        ],
        correctIndex: 2,
        explanation: "JavaScript brings static pages to life by listening to events (like button clicks) and executing logic dynamically without refreshing the page."
      }
    },
    {
      id: "basics-files-terminal",
      title: "Files, Folders & The Developer Terminal",
      titleSq: "Skedarët, Dosjet dhe Terminali i Programuesit",
      module: "Developer Workflow",
      difficulty: "Beginner",
      estimatedMinutes: 9,
      objectives: [
        "Understand file extensions (.html, .css, .js)",
        "Learn what an index.html file is",
        "Understand why developers love the command line terminal"
      ],
      whyItMatters: "Every software project is simply a collection of plain text files organized in directories. Mastering this unlocks project management.",
      theory: `All websites on the planet are saved as text files:
- \`index.html\`: The standard default homepage of any website.
- \`style.css\`: The file holding styling instructions.
- \`app.js\`: The file holding interactive JavaScript logic.

The **Terminal** (also called Command Line or CLI) is a text-based interface to control your operating system. Instead of double-clicking folders with a mouse, developers type quick commands:
- \`ls\` (list files)
- \`cd\` (change directory)
- \`mkdir\` (make new folder)
- \`npm run dev\` (launch local development web server)`,
      theorySq: `Të gjitha faqet e internetit në botë ruhen si skedarë të thjeshtë teksti:
- \`index.html\`: Faqja kryesore standarde e çdo uebsajti.
- \`style.css\`: Skedari që mban ngjyrat dhe rregullat e dizajnit.
- \`app.js\`: Skedari që mban veprimet dhe llogaritjet në JavaScript.

**Terminali** (ose Linja e Komandave) është një mjet ku kontrollon kompjuterin duke shkruar fjalë në vend që të klikosh me mausin. Programuesit e duan sepse është shumë herë më i shpejtë dhe mund të automatizojë çdo detyrë me një tast.`,
      metaphor: "A graphical interface (GUI) is like riding an elevator where you can only push pre-built buttons. The terminal is like having the master access key to the building's control center.",
      metaphorSq: "Ndërfaqja me maus (GUI) është si të marrësh një ashensor me butona të kufizuar. Terminali është si çelësi kryesor i inxhinierit ku ke akses të plotë në të gjithë sistemin.",
      codeExample: `// How a web project folder is structured:
const projectFiles = [
  "index.html",     // The entry point
  "styles/main.css", // Design sheets
  "src/app.js"      // Application logic
];
console.log("Loaded project structure:", projectFiles);`,
      codeExplanation: [
        "index.html is the file the web server looks for first.",
        "Subdirectories like styles/ and src/ keep code clean and organized."
      ],
      type: "javascript",
      starterCode: `const webProject = {
  entryFile: "index.html",
  styleSheet: "styles.css",
  scriptFile: "script.js"
};

console.log("Ready to build web projects!");
`,
      task: "Add a new property to webProject called framework with the value \"React\" and log it to the console.",
      taskSq: "Shto një veti të re te webProject me emër framework me vlerën \"React\" dhe printoje në console.",
      hint: "webProject.framework = \"React\"; then console.log(webProject.framework);",
      solution: `const webProject = {
  entryFile: "index.html",
  styleSheet: "styles.css",
  scriptFile: "script.js",
  framework: "React"
};

console.log("Ready to build web projects!");
console.log("Framework:", webProject.framework);`,
      solutionExplanation: "Adding modern tools like React into our project structure prepares us to build scalable web applications.",
      testAssertions: [
        {
          description: "Framework property is set to React",
          test: (logs, code) => /framework/i.test(code) && /React/i.test(code)
        }
      ],
      quiz: {
        question: "Why is the primary page of a website traditionally named 'index.html'?",
        options: [
          "Because index was the middle name of the inventor of the internet.",
          "Because web servers are programmed to automatically serve 'index.html' as the default homepage when a visitor enters a folder.",
          "Because browsers will delete any file with a different name.",
          "It is a legal copyright requirement."
        ],
        correctIndex: 1,
        explanation: "By convention, web servers look for 'index.html' as the starting document of any folder or domain."
      }
    }
  ]
};
