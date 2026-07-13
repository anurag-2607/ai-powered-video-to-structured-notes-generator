export default function ProgressBar({ progress, label = "Processing API actions" }) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between text-xs font-medium text-zinc-400">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}