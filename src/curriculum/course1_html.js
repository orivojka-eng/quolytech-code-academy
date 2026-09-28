export const course1 = {
  id: "course-1",
  title: "HTML Architecture",
  titleSq: "Arkitektura HTML",
  description: "Learn the universal structural language of the web. Build accessible, semantic layouts from scratch.",
  descriptionSq: "Mësoni gjuhën universale strukturore të internetit. Ndërtoni faqe të qarta, semantike dhe të arritshme nga zeroja.",
  icon: "code",
  badge: "Core Structure",
  lessons: [
    {
      id: "html-tags-and-elements",
      title: "Tags, Elements & Attributes",
      titleSq: "Etiketat, Elementet dhe Atributet",
      module: "HTML Foundations",
      difficulty: "Beginner",
      estimatedMinutes: 10,
      objectives: [
        "Master the opening tag, closing tag, and element content anatomy",
        "Understand self-closing tags",
        "Learn how attributes configure element behavior"
      ],
      whyItMatters: "Every single website you will ever visit or build is fundamentally constructed out of HTML elements.",
      theory: `HTML stands for **HyperText Markup Language**. It is not a programming language with math or loops; it is a **markup language** that tags parts of a document so the browser knows how to display them.

An **HTML Element** usually has three parts:
\`<tagname attribute="value">Content goes here</tagname>\`
1. **Opening Tag**: \`<p>\` (tells browser: a paragraph starts here)
2. **Content**: The text, image, or child elements inside
3. **Closing Tag**: \`</p>\` (has a forward slash \`/\`, tells browser: paragraph ends here)

**Attributes** provide extra information. For example, \`id="main-title"\` gives an element a unique identifier, and \`class="highlight"\` assigns a styling group.`,
      theorySq: `HTML do të thotë **HyperText Markup Language**. Nuk është gjuhë programimi me llogaritje apo kushte matematike; është një **gjuhë shënimi (markup)** që vendos etiketa mbi përmbajtjen që shfletuesi të kuptojë çfarë është secila pjesë.

Një **Element HTML** zakonisht përbëhet nga tri pjesë:
\`<etiketa atribut="vlerë">Përmbajtja këtu</etiketa>\`
1. **Etiketa Hapëse**: \`<p>\` (i tregon shfletuesit: këtu fillon një paragraf)
2. **Përmbajtja**: Teksti, imazhi ose elementet e tjera brenda
3. **Etiketa Mbyllëse**: \`</p>\` (ka vizën e pjerrët \`/\`, i thotë shfletuesit: këtu mbaron paragrafi)

**Atributet** japin informacion shtesë brenda etiketës hapëse, si p.sh. \`class="titull"\` ose \`id="kryesore"\`.`,
      metaphor: "Think of an HTML element like a branded gift box: the opening tag is taking off the lid, the content is the gift inside, and the closing tag is putting the lid back on.",
      metaphorSq: "Mendoje elementin HTML si një kuti dhuratash: etiketa hapëse heq kapakun, përmbajtja është dhurata brenda, dhe etiketa mbyllëse vendos kapakun.",
      codeExample: `<h1 id="welcome-heading">Welcome to QuolyTech!</h1>
<p class="lead-text">Learn to code with interactive hands-on feedback.</p>`,
      codeExplanation: [
        "`<h1>` represents Heading 1: the main, most important title on a page.",
        "`id=\"welcome-heading\"` gives this specific heading a unique name.",
        "`<p>` creates a normal body paragraph.",
        "`</p>` marks where the paragraph finishes."
      ],
      type: "html",
      starterCode: `<!-- Build your first HTML heading and paragraph -->
<h1>My Developer Journey</h1>
<p>I am starting my coding path at QuolyTech Academy.</p>
`,
      task: "Add a second paragraph (<p>) below with the text: \"Today I wrote my very first HTML element!\"",
      taskSq: "Shto një paragraf të dytë (<p>) poshtë me tekstin: \"Today I wrote my very first HTML element!\"",
      hint: "Write <p>Today I wrote my very first HTML element!</p> under the first paragraph.",
      solution: `<h1>My Developer Journey</h1>
<p>I am starting my coding path at QuolyTech Academy.</p>
<p>Today I wrote my very first HTML element!</p>`,
      solutionExplanation: "Each <p> tag creates a distinct block-level paragraph with natural breathing room between lines.",
      testAssertions: [
        {
          description: "Contains at least two <p> elements",
          test: (logs, code) => (code.match(/<p>/gi) || []).length >= 2 && /first HTML element/i.test(code)
        }
      ],
      quiz: {
        question: "What is the difference between an opening tag and a closing tag?",
        options: [
          "Opening tags use capital letters, closing tags use lowercase letters.",
          "Closing tags include a forward slash '/' immediately after the opening angle bracket (e.g. </p>).",
          "Closing tags must always be written in red color.",
          "There is no difference; browsers guess when a tag finishes."
        ],
        correctIndex: 1,
        explanation: "Closing tags require the forward slash '/' to signal to the browser's parser that the element container is closed."
      }
    },
    {
      id: "html-headings-paragraphs",
      title: "Headings (H1-H6) & Text Formatting",
      titleSq: "Titujt (H1-H6) dhe Formatimi i Tekstit",
      module: "HTML Foundations",
      difficulty: "Beginner",
      estimatedMinutes: 9,
      objectives: [
        "Understand heading hierarchy (h1 through h6) for SEO and accessibility",
        "Learn text emphasis with <strong> and <em>",
        "Avoid common mistakes with headings"
      ],
      whyItMatters: "Search engines (like Google) and screen readers rely on correct heading hierarchy to index and navigate your page structure.",
      theory: `HTML provides 6 levels of headings: \`<h1>\` through \`<h6>\`.
- \`<h1>\`: The most important heading. A web page should only have **one \`<h1>\`**, describing the page title.
- \`<h2>\`: Major section titles.
- \`<h3>\`: Subsections within an \`<h2>\`.
- \`<h4>\` to \`<h6>\`: Deeper minor sub-headings.

For formatting text within paragraphs:
- \`<strong>\`: Gives text strong importance (rendered bold).
- \`<em>\`: Adds stress emphasis (rendered italic).
- \`<mark>\`: Highlights text like a yellow marker pen.
- \`<small>\`: Represents fine print or copyright notices.`,
      theorySq: `HTML ofron 6 nivele titujsh: nga \`<h1>\` deri te \`<h6>\`.
- \`<h1>\`: Titulli më i rëndësishëm. Çdo faqe ueb duhet të ketë **vetëm një \`<h1>\`**, që përfaqëson temën kryesore të faqes.
- \`<h2>\`: Titujt e seksioneve kryesore.
- \`<h3>\`: Nëntitujt brenda një \`<h2>\`.
- \`<h4>\` deri te \`<h6>\`: Nëntituj më të thelluar.

Për theksimin e tekstit:
- \`<strong>\`: Tregon rëndësi të veçantë (shfaqet me shkronja të trasha - bold).
- \`<em>\`: Theksim zëri ose intonacioni (shfaqet e pjerrët - italic).
- \`<mark>\`: Nënvizon tekstin sikur me lapustil me ngjyrë.`,
      metaphor: "Think of a newspaper: <h1> is the massive front-page headline. <h2> is a column story title. <h3> is a specific subtopic inside that column.",
      metaphorSq: "Mendo një gazetë ditore: <h1> është titulli gjigant i faqes së parë. <h2> është titulli i një artikulli. <h3> është nëntitulli i një paragrafi brenda atij artikulli.",
      codeExample: `<h1>QuolyTech Code Academy</h1>
<h2>Curriculum Overview</h2>
<p>Learn <strong>HTML</strong>, <em>CSS</em>, and <strong>JavaScript</strong> from zero!</p>`,
      codeExplanation: [
        "`<h1>` sets the primary page topic.",
        "`<h2>` opens a sub-section.",
        "`<strong>` marks essential keywords with visual bold weight."
      ],
      type: "html",
      starterCode: `<h1>Frontend Development Path</h1>
<!-- Add an h2, a paragraph, and use strong and em tags below -->
`,
      task: "Add an <h2> with text \"Module 1: HTML Architecture\", and a <p> containing <strong>semantic</strong> and <em>accessible</em>.",
      taskSq: "Shto një <h2> me tekst \"Module 1: HTML Architecture\", dhe një <p> që përmban <strong>semantic</strong> dhe <em>accessible</em>.",
      hint: "Write <h2>Module 1: HTML Architecture</h2> and then <p>We build <strong>semantic</strong> and <em>accessible</em> web apps.</p>",
      solution: `<h1>Frontend Development Path</h1>
<h2>Module 1: HTML Architecture</h2>
<p>We build <strong>semantic</strong> and <em>accessible</em> web apps.</p>`,
      solutionExplanation: "Using appropriate headings and emphasis gives semantic meaning to your content, making it accessible to screen readers.",
      testAssertions: [
        {
          description: "Includes an <h2> and formatted paragraph",
          test: (logs, code) => /<h2/i.test(code) && /<strong/i.test(code) && /<em/i.test(code)
        }
      ],
      quiz: {
        question: "How many <h1> elements should a well-structured web page have?",
        options: [
          "As many as possible to make the text bigger.",
          "Exactly one, representing the main topic of the entire page.",
          "Zero, because h1 is deprecated in HTML5.",
          "Twelve, one for each hour of the day."
        ],
        correctIndex: 1,
        explanation: "Best practice for SEO and screen-reader accessibility dictates having a single <h1> per page representing the overall document topic."
      }
    },
    {
      id: "html-links-and-images",
      title: "Hyperlinks (<a>) & Images (<img>)",
      titleSq: "Lidhjet (<a>) dhe Imazhet (<img>)",
      module: "Media & Navigation",
      difficulty: "Beginner",
      estimatedMinutes: 10,
      objectives: [
        "Create clickable links to external sites and internal page anchors",
        "Embed images with src and mandatory alt attributes",
        "Understand target=\"_blank\" for opening tabs safely"
      ],
      whyItMatters: "Links are the 'hyper' in HyperText—they connect the entire world wide web together into a navigable global network.",
      theory: `### Hyperlinks: The \`<a>\` (Anchor) Tag
To turn any text or element into a clickable link:
\`<a href="https://example.com" target="_blank" rel="noopener">Click Here</a>\`
- \`href\` (Hypertext Reference): The destination URL.
- \`target="_blank"\`: Opens the link in a fresh new browser tab.
- \`rel="noopener"\`: Security best practice when opening new tabs.

### Images: The \`<img>\` Tag
Images do not have a closing tag; they are **self-closing**:
\`<img src="logo.png" alt="QuolyTech Company Logo" width="200" />\`
- \`src\` (Source): The URL or local file path to the picture file.
- \`alt\` (Alternative Text): **Mandatory** for accessibility! If an image fails to load, or if a visually impaired user uses a screen reader, this text is read aloud.`,
      theorySq: `### Lidhjet (Links): Etiketa \`<a>\` (Anchor)
Për të krijuar një lidhje të klikueshme:
\`<a href="https://quolytech.com" target="_blank">Kliko Këtu</a>\`
- \`href\`: Adresa e faqes ku do të dërgohet përdoruesi kur klikon.
- \`target="_blank"\`: E hap lidhjen në një dritare (tab) të re.

### Imazhet: Etiketa \`<img>\`
Imazhet nuk kanë nevojë për etiketë mbyllëse \`</img>\`; ato vetë-mbyllen:
\`<img src="foto.jpg" alt="Përshkrimi i fotos" />\`
- \`src\` (Burimi): Adresa ku ndodhet skedari i fotos.
- \`alt\` (Teksti Alternativ): **Shumë i rëndësishëm!** Nëse fotoja nuk hapet ose përdoruesi nuk shikon dot dhe përdor lexues ekrani, ky tekst përshkruan çfarë ka në foto.`,
      metaphor: "A link is a teleportation portal to another room in the internet. An image's alt text is like describing a painting over the phone to a friend who cannot see it.",
      metaphorSq: "Një link është si një derë magjike që të teletransporton në një dhomë tjetër të internetit. Teksti 'alt' i fotos është sikur t'i përshkruash me fjalë një pikturë dikujt në telefon që nuk mund ta shohë.",
      codeExample: `<p>Visit our academy at 
  <a href="https://quolytech.com" target="_blank">QuolyTech Official</a>
</p>
<img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300" alt="Laptop displaying code on screen" />`,
      codeExplanation: [
        "`<a>` wraps the clickable text phrase.",
        "`href` points to the destination website.",
        "`src` gives the image address, and `alt` explains what is in the picture."
      ],
      type: "html",
      starterCode: `<h2>Developer Resources</h2>
<!-- 1. Create a link to https://github.com with text "GitHub Profile" -->
<!-- 2. Add an image with src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200" and an alt attribute -->
`,
      task: "Add an anchor <a> pointing to https://github.com, and an <img> element with the provided image src and an alt description.",
      taskSq: "Shto një lidhje <a> që çon te https://github.com, dhe një element <img> me src e dhënë dhe përshkrim në alt.",
      hint: "Use <a href=\"https://github.com\">GitHub Profile</a> and <img src=\"...\" alt=\"Coding laptop\" />.",
      solution: `<h2>Developer Resources</h2>
<p><a href="https://github.com" target="_blank">GitHub Profile</a></p>
<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200" alt="Modern desk with MacBook and code" />`,
      solutionExplanation: "The <a> element enables web navigation while <img> brings visual media to life with accessible alt descriptions.",
      testAssertions: [
        {
          description: "Contains anchor tag with href and img with alt",
          test: (logs, code) => /<a\s+[^>]*href=/i.test(code) && /<img\s+[^>]*alt=/i.test(code)
        }
      ],
      quiz: {
        question: "Why is the 'alt' attribute on <img> elements considered critically important?",
        options: [
          "It changes the photo from black and white to color.",
          "It provides essential accessibility for screen readers and displays fallback text if the image link breaks.",
          "It makes the image download 10x faster.",
          "It is required by law to pay copyright royalties."
        ],
        correctIndex: 1,
        explanation: "The alt attribute is vital for accessible web design, ensuring screen readers can announce visual content to visually impaired people."
      }
    },
    {
      id: "html-semantic-layout",
      title: "Semantic HTML & Layout Architecture",
      titleSq: "HTML Semantike dhe Struktura e Faqes",
      module: "Modern Structure",
      difficulty: "Intermediate",
      estimatedMinutes: 12,
      objectives: [
        "Replace generic <div> tags with meaningful semantic HTML5 tags",
        "Master <header>, <nav>, <main>, <section>, <article>, and <footer>",
        "Understand how semantic layout improves SEO and browser reader modes"
      ],
      whyItMatters: "Professional code is not a soup of meaningless <div> tags. Semantic markup defines the actual meaning and hierarchy of your content.",
      theory: `In the early days of the web, developers used \`<div class="header">\`, \`<div class="nav">\`, and \`<div class="footer">\`. Everything was a generic \`<div>\`.

HTML5 introduced **Semantic Elements**—tags whose names explicitly tell the browser and search engines what kind of content they hold:
- \`<header>\`: Introductory content, logos, and hero banners.
- \`<nav>\`: Navigation menus containing primary links.
- \`<main>\`: The dominant, unique central content of the document (only one per page).
- \`<section>\`: A thematic grouping of content with its own heading.
- \`<article>\`: A self-contained, independently distributable piece of content (like a blog post or news item).
- \`<aside>\`: Sidebar content indirectly related to the main topic.
- \`<footer>\`: Bottom section with copyright, links, and contact info.`,
      theorySq: `Në fillimet e web-it, programuesit përdornin vetëm etiketa të përgjithshme \`<div>\` për çdo gjë.

HTML5 solli **Elementet Semantike**—etiketa që i tregojnë qartë shfletuesit dhe motorëve të kërkimit (Google) se çfarë përfaqëson ajo pjesë:
- \`<header>\`: Kreu i faqes, logoja dhe shiriti i mirëseardhjes.
- \`<nav>\`: Menyja e navigimit me lidhjet kryesore.
- \`<main>\`: Pjesa kryesore e përmbajtjes unike të faqes (vetëm një për çdo faqe).
- \`<section>\`: Një seksion me temë të caktuar (p.sh. seksioni i kurseve).
- \`<article>\`: Një artikull i pavarur (p.sh. një lajm ose postim blogu).
- \`<footer>\`: Fundi i faqes me të drejtat e autorit dhe kontaktet.`,
      metaphor: "Generic <div> tags are like unlabelled brown cardboard boxes. Semantic tags (<header>, <nav>, <main>) are transparent labeled containers where everyone instantly knows what is inside.",
      metaphorSq: "Etiketat e zakonshme <div> janë si kuti kartoni pa emër ku nuk e di çfarë ka brenda. Elementet semantike (<header>, <nav>, <footer>) janë kuti transparente me etiketa të qarta që kuptohen nga çdo njeri.",
      codeExample: `<header>
  <h1>QuolyTech Portal</h1>
  <nav>
    <a href="#courses">Courses</a>
    <a href="#about">About</a>
  </nav>
</header>
<main>
  <section>
    <h2>Featured Tracks</h2>
    <p>Explore beginner coding paths.</p>
  </section>
</main>
<footer>
  <p>&copy; 2026 QuolyTech. All rights reserved.</p>
</footer>`,
      codeExplanation: [
        "`<header>` groups top-level branding.",
        "`<nav>` marks primary site navigation.",
        "`<main>` wraps the primary page content.",
        "`<footer>` defines site-wide footer metadata."
      ],
      type: "html",
      starterCode: `<!-- Structure this page using semantic HTML5 elements -->
<header>
  <h1>Academy Hub</h1>
</header>

<!-- Add a <main> container with a <section> inside, and finish with a <footer> -->
`,
      task: "Add a <main> element containing a <section> with an <h2>, and add a <footer> with a copyright paragraph.",
      taskSq: "Shto një element <main> që përmban një <section> me një <h2>, dhe shto një <footer> me një paragraf copyright.",
      hint: "Wrap your content: <main><section><h2>Track</h2><p>Info</p></section></main><footer><p>&copy; 2026</p></footer>",
      solution: `<header>
  <h1>Academy Hub</h1>
</header>
<main>
  <section>
    <h2>Frontend Track</h2>
    <p>Become a job-ready developer.</p>
  </section>
</main>
<footer>
  <p>&copy; 2026 QuolyTech Code Academy</p>
</footer>`,
      solutionExplanation: "Semantic layout gives meaningful structure to the page, vastly improving indexing and accessibility.",
      testAssertions: [
        {
          description: "Contains main, section, and footer semantic tags",
          test: (logs, code) => /<main>/i.test(code) && /<section>/i.test(code) && /<footer>/i.test(code)
        }
      ],
      quiz: {
        question: "Why should developers prefer <nav> over <div class=\"navigation\">?",
        options: [
          "Because <nav> loads 5 seconds faster.",
          "Because <nav> communicates semantic intent to screen readers and web search engines directly.",
          "Because <div> is no longer allowed in modern browsers.",
          "Because <nav> automatically writes CSS styling for you."
        ],
        correctIndex: 1,
        explanation: "Assistive technologies like screen readers have dedicated shortcuts allowing users to jump directly to <nav> landmarks."
      }
    },
    {
      id: "html-forms-inputs",
      title: "Interactive Forms, Inputs & Buttons",
      titleSq: "Formularët Interaktivë, Fushat dhe Butonat",
      module: "User Interaction",
      difficulty: "Intermediate",
      estimatedMinutes: 12,
      objectives: [
        "Learn how forms collect user data",
        "Associate <label> elements with <input> fields using the 'for' and 'id' attributes",
        "Understand input types: text, email, password, and checkbox"
      ],
      whyItMatters: "Forms are how users communicate back to websites—from logging in, to posting comments, to making online purchases.",
      theory: `A web form is created with the \`<form>\` tag. Inside, we place interactive controls:

### Essential Form Controls:
1. **\`<label for="username">\`**: The text describing the field. Clicking the label focuses the input!
2. **\`<input type="text" id="username" name="username" placeholder="e.g. alex24" required />\`**:
   - \`type\`: Determines whether it accepts text, email, password (masked dots), number, checkbox, etc.
   - \`placeholder\`: Faint guidance text that disappears upon typing.
   - \`required\`: Prevents form submission if empty.
3. **\`<button type="submit">\`**: Triggers the form submission event.`,
      theorySq: `Një formular uebi krijohet me etiketën \`<form>\`. Brenda vendosim fushat ku përdoruesi shkruan të dhëna:

### Elementet Kryesore:
1. **\`<label for="email">\`**: Përshkrimi i fushës. Kur klikon mbi label, kursori shkon automatikisht te fusha!
2. **\`<input type="text" id="email" placeholder="Shkruaj email-in" required />\`**:
   - \`type\`: Përcakton llojin e të dhënave (text, email, password me pika të fshehura, checkbox).
   - \`placeholder\`: Tekst i zbehtë orientues që zhduket kur nis të shkruash.
   - \`required\`: E bën fushën të detyrueshme për t'u plotësuar.
3. **\`<button type="submit">\`**: Butoni që dërgon të dhënat e formularit.`,
      metaphor: "A form is like an official paper application form: the labels are the printed questions, the inputs are the blank boxes where you write your answers, and the submit button is handing it to the clerk.",
      metaphorSq: "Një formular ueb është si një fletë aplikimi zyrtare: etiketat (label) janë pyetjet e printuara, input-et janë kutitë bosh ku shkruan emrin, dhe butoni submit është dorëzimi i fletës te sporteli.",
      codeExample: `<form>
  <div>
    <label for="student-name">Your Full Name:</label>
    <input type="text" id="student-name" placeholder="Enter your name" required />
  </div>
  <div>
    <label for="student-email">Email Address:</label>
    <input type="email" id="student-email" placeholder="name@domain.com" required />
  </div>
  <button type="submit">Enroll in Academy</button>
</form>`,
      codeExplanation: [
        "`<form>` groups the input controls.",
        "The `for` attribute in `<label>` connects directly with the matching `id` in `<input>` for accessibility.",
        "`<button type=\"submit\">` tells the browser to validate and submit."
      ],
      type: "html",
      starterCode: `<h2>Student Registration</h2>
<form>
  <!-- 1. Add a label and text input for username -->
  <!-- 2. Add a label and password input for password -->
  <!-- 3. Add a submit button with text "Create Account" -->
</form>
`,
      task: "Create a complete form with a text input for username, a password input, and a submit button.",
      taskSq: "Krijo një formular të plotë me një fushë text për username, një fushë password, dhe një buton submit.",
      hint: "Use <label for=\"u\">User</label><input type=\"text\" id=\"u\" /> and <button type=\"submit\">Create Account</button>.",
      solution: `<h2>Student Registration</h2>
<form>
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" placeholder="Choose username" required />
  </div>
  <div>
    <label for="pwd">Password:</label>
    <input type="password" id="pwd" placeholder="Enter secure password" required />
  </div>
  <button type="submit">Create Account</button>
</form>`,
      solutionExplanation: "Using explicit types and label associations ensures user security and smooth keyboard navigation.",
      testAssertions: [
        {
          description: "Includes form with text, password input, and button",
          test: (logs, code) => /<form/i.test(code) && /type="password"/i.test(code) && /<button/i.test(code)
        }
      ],
      quiz: {
        question: "Why should every <input> have an associated <label for=\"...\">?",
        options: [
          "It makes the input turn green.",
          "It enables screen readers to state what the field is for, and allows users to click the label to focus the input.",
          "It automatically sends an SMS notification to the student.",
          "It is only required for credit card numbers."
        ],
        correctIndex: 1,
        explanation: "Labels connected via matching 'for' and 'id' attributes dramatically increase touch target area and provide crucial accessibility context."
      }
    }
  ]
};
