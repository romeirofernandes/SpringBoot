import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#15151e] text-white py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="text-sm">© {currentYear} F1 Race Explorer</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com/f1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e10600]"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/f1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e10600]"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/f1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e10600]"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
