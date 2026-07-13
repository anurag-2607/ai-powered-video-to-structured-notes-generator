export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay layer masking */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Interactive modal container platform panel card */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl z-10 text-white animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
          <h3 className="text-lg font-bold tracking-wide">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}