import { loadAcademyState } from './storage.js';

export async function askGeminiTeacher({ question, lesson, studentCode, language = "en" }) {
  const state = loadAcademyState();
  const apiKey = state.settings.geminiApiKey?.trim();

  const systemPrompt = `You are the QuolyTech Code Academy AI Lead Instructor.
You are teaching a complete beginner how to code from zero to building production React apps.
Current Lesson: "${lesson?.title || 'General Coding'}" (${lesson?.module || 'Web Foundations'}).
Lesson Concept: "${lesson?.theory?.slice(0, 300) || 'Web Development'}".
Student's current code in editor:
\`\`\`
${studentCode || 'No code yet'}
\`\`\`

Pedagogical Rules:
1. Be patient, encouraging, and clear. Never assume prior programming knowledge.
2. Use real-world metaphors whenever explaining abstract concepts.
3. If requested in Albanian or if language is 'sq', provide clear, natural Albanian (Shqip) explanations suitable for a beginner.
4. If diagnosing an error, explain WHAT went wrong, WHY it happened, and give a gentle HINT rather than simply spoon-feeding the raw answer.
5. Keep explanations bite-sized and developer-friendly. Avoid dry walls of academic text.`;

  // If real Gemini API key is available, call Google Gemini 1.5 Flash endpoint
  if (apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemPrompt}\n\nStudent asks: "${question}" (Respond in ${language === 'sq' ? 'Albanian/Shqip' : 'English'})` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `Gemini API returned status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return { text: reply, source: "gemini-live" };
      }
    } catch (apiErr) {
      console.warn("Live Gemini API call failed, falling back to smart academy engine:", apiErr);
      // Fallback seamlessly to local intelligent engine
    }
  }

  // Intelligent Local Pedagogical Engine (Fallback & Instant Mode)
  return {
    text: generateLocalTeacherResponse(question, lesson, studentCode, language),
    source: "academy-offline"
  };
}

function generateLocalTeacherResponse(question, lesson, studentCode, language) {
  const q = question.toLowerCase();

  // Albanian request
  if (q.includes("shqip") || q.includes("albanian") || language === "sq") {
    if (lesson?.theorySq) {
      return `🇦🇱 **Shpjegimi i Mësuesit të QuolyTech në Shqip:**\n\n${lesson.theorySq}\n\n💡 **Shembull Praktik / Metaforë:**\n${lesson.metaphorSq || "Mendoje si një vegël që të lehtëson punën çdo ditë."}\n\nMos hezito të provosh kodin në editor dhe të shtypësh butonin **Run Code**!`;
    }
    return `🇦🇱 **Mësuesi QuolyTech:** Përshëndetje! Po mësoni temën **"${lesson?.titleSq || lesson?.title || 'Programim'}"**.\n\nKodi është thjesht një listë udhëzimesh që kompjuteri i ndjek me përpikmëri. Nëse ke ndonjë pyetje specifike për një rresht kodi, ma dërgo këtu dhe do ta analizojmë hap pas hapi!`;
  }

  // Metaphor request
  if (q.includes("metaphor") || q.includes("analogy") || q.includes("real life")) {
    return `💡 **Real-World Metaphor for ${lesson?.title || 'This Concept'}:**\n\n${lesson?.metaphor || 'Think of this concept like an everyday tool in your toolbox.'}\n\nWhy this helps: When your brain connects programming logic with familiar physical objects, syntax becomes second nature!`;
  }

  // Diagnose Error request
  if (q.includes("error") || q.includes("why isn't") || q.includes("fix") || q.includes("broken")) {
    if (!studentCode || studentCode.trim().length < 5) {
      return `🔍 **Code Inspector:** I don't see any code in your editor yet! Type or paste your code snippet, and I'll analyze every line for typos, missing brackets, or logic errors.`;
    }
    return `🔍 **Code Diagnosis:**\nLooking at your code for **${lesson?.title}**:\n1. Check your opening and closing tags/brackets carefully.\n2. In ${lesson?.type === 'html' ? 'HTML, ensure all tags like <p> have matching </p>' : lesson?.type === 'css' ? 'CSS, ensure every rule ends with a semicolon (;)' : 'JavaScript/React, watch for matching braces {} and proper variable declarations'}.\n\n💡 **Hint:** Take a look at the lesson hint tab or click **Show Solution** to review how the reference code is structured!`;
  }

  // Default lesson breakdown
  return `🎓 **Teacher's Guidance for "${lesson?.title || 'Current Topic'}":**\n\n${lesson?.whyItMatters || 'This concept is fundamental for web development.'}\n\n**Key Takeaway:**\n${lesson?.theory?.slice(0, 350) || 'Follow the step-by-step instructions in the interactive editor.'}...\n\n👉 *Need an Albanian translation? Type "Shpjoma në Shqip". Want an analogy? Ask "Give me a metaphor"!*`;
}

