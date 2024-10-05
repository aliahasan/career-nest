import { NavLink } from "react-router-dom";

const RecruiterMenu = () => {
  const links = [
    { title: "Applications", path: "/user/dashboard/applications" },
    { title: "Post Job", path: "/user/dashboard/post-job" },
    { title: "My Posted Jobs", path: "/user/dashboard/posted-jobs" },
    { title: "My Companies", path: "/user/dashboard/companies" },
    { title: "Register Company", path: "/user/dashboard/register-company" },
  ];

  return (
    <div className="flex flex-col space-y-6">
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

export default RecruiterMenu;
