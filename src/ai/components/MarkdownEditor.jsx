import { useState, useRef } from 'react';
import { useAIEditor } from '../hooks/useAIEditor';

export default function MarkdownEditor() {
  const { markdownNotes, setMarkdownNotes, seekTo } = useAIEditor();
  const [tab, setTab] = useState('write');
  const previewRef = useRef(null);

  // Custom regex compiler converting Markdown characters and [MM:SS] strings to interactive UI links
  const compileMarkdownToHtml = (text) => {
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-4 mb-2 border-b border-zinc-800/80 pb-1">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-md font-bold mt-4 mb-2 text-white border-b border-zinc-800 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-lg font-extrabold mt-2 mb-3 text-white">$1</h1>')
      .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-zinc-300 text-xs mb-1">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/_([^_]+)_/g, '<em class="text-zinc-300">$1</em>')
      .replace(/\n/g, '<br />');

    // Parse both [MM:SS] and [HH:MM:SS] timestamp structures
    return html.replace(/\[(\d{2}):(\d{2})\]/g, (match, min, sec) => {
      const totalSeconds = parseInt(min, 10) * 60 + parseInt(sec, 10);
      return `<span class="text-indigo-400 font-mono text-xs font-bold cursor-pointer hover:underline" data-seek="${totalSeconds}">${match}</span>`;
    });
  };

  const handlePreviewClick = (e) => {
    const target = e.target;
    const seekTarget = target.getAttribute('data-seek');
    if (seekTarget !== null) {
      seekTo(parseInt(seekTarget, 10));
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
      <div className="flex border-b border-zinc-800 justify-between items-center bg-zinc-950 px-4">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Notebook Studio</span>
        <div className="flex gap-1 p-1">
          <button onClick={() => setTab('write')} className={`text-xs px-2.5 py-1 rounded-md transition-all ${tab === 'write' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Edit</button>
          <button onClick={() => setTab('preview')} className={`text-xs px-2.5 py-1 rounded-md transition-all ${tab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Preview Note</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-4 bg-zinc-900 min-h-[300px]">
        {tab === 'write' ? (
          <textarea
            value={markdownNotes}
            onChange={(e) => setMarkdownNotes(e.target.value)}
            className="w-full flex-1 bg-transparent text-zinc-200 text-xs font-mono leading-relaxed resize-none focus:outline-none scrollbar-thin"
            placeholder="# Write your thoughts here..."
          />
        ) : (
          <div 
            ref={previewRef}
            onClick={handlePreviewClick}
            className="w-full flex-1 text-zinc-300 text-xs overflow-y-auto leading-relaxed text-left max-h-[350px] scrollbar-thin"
            dangerouslySetInnerHTML={{ __html: compileMarkdownToHtml(markdownNotes) }}
          />
        )}
      </div>
    </div>
  );
}