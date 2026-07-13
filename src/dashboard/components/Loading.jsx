export default function Loading({ message = "Synchronizing components..." }) {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center gap-3 text-zinc-400">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm tracking-wide font-medium animate-pulse">{message}</p>
    </div>
  );
}