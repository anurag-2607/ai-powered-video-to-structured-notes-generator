import { useRef, useEffect } from 'react';
import { useAIEditor } from '../hooks/useAIEditor';

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const { setCurrentTime, isPlaying, setIsPlaying, seekTime, setSeekTime } = useAIEditor();

  // Watch for external seek queries (e.g. from Transcript or Markdown)
  useEffect(() => {
    if (seekTime !== null && videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
      setSeekTime(null); // Reset flag
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [seekTime, isPlaying, setSeekTime, setCurrentTime, setIsPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.floor(videoRef.current.currentTime));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-black rounded-xl overflow-hidden border border-zinc-800 flex flex-col">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        />
      </div>
      <div className="bg-zinc-900 px-4 py-2.5 flex items-center gap-4 text-white">
        <button onClick={togglePlay} className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
          {isPlaying ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
          )}
        </button>
        <span className="text-xs text-zinc-400">Sample Ingested Tutorial File</span>
      </div>
    </div>
  );
}