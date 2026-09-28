export const course2 = {
  id: "course-2",
  title: "Modern CSS Styling",
  titleSq: "Stilimi Modern me CSS",
  description: "Transform raw HTML skeletons into stunning, responsive, animated user interfaces with modern CSS.",
  descriptionSq: "Shndërroni skeletet e thjeshta HTML në ndërfaqe tërheqëse, responsive dhe me animacione me CSS modern.",
  icon: "palette",
  badge: "Design & Layout",
  lessons: [
    {
      id: "css-selectors-colors",
      title: "Selectors, Classes, IDs & Colors",
      titleSq: "Selektorët, Klasat, ID dhe Ngjyrat",
      module: "CSS Foundations",
      difficulty: "Beginner",
      estimatedMinutes: 10,
      objectives: [
        "Learn the CSS rule syntax: selector, property, and value",
        "Master the difference between element, class (.class), and id (#id) selectors",
        "Work with modern color formats: hex, rgb, and hsl"
      ],
      whyItMatters: "CSS is what makes software attractive, trustworthy, and pleasant to use. Without CSS, the web would be plain black text on white paper.",
      theory: `CSS stands for **Cascading Style Sheets**. A CSS rule has three components:
\`\`\`css
selector {
  property: value;
}
\`\`\`

### Types of Selectors:
1. **Element Selector**: \`p { color: blue; }\` (styles ALL paragraphs on the page)
2. **Class Selector**: \`.card { background: white; }\` (styles any element with \`class="card"\`. Reusable across many elements!)
3. **ID Selector**: \`#header { background: black; }\` (styles the single unique element with \`id="header"\`)

### Colors in CSS:
- Color names: \`red\`, \`navy\`, \`teal\`
- Hex codes: \`#0f172a\`, \`#3b82f6\`
- HSL (Hue, Saturation, Lightness): \`hsl(217, 91%, 60%)\``,
      theorySq: `CSS do të thotë **Cascading Style Sheets**. Një rregull CSS përbëhet nga tri pjesë:
\`\`\`css
selektori {
  vetia: vlera;
}
\`\`\`

### Llojet e Selektorëve:
1. **Selektori i Elementit**: \`p { color: blue; }\` (stilon TË GJITHË paragrafët në faqe)
2. **Selektori i Klasës**: \`.kartë { background: white; }\` (stilon çdo element me \`class="kartë"\`. Mund të ripërdoret sa herë të duash!)
3. **Selektori i ID-së**: \`#kryesor { background: black; }\` (stilon elementin e vetëm me \`id="kryesor"\`)

### Ngjyrat në CSS:
- Emra ngjyrash: \`red\`, \`blue\`
- Hex kode moderne: \`#0f172a\`, \`#2563eb\`
- HSL: \`hsl(217, 90%, 60%)\``,
      metaphor: "HTML is like a mannequin in a clothing store. CSS is the tailoring, fabrics, colors, and accessories you dress it with.",
      metaphorSq: "HTML është si një manekin plastik në dyqan. CSS janë rrobat me stil, ngjyrat, këmisha dhe këpucët që ia vesh sipër për ta bërë të duket bukur.",
      codeExample: `/* Style the entire card container */
.product-card {
  background-color: #1e293b;
  color: #ffffff;
  padding: 24px;
  border-radius: 12px;
}

/* Style specific accent title */
.product-card h3 {
  color: #38bdf8;
  margin-bottom: 8px;
}`,
      codeExplanation: [
        "`.product-card` targets elements with class=\"product-card\".",
        "`background-color` fills the box background with a sleek dark slate.",
        "`border-radius` softens the harsh square corners into smooth rounded cards."
      ],
      type: "css",
      starterCode: `/* Add your CSS styles below */
.hero-box {
  background-color: #f1f5f9;
  color: #334155;
  padding: 20px;
  border-radius: 8px;
}

/* 1. Make .hero-title have color #2563eb and font-size 28px */
/* 2. Style .highlight with font-weight bold and color #059669 */
`,
      task: "Add rules for .hero-title (color #2563eb, font-size: 28px) and .highlight (color: #059669).",
      taskSq: "Shto rregulla për .hero-title (color #2563eb, font-size: 28px) dhe .highlight (color: #059669).",
      hint: "Write .hero-title { color: #2563eb; font-size: 28px; } and .highlight { color: #059669; }",
      solution: `.hero-box {
  background-color: #f1f5f9;
  color: #334155;
  padding: 20px;
  border-radius: 8px;
}

.hero-title {
  color: #2563eb;
  font-size: 28px;
}

.highlight {
  color: #059669;
  font-weight: bold;
}`,
      solutionExplanation: "Class selectors allow you to target specific stylistic roles cleanly across components.",
      testAssertions: [
        {
          description: "Defines rules for .hero-title and .highlight",
          test: (logs, code) => /\.hero-title/i.test(code) && /\.highlight/i.test(code) && /2563eb/i.test(code)
        }
      ],
      quiz: {
        question: "What is the difference between a class selector (.badge) and an ID selector (#badge)?",
        options: [
          "Classes can be used on multiple elements; IDs must be strictly unique to one element per page.",
          "Classes only work on buttons; IDs work on paragraphs.",
          "ID selectors are written in lowercase; classes in uppercase.",
          "There is no difference; they are interchangeable synonyms."
        ],
        correctIndex: 0,
        explanation: "A class (.class) is intended for reusable styles across many elements, whereas an ID (#id) uniquely targets a single element."
      }
    },
    {
      id: "css-box-model",
      title: "The CSS Box Model: Margin, Border, Padding",
      titleSq: "Modeli i Kutisë në CSS: Margin, Border, Padding",
      module: "Layout Foundations",
      difficulty: "Intermediate",
      estimatedMinutes: 12,
      objectives: [
        "Master the 4 concentric layers of every HTML element: Content, Padding, Border, Margin",
        "Understand box-sizing: border-box and why developers always use it",
        "Solve unwanted spacing and element overflow bugs"
      ],
      whyItMatters: "90% of beginner layout bugs are caused by misunderstanding the Box Model. Mastering it gives you total control over spacing.",
      theory: `In the eyes of CSS, **every single HTML element is a rectangular box**.

The box consists of 4 concentric layers:
1. **Content**: The actual text, image, or child element.
2. **Padding**: The inner cushion *inside* the box, between the content and the border.
3. **Border**: The outer frame surrounding the padding.
4. **Margin**: The empty space *outside* the box, pushing neighbor elements away!

### The Golden Rule: \`box-sizing: border-box\`
By default in CSS, adding padding increases the total width of an element.
Using \`box-sizing: border-box\` ensures that whatever \`width\` you set includes padding and border, so your layout never breaks!`,
      theorySq: `Për sytë e CSS-it, **çdo element HTML në faqe është një kuti drejtkëndëshe**.

Kjo kuti përbëhet nga 4 shtresa:
1. **Përmbajtja (Content)**: Teksti ose fotoja brenda.
2. **Padding (Hapësira e Brendshme)**: Dysheku midis përmbajtjes dhe kornizës së kutisë.
3. **Border (Korniza)**: Vija kufizuese e kutisë.
4. **Margin (Hapësira e Jashtme)**: Hapësira bosh jashtë kutisë që largon elementet e tjerë fqinjë!

### Rregulli i Artë: \`box-sizing: border-box\`
Zakonisht në CSS, kur i shton padding një kutie, ajo fryhet më e gjerë. Me \`border-box\`, gjerësia mbetet ekzaktësisht ajo që i cakton ti.`,
      metaphor: "Think of a framed family photograph: The photo itself is the Content. The white matting around it is Padding. The wooden frame is Border. The empty wall space around the frame is Margin.",
      metaphorSq: "Mendo një pikturë të varur në mur me kornizë: Piktura brenda është Content. Kartoni i bardhë rreth saj është Padding. Korniza e drurit është Border. Muri bosh rreth kornizës është Margin.",
      codeExample: `/* The standard universal box-sizing reset */
* {
  box-sizing: border-box;
}

.box-demo {
  width: 300px;
  padding: 24px;       /* Inner breathing space */
  border: 2px solid #2563eb; /* Outer frame */
  margin: 20px auto;   /* Centered with space outside */
}`,
      codeExplanation: [
        "`box-sizing: border-box` keeps total width predictable at exactly 300px.",
        "`padding: 24px` pushes text away from touching the blue border.",
        "`margin: 20px auto` centers the box horizontally on the page."
      ],
      type: "css",
      starterCode: `.card {
  width: 320px;
  background-color: #ffffff;
  /* 1. Add 20px of padding inside the card */
  /* 2. Add a 1px solid border with color #e2e8f0 */
  /* 3. Add 24px of margin on the bottom to separate from other cards */
  /* 4. Add border-radius: 12px for smooth corners */
}
`,
      task: "Add padding: 20px, border: 1px solid #e2e8f0, margin-bottom: 24px, and border-radius: 12px to .card.",
      taskSq: "Shto padding: 20px, border: 1px solid #e2e8f0, margin-bottom: 24px, dhe border-radius: 12px te .card.",
      hint: "Add the 4 CSS properties inside the .card rule block.",
      solution: `.card {
  width: 320px;
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
  border-radius: 12px;
}`,
      solutionExplanation: "The box model rules now give the card proper internal padding, a crisp modern border, and bottom spacing.",
      testAssertions: [
        {
          description: "Includes padding, border, margin-bottom, and border-radius",
          test: (logs, code) => /padding:\s*20px/i.test(code) && /border-radius:\s*12px/i.test(code)
        }
      ],
      quiz: {
        question: "Which CSS property creates spacing INSIDE an element, between its content and border?",
        options: [
          "margin",
          "padding",
          "outline",
          "z-index"
        ],
        correctIndex: 1,
        explanation: "Padding is the internal cushion inside the element's border. Margin is the outer cushion outside the border."
      }
    },
    {
      id: "css-flexbox-layouts",
      title: "Flexbox: Modern Flexible Layouts",
      titleSq: "Flexbox: Struktura Moderne Fleksibile",
      module: "Layout Foundations",
      difficulty: "Intermediate",
      estimatedMinutes: 14,
      objectives: [
        "Understand flex containers and flex items",
        "Master justify-content (main axis) and align-items (cross axis)",
        "Use the 'gap' property for clean spacing between cards"
      ],
      whyItMatters: "Flexbox revolutionized web design by eliminating hacky float layouts and making vertical centering effortless.",
      theory: `To activate Flexbox, apply \`display: flex;\` to the parent container. All immediate children instantly become **flex items**.

### The Two Axes:
1. **Main Axis** (Horizontal by default with \`flex-direction: row\`):
   - \`justify-content: flex-start\` (align left)
   - \`justify-content: center\` (center horizontally)
   - \`justify-content: space-between\` (push items to edges with even space between)
2. **Cross Axis** (Vertical by default):
   - \`align-items: center\` (perfect vertical centering!)
   - \`align-items: flex-start\` (align to top)
   - \`align-items: stretch\` (fill full height)

### The \`gap\` Property:
Instead of giving every card messy margins, simply write \`gap: 16px;\` on the flex container!`,
      theorySq: `Për të aktivizuar Flexbox, i vendosim \`display: flex;\` kutisë prind. Të gjithë fëmijët brenda bëhen menjëherë elemente fleksibël!

### Dy Boshtet Kryesore:
1. **Boshti Kryesor (Horizontal)**:
   - \`justify-content: center\` (qendron elementet horizontalisht)
   - \`justify-content: space-between\` (shpërndan elementet në mënyrë të barabartë në skaje)
2. **Boshti Tërthor (Vertikal)**:
   - \`align-items: center\` (qendërzim perfekt vertikal me vetëm një rresht!)

### Vetia \`gap\`:
Në vend që t'i vendosësh margin çdo elementi, mjafton të shkruash \`gap: 16px;\` te kutia prind dhe të gjithë marrin hapësirë të barabartë mes tyre.`,
      metaphor: "Flexbox is like an intelligent clothesline. You hang items on it, and with one command you can space them evenly, push them to the ends, or line them up in the exact center.",
      metaphorSq: "Flexbox është si një tel inteligjent për të nderur rrobat. Me një komandë të vetme mund t'i vendosësh të gjitha rrobat në mes, t'i shpërndash në skaje, ose t'i rreshtosh në vijë të drejtë.",
      codeExample: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #0f172a;
  color: #ffffff;
}`,
      codeExplanation: [
        "`display: flex` places the logo and navigation links on the same horizontal row.",
        "`justify-content: space-between` pins the logo to the far left and the menu to the far right.",
        "`align-items: center` centers them vertically on the bar."
      ],
      type: "css",
      starterCode: `.card-container {
  /* 1. Turn this into a flexbox container */
  /* 2. Space items evenly using space-between */
  /* 3. Center them vertically using align-items: center */
  /* 4. Add a 20px gap between child cards */
}
`,
      task: "Configure .card-container with display: flex, justify-content: space-between, align-items: center, and gap: 20px.",
      taskSq: "Konfiguro .card-container me display: flex, justify-content: space-between, align-items: center, dhe gap: 20px.",
      hint: "Write display: flex; justify-content: space-between; align-items: center; gap: 20px; inside .card-container.",
      solution: `.card-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}`,
      solutionExplanation: "Flexbox guarantees responsive alignment and equal distribution along both axes.",
      testAssertions: [
        {
          description: "Flexbox container properties defined correctly",
          test: (logs, code) => /display:\s*flex/i.test(code) && /justify-content:\s*space-between/i.test(code) && /gap:\s*20px/i.test(code)
        }
      ],
      quiz: {
        question: "How do you achieve perfect vertical centering of items inside a flex container?",
        options: [
          "margin-top: 50%;",
          "align-items: center;",
          "float: center;",
          "vertical-align: middle;"
        ],
        correctIndex: 1,
        explanation: "align-items: center aligns items along the cross axis (vertical in row orientation), providing clean vertical centering."
      }
    }
  ]
};
