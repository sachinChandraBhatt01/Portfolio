import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioProject from "../data/PortfolioProject.jsx";
import VideoTubeProject from "../data/VideoTubeProject.jsx";

const tabs = ["overview", "frontend", "backend"];

const ProjectTabs = ({ title, isDark, onSelect }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const project =
    title === "VideoTube Website" ? VideoTubeProject : PortfolioProject;

  const cardStyle = `p-6 rounded-2xl shadow-lg transform transition
    hover:-translate-y-1 hover:scale-105 
    ${isDark ? "bg-gray-800 text-gray-100 shadow-black/30" : "bg-white text-gray-900 shadow-gray-300"}`;

  const sectionStyle = `min-h-screen px-6 py-8 ${
    isDark ? "bg-[#0f0f0f] text-gray-100" : "bg-gray-50 text-gray-900"
  }`;

  const tabActiveStyle = `border-b-2 border-blue-500 text-blue-500`;
  const tabInactiveStyle = `border-transparent text-gray-500 hover:text-gray-700`;

  const linkBtn = (bg, hoverBg) =>
    `px-5 py-2 rounded-lg font-semibold transition ${bg} text-white ${hoverBg}`;

  return (
    <section className={sectionStyle}>
      {/* Back Button */}
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-2 mb-6 font-semibold transition ${
          isDark
            ? "text-blue-400 hover:border-b-2 hover:border-white"
            : "text-blue-500 hover:border-b-2 hover:border-gray-900"
        }`}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Project Title */}
      <h1 className={`text-4xl md:text-5xl font-extrabold mb-4`}>
        {project.title}
      </h1>
      <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {project.description}
      </p>

      {/* Tabs */}
      <div
        className={`flex border-b mb-6 ${
          isDark ? "border-gray-600" : "border-gray-300"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 -mb-px font-semibold transition-all duration-300 ${
              activeTab === tab ? tabActiveStyle : tabInactiveStyle
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {project.details.overview.map((item, idx) => (
              <div
                key={idx}
                className={cardStyle + " flex items-center gap-4"}
              >
                <div className="text-2xl">{item.icon}</div>
                <p>{item.text}</p>
              </div>
            ))}
            <div
              className={`col-span-full mt-4 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {project.details.description}
            </div>
          </motion.div>
        )}

        {activeTab === "frontend" && (
          <motion.div
            key="frontend"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cardStyle + " whitespace-pre-line"}
          >
            {project.details.frontend}
          </motion.div>
        )}

        {activeTab === "backend" && (
          <motion.div
            key="backend"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cardStyle + " whitespace-pre-line"}
          >
            {project.details.backend}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links */}
      <div className="mt-8 flex flex-wrap gap-4">
        {project.links?.github && (
          <a
            href={project.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkBtn(
              isDark ? "bg-gray-700" : "bg-gray-800",
              isDark ? "hover:bg-gray-600" : "hover:bg-gray-700"
            )}
          >
            {project.links.github.icon} GitHub
          </a>
        )}
        {project.links?.live && (
          <a
            href={project.links.live.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkBtn(
              isDark ? "bg-blue-600" : "bg-blue-500",
              isDark ? "hover:bg-blue-500" : "hover:bg-blue-600"
            )}
          >
            {project.links.live.icon} Live Demo
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectTabs;
