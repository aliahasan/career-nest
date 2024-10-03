import { X } from "lucide-react";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "./DashPage/UserMenu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar for mobile devices */}
      <div className="bg-white shadow-md flex justify-between md:hidden sticky top-0 left-0 z-20 p-4">
        <div className="block cursor-pointer font-bold">
          <Link to="/">
            <h6 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              CareerNest
            </h6>
          </Link>
        </div>

        <button onClick={handleToggle} className="p-2 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-50 w-64 h-screen z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header and Close Button */}
        <div className="flex justify-end md:hidden p-4">
          <button
            onClick={handleToggle}
            className="text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar content: make scrollable */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {/* {Array.from({ length: 5 }).map((_, idx) => (
              <li key={idx} className="p-2 bg-white shadow-sm rounded-md cursor-pointer">
                Menu Item {idx + 1}
              </li>
            ))} */}
          {user && user?.role === "student" && <UserMenu />}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
