import { useEffect, useState } from "react";
import EditorLayout from "./components/EditorLayout.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Projects from "./Pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [showPalette, setShowPalette] = useState(false);
  const [openPages, setOpenPages] = useState(["home"]);
  const [showTerminal, setShowTerminal] = useState(false); // <-- terminal state

  // Ctrl + K for command palette & Ctrl + ~ for terminal
  useEffect(() => {
    const handler = (e) => {
      // Command palette: Ctrl + K / Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowPalette((p) => !p);
      }

      // Terminal toggle: Ctrl + ` / Cmd + `
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setShowTerminal((t) => !t);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <EditorLayout
      activePage={activePage}
      setActivePage={setActivePage}
      theme={theme}
      setTheme={setTheme}
      showPalette={showPalette}
      setShowPalette={setShowPalette}
      openPages={openPages}
      setOpenPages={setOpenPages}
      showTerminal={showTerminal} // <-- pass to layout
      setShowTerminal={setShowTerminal}
    >
      {activePage === "home" && (
        <Home
          theme={theme}
          setActivePage={setActivePage}
          openPages={openPages}
          setOpenPages={setOpenPages}
        />
      )}
      {activePage === "about" && <About theme={theme} />}
      {activePage === "projects" && <Projects theme={theme} />}
      {activePage === "contact" && <Contact theme={theme} />}
      {activePage === null && "NoContent"}
    </EditorLayout>
  );
}
