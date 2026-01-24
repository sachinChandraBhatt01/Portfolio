import { 
  FaVideo, 
  FaSearch, 
  FaUserCircle, 
  FaHeart, 
  FaRegThumbsDown, 
  FaPlayCircle, 
  FaListAlt, 
  FaComment, 
  FaChartLine, 
  FaCloudUploadAlt, 
  FaGithub, 
  FaExternalLinkAlt 
} from "react-icons/fa";
import { SiReact, SiTailwindcss, SiRedux } from "react-icons/si";

const VideoTubeProject = {
  title: "VideoTube Website",
  description: "Content uploading and watching platform like YouTube with videos, shorts, playlists, community posts, search, and subscriptions.",
  
  tech: [
    { name: "React", icon: <SiReact className="text-blue-500" /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-teal-500" /> },
    { name: "Redux Toolkit", icon: <SiRedux className="text-purple-500" /> },
    { name: "React Router DOM", icon: <FaVideo className="text-red-500" /> },
    { name: "React Charts", icon: <FaChartLine className="text-teal-500" /> },
    { name: "Node.js", icon: <FaPlayCircle className="text-green-500" /> },
    { name: "Express", icon: <FaPlayCircle className="text-gray-500" /> },
    { name: "MongoDB", icon: <FaCloudUploadAlt className="text-green-700" /> },
    { name: "Cloudinary", icon: <FaCloudUploadAlt className="text-blue-500" /> },
    { name: "JWT", icon: <FaUserCircle className="text-yellow-500" /> },
  ],

  links: {
    github: { url: "https://github.com/yourusername/youtube-clone", icon: <FaGithub /> },
    live: { url: "https://youtube-clone.render.com", icon: <FaExternalLinkAlt /> },
  },

  details: {
    overview: [
      { icon: <FaVideo className="text-red-500" />, text: "Watch videos and shorts with full playback functionality." },
      { icon: <FaSearch className="text-green-500" />, text: "Search for videos, channels, playlists, and community posts." },
      { icon: <FaUserCircle className="text-blue-500" />, text: "User authentication with Google OAuth and secure account management." },
      { icon: <FaHeart className="text-pink-500" />, text: "Like/dislike videos, comment, reply, and subscribe to channels." },
      { icon: <FaPlayCircle className="text-purple-500" />, text: "Create your own videos, shorts, playlists, and community posts." },
      { icon: <FaListAlt className="text-yellow-500" />, text: "Organize content with playlists and manage your own channel." },
      { icon: <FaComment className="text-orange-500" />, text: "Community engagement through posts, comments, and replies." },
      { icon: <FaChartLine className="text-teal-500" />, text: "Analytics & business logic: earn ₹50 on 1000 video views, ₹50 on 10000 short views." },
      { icon: <FaCloudUploadAlt className="text-gray-500" />, text: "Upload videos and shorts with backend handled via Node.js, Express, MongoDB, Cloudinary, and JWT auth." },
    ],

    description:
      "This is a full-featured YouTube Clone designed for learning, portfolio showcase, and demonstrating MERN stack skills. Features include searching, subscribing, watching videos and shorts, creating playlists and community posts, channel analytics, business logic rewards, and personalized recommendations based on watch history and subscriptions.",

    frontend:
      "Frontend built with React, TailwindCSS, React Router DOM, Redux Toolkit, and React Charts. The architecture uses a components-and-pages structure, with Redux handling state management across the app. Routing is fully implemented using React Router DOM for a multi-page experience. Features like search, authentication, video playback, playlists, community posts, analytics charts, and dynamic recommendations are fully interactive and responsive, with smooth animations enhancing the UX.",

    backend:
      "Backend built with Node.js, Express, MongoDB, CORS, Cloudinary for media storage, Google OAuth for authentication, Multer for file uploads, JWT for secure sessions, bcrypt for password hashing, and cookie-parser. Implements all features such as subscriptions, likes/dislikes, comments, replies, playlist management, video analytics, and business reward logic for creators.",
  },
};

export default VideoTubeProject;
