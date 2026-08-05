import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter, FaLightbulb, FaCamera, FaCode, FaRocket, FaTrophy, FaBrain } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  const floatingElements = [
    { icon: <FaLightbulb />, label: "Idea", top: "8%", left: "4%", delay: 0 },
    { icon: <FaTrophy />, label: "Contest", top: "8%", right: "8%", delay: 1.2 },
    { icon: <FaCamera />, label: "Media", top: "45%", left: "38%", delay: 2.4 },
    { icon: <FaCode />, label: "Software", bottom: "18%", left: "5%", delay: 3.6 },
    { icon: <FaRocket />, label: "Launch", bottom: "18%", right: "5%", delay: 1.8 },
    { icon: <FaBrain />, label: "Innovation", top: "48%", right: "32%", delay: 3.0 },
  ];

  return (
    <footer className="relative bg-gray-950 mt-12 sm:mt-20 pt-8 sm:pt-10 pb-6 sm:pb-8 overflow-hidden text-gray-300">
      
      {/* Background Glow Effects */}
      <div className="top-1/2 left-1/4 -z-10 absolute bg-purple-600/20 blur-[100px] sm:blur-[130px] rounded-full w-64 sm:w-96 h-64 sm:h-96 -translate-y-1/2 pointer-events-none" />
      <div className="top-1/2 right-1/4 -z-10 absolute bg-indigo-600/15 blur-[100px] sm:blur-[130px] rounded-full w-64 sm:w-96 h-64 sm:h-96 -translate-y-1/2 pointer-events-none" />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative bg-gray-900/60 shadow-2xl shadow-purple-950/40 backdrop-blur-xl p-5 sm:p-8 md:p-12 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          
          {/* Mobile Badge Container (Shown only on small screens to prevent overlap) */}
          <div className="md:hidden flex flex-wrap justify-center gap-2 mb-6">
            {floatingElements.map((item, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 bg-purple-950/60 backdrop-blur-md px-2.5 py-1 border border-purple-400/30 rounded-full text-purple-200 text-[10px] sm:text-xs"
              >
                <span className="text-purple-300">{item.icon}</span>
                <span className="font-semibold tracking-wide">{item.label}</span>
              </span>
            ))}
          </div>

          {/* Desktop Absolute Floating Elements (Hidden on mobile) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {floatingElements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.3, scale: 0.85 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.85, 1.05, 0.85],
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: item.delay,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: item.top,
                  left: item.left,
                  right: item.right,
                  bottom: item.bottom
                }}
                className="z-20 flex items-center gap-2 bg-purple-950/70 shadow-[0_0_15px_rgba(168,85,247,0.5)] backdrop-blur-md px-3 py-1.5 border border-purple-400/40 rounded-full text-purple-200 text-xs"
              >
                <span className="text-purple-300 text-sm">{item.icon}</span>
                <span className="font-semibold tracking-wide">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Main Footer Layout */}
          <div className="z-10 relative gap-8 sm:gap-10 lg:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
            
            {/* Brand Section */}
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-5">
              <div className="inline-block">
                <Logo isFooter={true} />
              </div>
              <p className="max-w-sm text-gray-400 text-xs sm:text-sm leading-relaxed">
                A creative platform to generate, share & explore innovative ideas. Bring your vision to life and compete with top creators worldwide!
              </p>
            </div>

            {/* Quick Links */}
            <div className="sm:col-span-1 lg:col-span-3">
              <h3 className="inline-block relative font-bold text-white text-sm sm:text-base uppercase tracking-wider">
                Quick Links
                <span className="bottom-[-6px] left-0 absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-8 h-[3px]"></span>
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 mt-4 sm:mt-6 text-xs sm:text-sm">
                {[
                  { name: "Home", href: "/" },
                  { name: "Contests", href: "/all-contests" },
                  { name: "Leaderboard", href: "/leaderboard" },
                  { name: "About Us", href: "/about" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-gray-400 hover:text-purple-300 transition-all hover:translate-x-1.5 duration-300 transform"
                    >
                      <span className="bg-purple-500 opacity-0 group-hover:opacity-100 rounded-full w-1.5 h-1.5 transition-opacity"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Community Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <h3 className="inline-block relative font-bold text-white text-sm sm:text-base uppercase tracking-wider">
                Follow Community
                <span className="bottom-[-6px] left-0 absolute bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full w-8 h-[3px]"></span>
              </h3>
              <p className="mt-4 sm:mt-6 mb-4 sm:mb-5 text-gray-400 text-xs sm:text-sm">
                Stay connected and get updated with our latest challenges and events.
              </p>
              
              {/* Glassmorphic Social Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {[
                  { icon: <FaFacebookF />, url: "#", hover: "hover:bg-blue-600 hover:shadow-blue-500/40" },
                  { icon: <FaGithub />, url: "#", hover: "hover:bg-gray-800 hover:shadow-purple-500/30" },
                  { icon: <FaLinkedinIn />, url: "#", hover: "hover:bg-blue-500 hover:shadow-blue-400/40" },
                  { icon: <FaTwitter />, url: "#", hover: "hover:bg-sky-500 hover:shadow-sky-400/40" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 ${social.hover} hover:text-white hover:border-transparent transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="z-10 relative flex sm:flex-row flex-col justify-between items-center gap-3 mt-8 sm:mt-10 pt-5 sm:pt-6 border-white/10 border-t text-[11px] sm:text-xs text-gray-400 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} <span className="font-semibold text-purple-400">IdeaArena</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-gray-400">
              <a href="#" className="hover:text-purple-300 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-purple-300 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;