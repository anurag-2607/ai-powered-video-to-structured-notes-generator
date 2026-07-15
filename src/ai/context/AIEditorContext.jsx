import { createContext, useState, useEffect } from 'react';
import { transcriptionService } from '../services/transcriptionService';

export const AIEditorContext = createContext(null);

export const AIEditorProvider = ({ children, video }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seekTime, setSeekTime] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [markdownNotes, setMarkdownNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', role: 'assistant', content: `Hi! I've analyzed "${video?.title}". You can ask me questions about any concepts discussed in the video.` }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkspaceData = async () => {
      if (!video) return;
      setLoading(true);
      try {
        const transData = await transcriptionService.getTranscript(video.id);
        setTranscript(transData);
        
        // Generate pre-populated summary template notes
        setMarkdownNotes(
          `# Study Notes: ${video.title}\n\n` +
          `## Executive Overview [00:02]\n` +
          `This video resource dives deep into structural concepts.\n\n` +
          `## Key Conceptual Milestones\n` +
          `* Core Fundamentals **[00:10]**\n` +
          `* Advanced Analysis & Architecture Principles **[00:25]**\n\n` +
          `*Click on any bold timestamp anchor format above to command the timeline.*`
        );
      } catch (err) {
        console.error("Workspace initial compilation error", err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspaceData();
  }, [video]);

  const seekTo = (seconds) => {
    setSeekTime(seconds);
  };

  return (
    <AIEditorContext.Provider value={{
      video, currentTime, setCurrentTime, isPlaying, setIsPlaying,
      seekTime, setSeekTime, seekTo, transcript, markdownNotes, setMarkdownNotes,
      chatMessages, setChatMessages, loading
    }}>
      {children}
    </AIEditorContext.Provider>
  );
};