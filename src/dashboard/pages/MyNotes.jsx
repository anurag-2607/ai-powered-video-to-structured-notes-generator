import { useVideo } from '../hooks/useVideo';

export default function MyNotes({ setSubPage }) {
  const { videos, setCurrentVideo } = useVideo();
  const completedItems = videos.filter(v => v.status === 'Completed');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">AI Generated Notes Portfolio</h2>
        <p className="text-xs text-zinc-400 mt-1">Access completely tokenized parsing configurations extracted out of indexed media links.</p>
      </div>

      {completedItems.length === 0 ? (
        <div className="h-48 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 text-sm">
          No generated markdown study notebooks discovered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {completedItems.map(video => (
            <div key={video.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 line-clamp-1">{video.title}</h4>
                <p className="text-xs text-zinc-500 mt-1">Extracted on {video.createdAt}</p>
              </div>
              <button 
                onClick={() => { setCurrentVideo(video); setSubPage('video-details'); }}
                className="mt-4 text-xs font-semibold py-2 px-3 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all text-center"
              >
                Launch Markdown Editor Studio ({video.notesCount} segments)
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}