export default function Terminal({ theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`
        w-full h-28 overflow-auto rounded-t-md shadow-inner pb-2
        ${isDark ? "bg-[#1e1e1e] text-gray-200 border-t border-[#333]" : "bg-[#f9f9f9] text-gray-800 border-t border-[#ccc]"}
        font-mono text-sm flex flex-col p-3 gap-1
      `}
      style={{
        resize: "none",       // disable resizing
        scrollbarWidth: "thin",
        scrollbarColor: isDark ? "#555 #1e1e1e" : "#aaa #f9f9f9",
      }}
    >
      <p>
        <span className={isDark ? "text-green-400" : "text-green-600"}>$</span> npm run build
      </p>
      <p>
        <span className={isDark ? "text-green-400" : "text-green-600"}>✔</span> Build successful
      </p>
      <p>
        <span className={isDark ? "text-blue-400" : "text-blue-600"}>$</span> Ready to deploy 🚀
      </p>
      {/* <p className={isDark ? "text-gray-400" : "text-gray-500"}>Watching files for changes...</p> */}
      {/* <p className={isDark ? "text-yellow-400" : "text-yellow-600"}>⚠ Warning: Some minor issues detected</p> */}
    </div>
  );
}
