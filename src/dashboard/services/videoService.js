const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Realistic initial dataset for an AI Video Note Maker app
const mockVideos = [
  {
    id: "vid-1",
    title: "Advanced React Design Patterns & Performance Optimization",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "45:12",
    status: "Completed",
    createdAt: "July 08, 2026",
    notesCount: 14,
    summary: "An in-depth exploration of advanced React hooks, custom state machines, rendering profiling toolkits, and context memoization strategies to build ultra-responsive user experiences."
  },
  {
    id: "vid-2",
    title: "System Design 101: Designing Distributed Scalable Architectures",
    url: "https://www.youtube.com/watch?v=abc123xyz",
    duration: "1:12:05",
    status: "Processing",
    createdAt: "July 09, 2026",
    notesCount: 0,
    summary: ""
  },
  {
    id: "vid-3",
    title: "Introduction to Large Language Models & Prompt Engineering Basics",
    url: "https://www.youtube.com/watch?v=llm789vws",
    duration: "28:40",
    status: "Failed",
    createdAt: "July 05, 2026",
    notesCount: 0,
    summary: ""
  }
];

export const videoService = {
  fetchVideos: async () => {
    await delay(1000);
    return [...mockVideos];
  },

  uploadVideo: async (videoData) => {
    await delay(2000); // Simulate network & initial validation latency
    const newVideo = {
      id: `vid-${Date.now()}`,
      title: videoData.title || "Untitled AI Processed Resource",
      url: videoData.url,
      duration: "15:00", // Extracted placeholder duration
      status: "Processing",
      createdAt: "Just Now",
      notesCount: 0,
      summary: ""
    };
    return newVideo;
  },

  deleteVideo: async (id) => {
    await delay(800);
    return { success: true, deletedId: id };
  }
};