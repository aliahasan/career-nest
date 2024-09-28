import App from "@/App";
import DashLayout from "@/DashLayout/DashLayout";

import About from "@/pages/About/About";
import Browse from "@/pages/Browse/Browse";
import Home from "@/pages/Home/Home";
import Jobs from "@/pages/Jobs/Jobs";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Profile from "@/pages/Profile/Profile";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/user/dashboard",
    element: <DashLayout />,
    children:[
      {
        path: "/user/dashboard/profile",
        element:<Profile />
      },
    ]
  },
]);

export default router;
