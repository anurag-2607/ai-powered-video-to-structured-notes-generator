import { useVideo } from '../hooks/useVideo';

export default function VideoDetails({ setSubPage }) {
  const { currentVideo } = useVideo();

  if (!currentVideo) return <p className="text-sm text-zinc-500">No active item parsing parameters found.</p>;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-white flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] bg-indigo-600/20 text-indigo-400 font-bold px-2 py-0.5 rounded-md uppercase border border-indigo-500/20">Active Matrix Workspace</span>
          <h2 className="text-xl font-bold mt-2">{currentVideo.title}</h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">Source: {currentVideo.url}</p>
        </div>
        <button onClick={() => setSubPage('overview')} className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700/50 transition-colors">
          Return Feed
        </button>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Automated AI Executive Summary Extract</h4>
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-300 leading-relaxed font-normal">
          {currentVideo.summary || "No active summary block compiled for this pipeline."}
        </div>
      </div>

      <div className="p-4 bg-indigo-950/20 border border-indigo-900/40 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h5 className="text-sm font-semibold">Semantic Note Editor Core</h5>
          <p className="text-xs text-zinc-400 mt-0.5">Ready to review semantic timestamp cards, timeline metrics, and document layout configurations.</p>
        </div>
        {/* This triggers code paths mapped to your `ai/` workspace folders later */}
        <button 
          onClick={() => alert("Connecting target workspace to components located inside the adjacent /ai/ directory framework structures now.")}
          className="whitespace-nowrap px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg tracking-wide shadow-md transition-all"
        >
          Initialize Interactive AI Editor Studio
        </button>
      </div>
    </div>
  );
}