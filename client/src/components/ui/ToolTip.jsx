export default function ToolTip({ text, arrow = true }) {
  return (
    // ToolTip
    <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 z-50">
      {text}
      {/* Optional: Little upward-pointing triangle arrow */}
      {arrow && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-700"></span>
      )}
    </span>
  );
}
