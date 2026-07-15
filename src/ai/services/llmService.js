export const llmService = {
  askAssistant: async (question, transcript) => {
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate AI computation

    const prompt = question.toLowerCase();
    const contextLines = transcript.map(t => t.text).join(" ");

    if (prompt.includes("stack") || prompt.includes("heap") || prompt.includes("memory")) {
      return "According to the video around [00:28], Stack memory is allocated for fast, localized, automatic functional operations. Heap memory is utilized for dynamic execution scopes requiring runtime reference expansions.";
    }

    if (prompt.includes("summary") || prompt.includes("overview")) {
      return "The session covers memory organization architectures. It explains performance traps like memory leaks, distinguishes stack vs heap operations, and reviews runtime profiling strategies.";
    }

    return "Based on the transcript context, the speaker discussed system optimization. Could you clarify your question regarding memory allocation or profiling?";
  }
};