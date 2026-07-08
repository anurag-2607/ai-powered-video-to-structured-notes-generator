import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Home({ setPage }) {
  const { user } = useAuth();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-zinc-950 text-white p-8 flex flex-col items-center justify-center">
      {user ? (
        /* Protected App Dashboard Content */
        <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-md">
          <div className="border-b border-zinc-800 pb-4 mb-6">
            <h2 className="text-xl font-bold">Generate Study Notes</h2>
            <p className="text-zinc-400 text-sm">Paste any public link from video resource platforms to initialize core parsing engine context endpoints.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <Input label="Video Resource URL" placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            <div className="mb-4 w-full sm:w-auto">
              <Button>Transcribe & Summarize</Button>
            </div>
          </div>
          <div className="h-48 border border-dashed border-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 text-sm bg-zinc-950/50 mt-4">
            Your processed workspace content history renders here.
          </div>
        </div>
      ) : (
        /* Public Guest View Content */
        <div className="text-center max-w-xl">
          <span className="px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-800 text-xs font-semibold rounded-full tracking-wider uppercase">Alpha Release</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 mb-6 tracking-tight leading-tight">Turn long educational videos into smart notes.</h1>
          <p className="text-zinc-400 text-base mb-8">Stop wasting hours writing timestamps. Generate high-quality summaries, definitions, and action items using advanced processing models seamlessly.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setPage('signup')} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/20">Get Started Free</button>
            <button onClick={() => setPage('login')} className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 font-medium rounded-lg transition-colors">Sign In Container</button>
          </div>
        </div>
      )}
    </div>
  );
}