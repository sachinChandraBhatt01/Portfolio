import { useState } from "react";
import {
  VscFiles, VscHome, VscAccount, VscProject, VscMail,
  VscChevronDown, VscChevronRight, VscThreeBars,
  VscSearch, VscClose
} from "react-icons/vsc";

const filesStructure = [
  {
    folder: "Portfolio",
    key: "portfolio",
    files: [
      { key: "home", label: "Home.js", icon: <VscHome /> },
      { key: "about", label: "About.js", icon: <VscAccount /> },
      { key: "projects", label: "Projects.js", icon: <VscProject /> },
      { key: "contact", label: "Contact.js", icon: <VscMail /> },
    ],
  },
];

export default function Sidebar({ activePage, setActivePage, theme, openPages, setOpenPages }) {
  const [folderOpen, setFolderOpen] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isDark = theme === "dark";

  const toggleFolder = (key) => setFolderOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  const filterFiles = (files) =>
    !searchTerm ? files : files.filter((file) => file.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFileClick = (fileKey) => {
    setActivePage(fileKey);
    if (!openPages.includes(fileKey)) {
      setOpenPages([...openPages, fileKey]);
    }
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 flex items-center px-3 py-2 border-b ${isDark ? "bg-[#252526] border-[#333]" : "bg-[#f3f3f3] border-[#ccc]"}`}>
        <button onClick={() => setSidebarOpen(true)} className={`${isDark ? "text-gray-300" : "text-gray-700"} text-2xl`}>
          <VscThreeBars />
        </button>
      </div>

      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="md:hidden fixed inset-0 bg-black/40 z-40" />}

      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 pt-2.5 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 ${isDark ? "bg-[#252526] text-gray-300 border-r border-[#333]" : "bg-[#f9f9f9] text-gray-800 border-r border-[#ddd]"}`}>
        {/* Explorer Header */}
        <div className={`flex items-center justify-between px-3 py-2 text-xs uppercase tracking-widest border-b ${isDark ? "text-gray-400 border-[#333]" : "text-gray-600 border-[#ddd]"}`}>
          <div className="flex items-center gap-2">
            <VscFiles className="text-base" />
            Explorer
          </div>
          <button onClick={() => setSidebarOpen(false)} className={`md:hidden text-lg hover:${isDark ? "text-white" : "text-gray-900"}`}>
            <VscClose />
          </button>
        </div>

        {/* Search */}
        <div className={`px-3 py-2 border-b ${isDark ? "border-[#333]" : "border-[#ddd]"}`}>
          <div className="relative">
            <VscSearch className={`${isDark ? "text-gray-400" : "text-gray-500"} absolute left-2 top-2`} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full text-sm pl-7 pr-2 py-1 rounded focus:outline-none focus:ring-1 ${isDark ? "bg-[#1e1e1e] text-gray-200 focus:ring-blue-500" : "bg-[#f0f0f0] text-gray-800 focus:ring-blue-400"}`}
            />
          </div>
        </div>

        {/* Folder & Files */}
        <div className="flex flex-col px-2 mt-1 overflow-y-auto">
          {filesStructure.map((folder) => {
            const isOpen = folderOpen[folder.key] || false;
            const filteredFiles = filterFiles(folder.files);

            return (
              <div key={folder.key} className="mb-2">
                <button onClick={() => toggleFolder(folder.key)} className={`flex items-center w-full px-2 py-1 rounded ${isDark ? "hover:bg-[#2a2d2e] text-gray-400" : "hover:bg-[#e2e2e2] text-gray-700"}`}>
                  {isOpen ? <VscChevronDown /> : <VscChevronRight />}
                  <span className="ml-1 text-sm font-semibold">{folder.folder}</span>
                </button>

                {isOpen && filteredFiles.length > 0 && (
                  <div className="flex flex-col ml-4 mt-1">
                    {filteredFiles.map((file) => {
                      const isActive = activePage === file.key;
                      return (
                        <button key={file.key} onClick={() => handleFileClick(file.key)} className={`flex items-center gap-2 px-2 py-1 text-sm rounded transition-colors ${isActive ? (isDark ? "bg-[#37373d] text-white" : "bg-[#d0d0d0] text-black") : (isDark ? "hover:bg-[#2a2d2e] text-gray-300" : "hover:bg-[#e2e2e2] text-gray-800")}`}>
                          <span className="text-lg text-blue-400">{file.icon}</span>
                          <span className="truncate">{file.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {isOpen && filteredFiles.length === 0 && searchTerm && (
                  <div className={`ml-6 mt-1 text-xs italic ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                    No matching files
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
