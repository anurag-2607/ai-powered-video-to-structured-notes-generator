import { useAuth } from '../hooks/useAuth';

export default function Navbar({ setPage }) {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between text-white">
      <div className="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent cursor-pointer" onClick={() => setPage('home')}>
        AI NoteMaker
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-zinc-400">Hi, {user.name}</span>
            <button onClick={logout} className="text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-md transition-colors">
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')} className="text-sm text-zinc-300 hover:text-white">Sign In</button>
            <button onClick={() => setPage('signup')} className="text-sm bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md transition-colors">Get Started</button>
          </>
        )
      }
      </div>
    </nav>
  );
}