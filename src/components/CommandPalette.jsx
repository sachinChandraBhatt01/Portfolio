const commands = [
  ["home", "Go to Home"],
  ["about", "Go to About"],
  ["projects", "Go to Projects"],
  ["contact", "Go to Contact"],
];

export default function CommandPalette({setActivePage,
  setShowPalette,
  openPages,
  setOpenPages,
theme}) {
  const isDark = theme === "dark";
    const handleClick = (key) => {
    // If page is not already open, add to openPages
    if (!openPages.includes(key)) {
      setOpenPages([...openPages, key]);
    }
    setActivePage(key);
    setShowPalette(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity ${
        isDark ? "bg-black/40" : "bg-white/30"
      }`}
      onClick={() => setShowPalette(false)}
    >
      <div
        className={`w-full max-w-md bg-${isDark ? "gray-800" : "white"} rounded-lg shadow-lg overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Type a command..."
          autoFocus
          className={`w-full px-4 py-2 border-b focus:outline-none ${
            isDark
              ? "bg-gray-800 text-gray-200 border-gray-700 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />

        <div className="max-h-64 overflow-y-auto">
          {commands.map(([key, label]) => (
            <div
              key={key}
              onClick={() => {
                handleClick(key);
              }}
              className={`px-4 py-2 cursor-pointer transition-colors flex items-center gap-2 ${
                isDark
                  ? "hover:bg-gray-700 text-gray-200"
                  : "hover:bg-gray-100 text-gray-900"
              }`}
            >
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
