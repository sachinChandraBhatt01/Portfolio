import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectPreview from "./ProjectPreview";
import ProjectTabs from "./ProjectTabs";

import PortfolioProject from "../data/PortfolioProject.jsx"; // import your data
import VideoTubeProject from "../data/VideoTubeProject.jsx";

export default function Projects({ theme }) {
  const isDark = theme === "dark";
  const [selectedProject, setSelectedProject] = useState(null);
  console.log(selectedProject);
  const projects = [
   PortfolioProject,
   VideoTubeProject
  ];

  console.log(projects);

  return (
    <section
      className={`min-h-full px-6 py-6 ${
        isDark ? "bg-[#0f0f0f] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ===== Heading Section ===== */}
      {selectedProject ? null : (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>{" "}
            I’ve Built
          </h1>

          {/* Accent Line */}
          <div className="mt-8 flex justify-center">
            <span className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </motion.div>
      )}

      {/* ===== Content Section ===== */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedProject ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              {projects.map((project, i) => (
                <ProjectPreview
                project={project}
                  key={i}
                  isDark={isDark}
                  onSelect={setSelectedProject}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* <ProjectDetails
                project={selectedProject}
                isDark={isDark}
                onBack={() => setSelectedProject(null)}
              /> */}
              <ProjectTabs isDark={isDark} onSelect={setSelectedProject} title={selectedProject.title} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
