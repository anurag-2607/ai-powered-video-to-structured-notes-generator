const mockTranscripts = {
  default: [
    { id: 1, start: 0, end: 8, text: "Welcome to this specialized technical session on scalable design patterns." },
    { id: 2, start: 9, end: 18, text: "Today we are analyzing how memory allocation works under low-level resource environments." },
    { id: 3, start: 19, end: 27, text: "Understanding these layers helps prevent stack overflows and leak configurations." },
    { id: 4, start: 28, end: 38, text: "First, let's examine the difference between stack and heap memory operations." },
    { id: 5, start: 39, end: 50, text: "The stack handles immediate functional local pointers, whereas the heap supports dynamic sizing." },
    { id: 6, start: 51, end: 60, text: "We will build custom profiling dashboards to inspect this activity in real-time." }
  ]
};

export const transcriptionService = {
  getTranscript: async (videoId) => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Latency delay
    return mockTranscripts[videoId] || mockTranscripts.default;
  }
};