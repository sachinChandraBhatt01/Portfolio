import { motion } from "framer-motion";

export default function Home({
  theme,
  setActivePage,
  openPages,
  setOpenPages,
}) {
  const isDark = theme === "dark";

  const openPage = (pageKey) => {
    if (!openPages.includes(pageKey)) setOpenPages([...openPages, pageKey]);
    setActivePage(pageKey);
  };

  // Hero text split by words
  const heroText = "Hi, I'm Sachin Chandra".split(" ");

  // Animation variants for words
  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 120 },
    }),
  };

  // Animation variants for buttons
  const buttonVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 1.5 + i * 0.2, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center
        w-full h-full px-6 sm:px-12
        overflow-hidden scrollbar-hide
        text-center
        ${isDark ? "bg-[#1e1e1e]" : "bg-[#f3f3f3]"}
      `}
    >
      {/* Background floating circles */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-64 h-64 rounded-full bg-purple-400 opacity-10 top-16 left-20 pointer-events-none blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-80 h-80 rounded-full bg-blue-400 opacity-10 bottom-20 right-24 pointer-events-none blur-3xl"
      />

      {/* Hero Text */}
      <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 flex flex-wrap justify-center gap-4">
        {heroText.map((word, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={wordVariant}
            className="flex gap-1"
          >
            {word.split("").map((letter, i) => (
              <motion.span
                key={i}
                className={`
                  relative cursor-default
                  transition-all duration-300
                  ${isDark ? "text-white hover:[-webkit-text-stroke:1px_white]" : "text-black hover:[-webkit-text-stroke:1px_black]"}
                  hover:text-transparent
                  
                  [text-stroke:1px_white]
                `}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className={`text-xl sm:text-2xl md:text-3xl font-semibold mb-6 ${
          isDark ? "text-blue-400" : "text-blue-700"
        }`}
      >
        MERN Stack Developer
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={`max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed mb-10 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        I build fast, scalable, and modern web applications using React,
        Node.js, and MongoDB. Clean code, beautiful UI, and seamless user
        experiences are my focus.
      </motion.p>

      {/* Buttons */}
      <div className="flex gap-6 flex-wrap justify-center">
        <motion.button
          initial="hidden"
          animate="visible"
          custom={0}
          variants={buttonVariant}
          whileHover={{
            scale: 1.15,
            rotate: -2,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.35)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openPage("projects")}
          className={`
            px-8 py-4 rounded-full font-semibold
            ${isDark ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg" : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg"}
            transition-all duration-300 cursor-pointer
          `}
        >
          View Projects
        </motion.button>

        <motion.button
          initial="hidden"
          animate="visible"
          custom={1}
          variants={buttonVariant}
          whileHover={{
            scale: 1.15,
            rotate: 2,
            boxShadow: "0px 10px 25px rgba(0,0,0,0.35)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openPage("contact")}
          className={`
            px-8 py-4 rounded-full font-semibold border-2 border-blue-500
            ${isDark ? "text-blue-400 hover:bg-blue-700 hover:text-white shadow-lg" : "text-blue-700 hover:bg-blue-100 shadow-lg"}
            transition-all duration-300 cursor-pointer
          `}
        >
          Contact Me
        </motion.button>
      </div>
    </div>
  );
}
