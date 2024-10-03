import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const links = [
    { title: "Profile", path: "/user/dashboard/profile" },
    { title: "Applied Jobs", path: "/user/dashboard/applied-jobs" },
    { title: "Home", path: "/" },
  ];

  return (
    <div className="flex flex-col space-y-2">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-colors duration-300 ${
              isActive
                ? "bg-[#E6E9F8] text-black font-semibold"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
            }`
          }
        >
          {link.title}
        </NavLink>
      ))}
    </div>
  );
};

export default UserMenu;
