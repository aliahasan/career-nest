import App from "@/App";
import DashLayout from "@/DashLayout/DashLayout";
import AppliedJobs from "@/DashLayout/DashPage/AppliedJobs";
import Dashboard from "@/DashLayout/DashPage/Dashboard";
import Profile from "@/DashLayout/DashPage/Profile";
import About from "@/pages/About/About";
import Browse from "@/pages/Browse/Browse";
import Home from "@/pages/Home/Home";
import JobDetails from "@/pages/Jobs/JobDetails";
import Jobs from "@/pages/Jobs/Jobs";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
import Register from "@/pages/Register/Register";
import PrivateRoutes from "@/PriveRoutes/PrivateRoutes";
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
      {
        path: "/job-details/:id",
        element: <JobDetails />,
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
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <Profile />,
          </PrivateRoutes>
        ),
      },
      {
        path: "applied-jobs",
        element: <AppliedJobs />,
      },
    ],
  },
]);

export default router;
