import { motion } from "framer-motion";

export default function About({ theme }) {
  const isDark = theme === "dark";

  const aboutText = `Hi, I'm Sachin Chandra — a passionate MERN stack developer who loves building clean, scalable, and user-focused web applications. I enjoy turning complex ideas into simple, elegant solutions.`;

  const education = [
    {
      degree: "BCA",
      institution: "Amity University",
      year: "2024 – 2027",
    },
    {
      degree: "Diploma in Information Technology",
      institution: "Modi Training Institute",
      year: "2023 – 2024",
    },
  ];

  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "TailwindCSS",
    "HTML5",
    "CSS3",
    "Git",
  ];

  const certificates = [
    { name: "Fullstack Web Development", link: "#" },
    { name: "Advanced React", link: "#" },
  ];

  const cardStyle = `
    p-8 rounded-2xl shadow-lg transform transition
    hover:-translate-y-1 hover:scale-105
    ${isDark
      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 shadow-black/30"
      : "bg-white text-gray-900 shadow-gray-300"}
  `;

  return (
    <section
      className={`min-h-full px-6 py-6 ${
        isDark ? "bg-[#0f0f0f] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* ===== Hero ===== */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Me
          </span>
        </h1>
        <div className="mt-8 flex justify-center">
          <span className="w-24 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </motion.div>

      {/* ===== Content ===== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* About */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
          <p className="leading-relaxed opacity-80">{aboutText}</p>
        </motion.div>

        {/* Education */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <div className="space-y-5">
            {education.map((edu, i) => (
              <div key={i} className="relative pl-5 border-l border-blue-500">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm opacity-80">
                  {edu.institution} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold mb-6">Skills & Tools</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <span
                key={i}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition hover:scale-105 ${
                  isDark
                    ? "bg-blue-900/40 text-blue-300"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className={cardStyle}
        >
          <h2 className="text-2xl font-bold mb-6">Certificates</h2>
          <ul className="space-y-3">
            {certificates.map((cert, i) => (
              <li key={i}>
                <a
                  href={cert.link}
                  className="opacity-80 hover:text-blue-500 transition"
                >
                  {cert.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
