import { useState, useRef, useEffect } from 'react';
import { useAIEditor } from '../hooks/useAIEditor';
import { llmService } from '../services/llmService';

export default function ChatWithVideo() {
  const { transcript, chatMessages, setChatMessages } = useAIEditor();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: 'user', content: input };
    setChatMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await llmService.askAssistant(userMessage.content, transcript);
      setChatMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
      <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Contextual Video Chat</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 min-h-[250px] max-h-[300px] scrollbar-thin">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
            <span className="text-[10px] text-zinc-500 font-semibold mb-0.5">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
            <div className={`p-2.5 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-zinc-950 text-zinc-300 border border-zinc-800 rounded-tl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="self-start flex gap-1 items-center p-2.5 rounded-xl bg-zinc-950 text-zinc-500 text-xs border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce delay-100" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-bounce delay-200" />
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
        <input
          type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading}
          placeholder="Ask about pointers, memory, limits..."
          className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-white">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </form>
    </div>
  );
}