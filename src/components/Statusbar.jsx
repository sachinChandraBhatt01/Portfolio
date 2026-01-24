import { VscCircleFilled } from "react-icons/vsc";
import { FiSun, FiMoon } from "react-icons/fi";

export default function StatusBar({ activePage, theme, setTheme }) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`
        flex items-center justify-between px-3 h-7
        ${isDark ? "bg-[#007acc] border-t border-[#333]" : "bg-[#e1e1e1] border-t border-[#ccc]"}
        select-none text-xs font-medium
      `}
    >
      {/* Left: File Info */}
      <div className="flex items-center gap-2 truncate">
        <VscCircleFilled
          className={`text-[0.55rem] ${isDark ? "text-white" : "text-gray-700"}`}
        />
        <span className={`truncate ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          {activePage ? `${activePage}.js` : "No file open"}
        </span>
      </div>

      {/* Right: Theme Toggle */}
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`
          flex items-center gap-1 px-2 py-0.5 rounded-md transition-colors
          ${isDark ? "text-gray-100 hover:bg-black/20" : "text-gray-800 hover:bg-black/5"}
        `}
      >
        {isDark ? <FiMoon className="text-sm" /> : <FiSun className="text-sm" />}
        <span>{isDark ? "Dark" : "Light"}</span>
      </button>
    </footer>
  );
}
