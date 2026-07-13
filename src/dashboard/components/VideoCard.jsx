export default function VideoCard({ video, onSelect, onDelete }) {
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Processing': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse';
      default: return 'bg-red-500/10 text-red-400 border-red-500/20';
    }
  };

  return (
    <div className="group bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 hover:shadow-lg transition-all duration-200">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getStatusStyle(video.status)}`}>
            {video.status}
          </span>
          <span className="text-xs text-zinc-500">{video.createdAt}</span>
        </div>
        <h4 className="text-sm font-semibold line-clamp-2 text-zinc-100 group-hover:text-white transition-colors">
          {video.title}
        </h4>
        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {video.duration}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-4 gap-2">
        <button 
          onClick={() => onSelect(video)}
          disabled={video.status !== 'Completed'}
          className="text-xs font-semibold py-1.5 px-3 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Open Workspace
        </button>
        <button 
          onClick={() => onDelete(video.id)}
          className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="Remove entry"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}