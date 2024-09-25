import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import DashNav from "./DashNav";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = false;
  const links = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Jobs", path: "/jobs" },
    { title: "Dashboard", path: "/dashboard" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (location.pathname.includes("/dashboard")) {
    return <DashNav />;
  }

  // User avatar or login button
  const UserSection = () => {
    return user ? (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Jon Doe</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>John Doe</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user?.name}</h3>
              <p className="text-sm text-gray-500">user@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="link" className="justify-start" asChild>
              <Link to="/profile">
                <User2 className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </Button>
            <Button
              variant="link"
              className="justify-start text-red-500 hover:text-red-800"
            >
              <LogOut className="mr-2 h-4 w-4 " />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    ) : (
      <Link
        to="/login"
        className="text-gray-900  mr-3 bg-sky-500 py-2 px-4 rounded"
      >
        Login
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 bg-white/60 backdrop-blur-md border-b left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md border-b" // Glassmorphism effect on scroll
          : "bg-white/20 backdrop-blur-none" // Transparent when at the top
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 md:py-1 px-4">
        {/* Logo section */}
        <h6 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          CareerNest
        </h6>

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden flex items-center">
          <UserSection /> {/* Show user section on mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none ml-2"
          >
            {isOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>
        </div>

        {/* Links section */}
        <ul
          className={`md:flex items-center gap-x-10 absolute md:static left-0 w-full md:w-auto  flex-col md:flex-row transition-all duration-500 ease-in-out ${
            isOpen ? "top-16 bg-gray-100" : "top-[-490px] md:top-auto"
          }`}
        >
          {links.map((link, index) => (
            <li key={index} className="text-center py-4">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 underline-offset-4 underline"
                    : "text-black hover:underline hover:underline-offset-4 transition-all duration-500 ease-in-out"
                }
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
          {/* User avatar and login button for desktop */}
          <li className="hidden md:block">
            <UserSection />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
