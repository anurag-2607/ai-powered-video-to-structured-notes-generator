export default function NotFound({ setSubPage }) {
  return (
    <div className="w-full h-96 flex flex-col items-center justify-center text-center gap-3">
      <h3 className="text-3xl font-black tracking-tight text-zinc-100">404</h3>
      <p className="text-sm text-zinc-400 max-w-xs">The requested sub-workspace module context parameters coordinates could not be loaded.</p>
      <button onClick={() => setSubPage('overview')} className="mt-2 text-xs font-semibold px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
        Return to Overview Core
      </button>
    </div>
  );
}