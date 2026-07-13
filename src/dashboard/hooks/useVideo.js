import { useContext } from 'react';
import { VideoContext } from '../context/VideoContext';

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be wrapper deployed within a functional VideoProvider context container.');
  }
  return context;
};