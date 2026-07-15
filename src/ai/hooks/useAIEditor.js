import { useContext } from 'react';
import { AIEditorContext } from '../context/AIEditorContext';

export const useAIEditor = () => {
  const context = useContext(AIEditorContext);
  if (!context) {
    throw new Error('useAIEditor must be initialized within an active AIEditorProvider parent.');
  }
  return context;
};