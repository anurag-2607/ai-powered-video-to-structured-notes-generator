export default function Input({ label, type = "text", error, ...props }) {
  return (
    <div className="w-full flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-medium text-zinc-300">{label}</label>
      <input
        type={type}
        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}