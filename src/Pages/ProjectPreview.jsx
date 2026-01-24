import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectPreview({ project, isDark, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`p-8 rounded-2xl shadow-lg transition cursor-pointer ${
        isDark
          ? "bg-gradient-to-r from-gray-900 to-gray-800 shadow-black/30"
          : "bg-white shadow-gray-300"
      }`}
      onClick={() => onSelect(project)}
    >
      {/* Project Title */}
      <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

      {/* Project Description */}
      <p className="opacity-80 mb-5">{project.description}</p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDark
                ? "bg-blue-900/40 text-blue-300"
                : "bg-blue-100 text-blue-700"
            } flex items-center gap-1`}
          >
            {tech.icon} {tech.name}
          </span>
        ))}
      </div>

      {/* Links */}
      <div
        className="flex gap-4"
        onClick={(e) => e.stopPropagation()} // prevent card click
      >
        {project.links?.github && (
          <a
            href={project.links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-semibold transition ${
              isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
            }`}
          >
            {project.links.github.icon} GitHub
          </a>
        )}

        {project.links?.live && (
          <a
            href={project.links.live.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-blue-500 hover:underline"
          >
            {project.links.live.icon} Live
          </a>
        )}
      </div>

      {/* Highlights / Features */}
      {project.details?.highlights && (
        <div className="mt-6 space-y-3">
          {project.details.highlights.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1">{item.icon}</div>
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm opacity-80">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
