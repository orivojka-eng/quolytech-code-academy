// Built-in Smart Pedagogical Instructor Engine (Zero API Key Required)
export function getChallengeHelp({ challenge, studentCode, language = "en" }) {
  const isSq = language === "sq";

  if (!studentCode || studentCode.trim().length === 0) {
    return isSq 
      ? `💡 **Këshillë nga Mësuesi:** Nuk ke shkruar ende kod në editor. Shiko shembullin e dhënë më sipër dhe plotëso detyrën hap pas hapi.`
      : `💡 **Teacher's Hint:** You haven't written any code in the editor yet. Look at the code example provided in the challenge description and type your solution.`;
  }

  // Check for common syntax patterns based on lesson type
  if (challenge.type === "html") {
    if (!studentCode.includes("<") || !studentCode.includes(">")) {
      return isSq
        ? `⚠️ **Kujdes me sintaksën:** Në HTML çdo etiketë fillon me \`<\` dhe mbaron me \`>\`. P.sh: \`<h1>Titulli</h1>\`.`
        : `⚠️ **Syntax Warning:** In HTML, every element begins with an opening angle bracket \`<\` and ends with \`>\`. For example: \`<h1>Title</h1>\`.`;
    }
  }

  if (challenge.type === "css") {
    if (!studentCode.includes("{") || !studentCode.includes("}")) {
      return isSq
        ? `⚠️ **Kujdes me sintaksën:** Në CSS rregullat vendosen brenda kllapave gjarpëruese \`{\` dhe \`}\`. P.sh: \`.titull { color: blue; }\`.`
        : `⚠️ **Syntax Warning:** In CSS, style declarations must be enclosed in curly braces \`{\` and \`}\`. For example: \`.title { color: blue; }\`.`;
    }
  }

  if (challenge.type === "javascript" || challenge.type === "react") {
    if (studentCode.includes("const ") && !studentCode.includes("=")) {
      return isSq
        ? `⚠️ **Deklarimi i variablit:** Kur përdor \`const emri\`, duhet t'i japësh një vlerë duke përdorur barazimin \`=\`.`
        : `⚠️ **Variable Declaration:** When declaring \`const name\`, you must assign an initial value using the assignment operator \`=\`.`;
    }
  }

  // Provide custom hint tailored to the challenge
  return isSq
    ? `💡 **Ndihmë për këtë detyrë:**\n${challenge.hint}\n\n**Shembulli i referencës:**\n\`\`\`\n${challenge.solution}\n\`\`\`\n*Kopjo strukturën e shembullit dhe përshtat vlerat e kërkuara.*`
    : `💡 **Challenge Guidance:**\n${challenge.hint}\n\n**Reference Pattern:**\n\`\`\`\n${challenge.solution}\n\`\`\`\n*Compare your code with the reference pattern to see what is missing.*`;
}
