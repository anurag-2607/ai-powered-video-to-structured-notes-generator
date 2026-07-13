import { createContext, useState, useEffect } from 'react';
import { videoService } from '../services/videoService';

export const VideoContext = createContext(null);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const data = await videoService.fetchVideos();
      setVideos(data);
    } catch (err) {
      setError("Failed to synchronize video dashboard repositories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const addVideo = async (videoPayload) => {
    try {
      const newVideo = await videoService.uploadVideo(videoPayload);
      setVideos((prev) => [newVideo, ...prev]);
      return newVideo;
    } catch (err) {
      throw new Error("API compilation or upload pipeline error.");
    }
  };

  const removeVideo = async (id) => {
    try {
      await videoService.deleteVideo(id);
      setVideos((prev) => prev.filter(v => v.id !== id));
      if (currentVideo?.id === id) setCurrentVideo(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VideoContext.Provider value={{ 
      videos, currentVideo, loading, error, 
      setCurrentVideo, addVideo, removeVideo, reloadVideos: loadVideos 
    }}>
      {children}
    </VideoContext.Provider>
  );
};