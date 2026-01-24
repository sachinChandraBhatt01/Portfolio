import Sidebar from "./Sidebar.jsx";
import Tabs from "./Tabs.jsx";
import StatusBar from "./Statusbar.jsx";
import Terminal from "./Terminal.jsx";
import CommandPalette from "./CommandPalette.jsx";
import { VscFiles, VscFileCode, VscArrowLeft } from "react-icons/vsc";

export default function EditorLayout({
  children,
  activePage,
  setActivePage,
  theme,
  setTheme,
  showPalette,
  setShowPalette,
  openPages,
  setOpenPages,
  showTerminal,
  setShowTerminal,
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={`h-screen w-screen overflow-hidden ${isDark ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]"}`}
    >
      <div className="flex h-full flex-col">
        {/* Top Bar */}
        <header
          className={`flex items-center justify-between px-3 h-9 ${
            isDark
              ? "bg-[#3c3c3c] border-b border-[#2b2b2b]"
              : "bg-[#dddddd] border-b border-[#cfcfcf]"
          } shrink-0`}
        >
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <p
            className={`text-lg opacity-80 truncate ${isDark ? "text-gray-200" : "text-gray-800"}`}
            style={{fontFamily:"Caveat"}}
          >
            sachin-portfolio
          </p>
          <div />
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            activePage={activePage}
            theme={theme}
            setActivePage={setActivePage}
            openPages={openPages}
            setOpenPages={setOpenPages}
          />

          {/* Editor Area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Tabs */}
            <Tabs
              activePage={activePage}
              setActivePage={setActivePage}
              openPages={openPages}
              setOpenPages={setOpenPages}
              theme={theme}
            />

            {/* Editor Content */}
            <main
              className={`flex-1 overflow-auto ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}
            >
              {children[4] == null ? (
                <div
                  className={`flex h-full w-full items-center justify-center px-4 ${isDark ? "bg-[#1e1e1e]" : "bg-[#fafafa]"}`}
                >
                  <div className="flex flex-col items-center text-center select-none max-w-sm">
                    <div
                      className={`mb-4 text-6xl ${isDark ? "text-[#3794ff]" : "text-[#005fb8]"}`}
                    >
                      <VscFileCode />
                    </div>
                    <h2
                      className={`text-lg font-medium ${isDark ? "text-[#cccccc]" : "text-[#333]"}`}
                    >
                      Welcome
                    </h2>
                    <p
                      className={`mt-1 text-sm ${isDark ? "text-[#858585]" : "text-[#666]"}`}
                    >
                      Open a file from the sidebar to get started
                    </p>
                    <div
                      className={`mt-6 flex items-center gap-2 text-xs ${isDark ? "text-[#6a6a6a]" : "text-[#888]"}`}
                    >
                      <VscArrowLeft />
                      <span>Explorer</span>
                      <VscFiles
                        className={isDark ? "text-[#3794ff]" : "text-[#005fb8]"}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                children
              )}
            </main>

            {/* Terminal (desktop only, optional) */}
            {showTerminal && (
              <div className="shrink-0 h-48 md:block">
                {" "}
                {/* fixed height */}
                <Terminal theme={theme} />
              </div>
            )}
          </div>
        </div>

        <StatusBar activePage={activePage} theme={theme} setTheme={setTheme} />

        {showPalette && (
          <CommandPalette
            theme={theme}
            openPages={openPages}
            setOpenPages={setOpenPages}
            setActivePage={setActivePage}
            setShowPalette={setShowPalette}
          />
        )}
      </div>
    </div>
  );
}
