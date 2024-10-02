import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { DashboardIcon } from "@radix-ui/react-icons";
import { setUser } from "@/redux/authSlice";
import { secureApi } from "@/hooks/useSecureApi";

const Navbar = () => {
  const links = [
    { title: "Home", path: "/" },
    { title: "Jobs", path: "/jobs" },
    { title: "Browse", path: "/browse" },
    { title: "About", path: "/about" },
  ];
  // const location = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const response = await secureApi.post("/user/logout");
      if (response.data.success) {
        dispatch(setUser(null));
        toast.success("logout successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.message || "logout failed");
    }
  };
  // User avatar or login button
  const UserSection = () => {
    return user ? (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer w-8 h-8">
            <AvatarImage src={user?.photoURL} />
            <AvatarFallback>Jon Doe</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback>John Doe</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">
                {user?.displayName || user?.fullName}
              </h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button variant="link" className="justify-start" asChild>
              <Link to="/user/dashboard/profile">
                <DashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="link"
              className="justify-start text-red-500 hover:text-red-800"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4 " />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    ) : (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 bg-white/60 backdrop-blur-md border-b left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/60 backdrop-blur-md border-b"
          : "bg-white/20 backdrop-blur-none"
      }`}
    >
      <div className="flex items-center justify-between py-4 md:py-1 px-2">
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
          className={`md:flex items-center gap-x-10 absolute md:static left-0 w-full md:w-auto  flex-col md:flex-row transition-all duration-500 ease-in-out  ${
            isOpen
              ? "top-16 bg-gray-50 text-[#262D3E] shadow-sm"
              : "top-[-490px] md:top-auto"
          }`}
        >
          {links.map((link, index) => (
            <li key={index} className="text-center py-4 ">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-green-500 underline-offset-4 underline"
                    : "text-[#6B7280] hover:underline hover:underline-offset-4 transition-all duration-500 ease-in-out"
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
