import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact({ theme }) {
  const isDark = theme === "dark";
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const contactDetails = [
    { type: "Email", value: "sachin51565@gmail.com", icon: <FaEnvelope /> },
    { type: "Phone", value: "+91 8178464397", icon: <FaPhoneAlt /> },
    { type: "Location", value: "New Delhi, India", icon: <FaMapMarkerAlt /> },
    { type: "LinkedIn", value: "linkedin.com/in/sachinchandra", icon: <FaLinkedin /> },
    { type: "GitHub", value: "github.com/sachinChandraBhatt01", icon: <FaGithub /> },
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // replace with your EmailJS service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // replace with your EmailJS template ID
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setMessageSent(true);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <section
      className={`min-h-screen px-6 py-12 ${
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
          Contact{" "}
          <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Me
          </span>
        </h1>
        <div className="mt-8 flex justify-center">
          <span className="w-24 h-1 rounded-full bg-linear-to-r from-blue-500 to-purple-500" />
        </div>
      </motion.div>

      {/* ===== Content ===== */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Left: Contact Details */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
          className="space-y-6"
        >
          {contactDetails.map((contact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`flex items-center p-6 rounded-2xl shadow-lg transform transition hover:-translate-y-1 hover:scale-105 ${
                isDark
                  ? "bg-linear-to-r from-gray-900 to-gray-800 text-gray-100 shadow-black/30"
                  : "bg-white text-gray-900 shadow-gray-300"
              }`}
            >
              <div className={`text-3xl mr-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                {contact.icon}
              </div>
              <div className="wrap-break-word">
                <p className="font-semibold">{contact.type}</p>
                <p className="opacity-80">{contact.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
          className={`p-8 rounded-2xl shadow-lg ${
            isDark ? "bg-[#1e1e1e] shadow-black/30" : "bg-white shadow-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className={`w-full p-3 rounded-md border resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-700 text-gray-100 placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {messageSent && (
            <p className="mt-4 text-green-500 font-semibold">
              Your message has been sent successfully!
            </p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
