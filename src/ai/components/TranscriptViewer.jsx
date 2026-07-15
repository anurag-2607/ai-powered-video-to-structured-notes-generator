import { useEffect, useRef } from 'react';
import { useAIEditor } from '../hooks/useAIEditor';

export default function TranscriptViewer() {
  const { transcript, currentTime, seekTo } = useAIEditor();
  const activeLineRef = useRef(null);

  const formatTimestamp = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Auto-scroll active line to center view smoothly
  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentTime]);

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 border-b border-zinc-800 pb-2">Timestamped Transcript</h3>
      <div className="h-44 overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-zinc-800">
        {transcript.map((line) => {
          const isActive = currentTime >= line.start && currentTime <= line.end;
          return (
            <div
              key={line.id}
              ref={isActive ? activeLineRef : null}
              onClick={() => seekTo(line.start)}
              className={`p-2.5 rounded-lg text-xs cursor-pointer transition-all duration-150 border text-left ${
                isActive 
                  ? 'bg-indigo-600/10 text-indigo-300 border-indigo-500/30 font-medium' 
                  : 'bg-zinc-950/40 text-zinc-400 border-transparent hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <span className="font-mono text-indigo-400 mr-2">[{formatTimestamp(line.start)}]</span>
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}