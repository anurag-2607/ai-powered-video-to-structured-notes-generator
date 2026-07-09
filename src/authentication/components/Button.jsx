export default function Button({ children, isLoading, ...props }) {
  return (
    <button
      disabled={isLoading}
      className="w-full flex items-center justify-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : children}
    </button>
  );
}