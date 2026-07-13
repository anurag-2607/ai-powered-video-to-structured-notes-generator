import { useState } from 'react';

export default function UploadBox({ onUploadSuccess }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setIsSubmitting(true);
    try {
      await onUploadSuccess({ url, title: title || "AI Note Resource Extract" });
      setUrl('');
      setTitle('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
      <div>
        <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Resource Name (Optional)</label>
        <input 
          type="text" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., CS50 Lecture 1: Memory Allocation"
          className="w-full mt-1.5 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>
      <div>
        <label className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Video Stream / Source Link Link</label>
        <input 
          type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube, Vimeo or cloud source address URL"
          className="w-full mt-1.5 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <button
        type="submit" disabled={isSubmitting || !url}
        className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800/50 text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Initializing Cloud Parsing Engine Pipeline...
          </>
        ) : (
          "Ingest Video & Construct Smart Summaries"
        )}
      </button>
    </form>
  );
}