import { useAuth } from '../../authentication/hooks/useAuth';

export default function Navbar({ setPage, currentSubPage, setSubPage }) {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full h-16 border-b border-zinc-800 bg-zinc-900 px-6 flex items-center justify-between text-white z-20 relative">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage('home')}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-sm shadow-md shadow-indigo-600/30">AI</div>
        <span className="font-bold tracking-wide text-md hidden sm:inline">NotesWorkspace</span>
      </div>

      {/* Embedded top middle context triggers useful for structural switches on small screens */}
      <div className="flex md:hidden items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
        <button onClick={() => setSubPage('overview')} className={`text-xs px-2.5 py-1 rounded-md ${currentSubPage === 'overview' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>Feed</button>
        <button onClick={() => setSubPage('upload')} className={`text-xs px-2.5 py-1 rounded-md ${currentSubPage === 'upload' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}>+ New</button>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-zinc-100">{user?.name || "Profile Engine"}</p>
          <p className="text-[10px] text-zinc-500 font-mono tracking-tighter">Tier: Free Tier Account</p>
        </div>
        <button onClick={() => { logout(); setPage('home'); }} className="text-xs bg-zinc-800 hover:bg-red-950/40 hover:text-red-400 px-3 py-2 rounded-md border border-zinc-700/60 transition-colors">
          Exit Session
        </button>
      </div>
    </nav>
  );
}
