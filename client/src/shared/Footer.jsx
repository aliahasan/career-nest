import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold  bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-center md:text-start">CareerNest</h2>
            <p className="text-sm mt-2">123 Career Street, Dhaka, Bangladesh</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-green-400 transition-colors duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-green-400 transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} CareerNest. all rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;