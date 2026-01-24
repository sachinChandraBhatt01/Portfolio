import { VscChromeClose, VscFileCode } from "react-icons/vsc";

const pageTitles = {
  home: "Home.js",
  about: "About.js",
  projects: "Projects.js",
  contact: "Contact.js",
};

export default function Tabs({ openPages = [], activePage, setActivePage, setOpenPages, theme }) {
  const isDark = theme === "dark";

  if (!openPages.length) return null;

  const handleClose = (e, key) => {
    e.stopPropagation();
    const filtered = openPages.filter((p) => p !== key);
    setOpenPages(filtered);

    if (activePage === key) {
      setActivePage(filtered.length ? filtered[filtered.length - 1] : null);
    }
  };

  const handleTabClick = (key) => setActivePage(key);

  return (
    <div className={`flex items-center border-b h-9 px-2 overflow-x-auto ${isDark ? "bg-[#252526] border-[#333]" : "bg-[#f3f3f3] border-[#ccc]"}`}>
      {openPages.map((key) => {
        const isActive = key === activePage;
        return (
          <div key={key} onClick={() => handleTabClick(key)} className={`flex items-center gap-2 px-3 h-full cursor-pointer rounded-t-sm border-t-2 transition-colors ${isActive ? (isDark ? "bg-[#1e1e1e] border-blue-500 text-gray-200" : "bg-white border-blue-500 text-gray-800") : (isDark ? "text-gray-400 hover:bg-[#2a2d2e]" : "text-gray-700 hover:bg-[#e2e2e2]")}`}>
            <VscFileCode className={`text-sm ${isActive ? "text-blue-400" : ""}`} />
            <span className="whitespace-nowrap">{pageTitles[key] || `${key}.js`}</span>
            <VscChromeClose onClick={(e) => handleClose(e, key)} className={`ml-2 cursor-pointer hover:text-red-500 ${isActive ? "" : isDark ? "text-gray-400" : "text-gray-600"}`} />
          </div>
        );
      })}
    </div>
  );
}