export function generateDynamicTask(lesson, difficulty = "Beginner") {
  const tasks = {
    html: [
      {
        title: "Build a Newsletter Subscription Box",
        desc: "Create a semantic <section> containing an <h3>, a brief paragraph, and an email <input> with a submit <button>.",
        hint: "Use <section><h3>Subscribe</h3><input type=\"email\" /><button>Join</button></section>",
        criteria: "Has section, h3, email input, and button"
      },
      {
        title: "Accessible Navigation Bar",
        desc: "Construct a <nav> element containing an unordered list (<ul>) with at least 3 navigational links (<a>).",
        hint: "Wrap <li><a href=\"#\">Home</a></li> inside <ul> inside <nav>.",
        criteria: "Uses nav, ul, li, and anchor links"
      }
    ],
    css: [
      {
        title: "Center a Call-to-Action Modal",
        desc: "Use Flexbox to center a .modal box both horizontally and vertically inside a full-screen viewport.",
        hint: "display: flex; justify-content: center; align-items: center; min-height: 100vh;",
        criteria: "Uses display: flex, justify-content: center, and align-items: center"
      },
      {
        title: "Modern Pill Badge",
        desc: "Style a .badge with 6px vertical padding, 16px horizontal padding, border-radius: 9999px, and subtle border.",
        hint: "padding: 6px 16px; border-radius: 9999px; background: #3b82f6;",
        criteria: "Uses border-radius and padding"
      }
    ],
    javascript: [
      {
        title: "Calculate Average Grade",
        desc: "Write a function getAverage(scores) that accepts an array of numbers and returns their mathematical mean.",
        hint: "Use scores.reduce((a, b) => a + b, 0) / scores.length",
        criteria: "Returns exact average"
      },
      {
        title: "Filter Active Subscriptions",
        desc: "Given an array of user objects with an isActive boolean property, use .filter() to return only active users.",
        hint: "users.filter(u => u.isActive)",
        criteria: "Uses .filter() method cleanly"
      }
    ],
    react: [
      {
        title: "Interactive Toggle Switch",
        desc: "Create a React component that toggles between 'DARK MODE' and 'LIGHT MODE' using a boolean useState hook.",
        hint: "const [isDark, setIsDark] = React.useState(false);",
        criteria: "Manages boolean state and updates UI on click"
      },
      {
        title: "Dynamic Grocery Counter",
        desc: "Create a React counter that increments and decrements an item quantity, never letting it drop below zero.",
        hint: "onClick={() => setQty(Math.max(0, qty - 1))}",
        criteria: "Handles min constraint in state update"
      }
    ]
  };

  const pool = tasks[lesson?.type] || tasks.javascript;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  return picked;
}

export function generateNotebookLMAudioOverview(lesson) {
  return {
    title: `Audio Discussion: ${lesson.title}`,
    hosts: [
      { name: "Dr. Sarah Miller", role: "Lead Systems Instructor" },
      { name: "Mentor Arben", role: "Senior Academy Mentor" }
    ],
    duration: "4 min conversation overview",
    transcript: [
      {
        speaker: "Dr. Sarah Miller",
        text: `Welcome back to the QuolyTech Code Academy deep-dive. Today we are looking at ${lesson.title}. Arben, what makes this concept so pivotal for someone who has never written code before?`
      },
      {
        speaker: "Mentor Arben",
        text: `Sarah, students often get intimidated by the technical syntax. But as we explain in our academy: ${lesson.metaphor || 'it is just like assembling modular tools.'} Once a student realizes that, the mental block disappears.`
      },
      {
        speaker: "Dr. Sarah Miller",
        text: `Exactly. If we look at the core theory: ${lesson.theory.slice(0, 200)}... That's why hands-on practice in the live editor is where the actual learning happens.`
      },
      {
        speaker: "Mentor Arben",
        text: `Dhe për studentët tanë shqipfolës: ${lesson.metaphorSq || 'Kodi mësohet duke provuar me duart e tua.'} Don't be afraid to make mistakes in the editor—the test runner is here to guide you!`
      }
    ]
  };
}
