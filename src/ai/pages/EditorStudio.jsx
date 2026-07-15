import { useVideo } from '../../dashboard/hooks/useVideo';
import { AIEditorProvider } from '../context/AIEditorContext';
import VideoPlayer from '../components/VideoPlayer';
import TranscriptViewer from '../components/TranscriptViewer';
import MarkdownEditor from '../components/MarkdownEditor';
import ChatWithVideo from '../components/ChatWithVideo';

export default function EditorStudio({ setSubPage }) {
  const { currentVideo } = useVideo();

  if (!currentVideo) {
    return (
      <div className="p-6 text-zinc-500 text-center text-sm">
        No video context found. Please return to the dashboard overview and select a video.
        <button onClick={() => setSubPage('overview')} className="block mt-4 mx-auto px-4 py-2 bg-zinc-800 text-white rounded-lg">Return Feed</button>
      </div>
    );
  }

  return (
    <AIEditorProvider video={currentVideo}>
      <div className="w-full flex flex-col gap-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div className="text-left">
            <span className="text-[10px] bg-indigo-600/20 text-indigo-400 font-bold px-2 py-0.5 rounded-md uppercase border border-indigo-500/20">Active Media Workspace</span>
            <h2 className="text-xl font-bold mt-1 text-white">{currentVideo.title}</h2>
          </div>
          <button 
            onClick={() => setSubPage('overview')} 
            className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg border border-zinc-700/50 transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Save & Exit
          </button>
        </div>

        {/* Dynamic Responsive Multi-Pane Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Playback & Active Transcription Highlight Feed (Lg: 5/12 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <VideoPlayer />
            <TranscriptViewer />
          </div>

          {/* Right Column: Editing and AI Co-Pilot chat tabs (Lg: 7/12 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 h-full">
            <MarkdownEditor />
            <ChatWithVideo />
          </div>
        </div>
      </div>
    </AIEditorProvider>
  );
}