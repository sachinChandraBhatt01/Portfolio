import { FaLaptopCode, FaSearch, FaPalette, FaRocket, FaReact, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SiTailwindcss, SiFramer } from "react-icons/si";

const PortfolioProject = {
  title: "Personal Portfolio",
  description:
    "Interactive, VS Code-style personal portfolio with smooth animations and responsive layout.",
  
  tech: [
    { name: "React", icon: <FaReact className="text-blue-500" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-500" /> },
    { name: "Framer Motion", icon: <SiFramer className="text-purple-500" /> },
  ],

  links: {
    github: { url: "https://github.com/sachinChandraBhatt01/Portfolio", icon: <FaGithub /> },
    live: { url: "https://sachinchandrabhatt.dev", icon: <FaExternalLinkAlt /> },
  },

  details: {
    overview: [
      { icon: <FaLaptopCode className="text-blue-500" />, text: "VS Code-style file navigation on the left side." },
      { icon: <FaSearch className="text-green-500" />, text: "Search for sections like Home, About, Projects, and Contact." },
      { icon: <FaPalette className="text-purple-500" />, text: "Dark & light theme toggle for better readability." },
      { icon: <FaRocket className="text-yellow-500" />, text: "Responsive animations for a smooth, professional experience." },
    ],
    description:
      "This is a personal portfolio designed for recruiters and personal branding. It mimics a VS Code-like interface with command palette navigation and tabbed sections.",
    
    frontend:
      "Built entirely using React, TailwindCSS, and Framer Motion. Components are reusable and state is managed with useState and props drilling.\n\nSmooth animations and theme toggling are implemented across the app.",

    backend: "This project does not include a backend, all content is static and managed via React components.",
  },
};

export default PortfolioProject;
