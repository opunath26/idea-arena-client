import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-10 py-10 text-gray-300">
      <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mx-auto px-5 max-w-6xl">
        
        {/* Brand */}
        <div>
          <h2 className="mb-3 font-bold text-white text-2xl"> <Logo></Logo> </h2>
          <p className="text-sm leading-6">
            A creative platform to generate, share & explore innovative ideas.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 font-semibold text-white text-xl">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Contests</li>
            <li className="hover:text-white cursor-pointer">Leaderboard</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-3 font-semibold text-white text-xl">Follow Us</h3>
          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>

      <div className="mt-8 pt-4 border-gray-700 border-t text-sm text-center">
        © {new Date().getFullYear()} Idea Arena — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
