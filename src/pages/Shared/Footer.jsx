import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black mt-16 pt-16 pb-8 overflow-hidden text-gray-300">
      {/* Background Decorative Glow (Optional Subtle Design) */}
      <div className="top-0 left-1/2 -z-10 absolute bg-blue-600/10 blur-3xl rounded-full w-96 h-96 -translate-x-1/2 pointer-events-none"></div>

      <div className="gap-10 grid grid-cols-1 md:grid-cols-3 mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="inline-block hover:scale-105 transition-transform duration-300">
            <Logo isFooter={true} />
          </div>
          <p className="max-w-sm text-gray-400 text-sm leading-relaxed">
            A creative platform to generate, share & explore innovative ideas. Bring your vision to life with us!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="relative font-semibold text-white text-lg uppercase tracking-wider">
            Quick Links
            <span className="bottom-[-6px] left-0 absolute bg-blue-500 rounded-full w-10 h-[2px]"></span>
          </h3>
          <ul className="space-y-2.5 mt-4 text-sm">
            {["Home", "Contests", "Leaderboard", "About Us"].map((link, idx) => (
              <li key={idx}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "")}`}
                  className="inline-block hover:text-blue-400 transition-all hover:translate-x-2 duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Connect Section */}
        <div>
          <h3 className="relative font-semibold text-white text-lg uppercase tracking-wider">
            Follow Us
            <span className="bottom-[-6px] left-0 absolute bg-blue-500 rounded-full w-10 h-[2px]"></span>
          </h3>
          <p className="mt-4 mb-4 text-gray-400 text-sm">
            Stay connected with our creative community.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF />, url: "#", color: "hover:bg-blue-600" },
              { icon: <FaGithub />, url: "#", color: "hover:bg-gray-700" },
              { icon: <FaLinkedinIn />, url: "#", color: "hover:bg-blue-500" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 ${social.color} hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-12 pt-6 border-gray-800/80 border-t text-gray-500 text-xs text-center">
        <p>
          © {new Date().getFullYear()} <span className="font-medium text-gray-300">Idea Arena</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;