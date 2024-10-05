import App from "@/App";
import Applications from "@/DashLayout/DashPage/Applications";
import DashLayout from "@/DashLayout/DashLayout";
import AppliedJobs from "@/DashLayout/DashPage/AppliedJobs";
import Dashboard from "@/DashLayout/DashPage/Dashboard";
import Profile from "@/DashLayout/DashPage/Profile";
import RegisterCompany from "@/DashLayout/DashPage/RegisterCompany";
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
import PostJob from "@/DashLayout/DashPage/PostJob";
import Companies from "@/DashLayout/DashPage/Companies";
import GetRecruitersJobs from "@/DashLayout/DashPage/GetRecruitersJobs";

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
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "register-company",
        element: <RegisterCompany />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "posted-jobs",
        element: <GetRecruitersJobs />,
      },
    ],
  },
]);

export default router;
