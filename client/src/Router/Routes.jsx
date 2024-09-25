import App from "@/App";
import About from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import Jobs from "@/pages/Jobs/Jobs";
import Login from "@/pages/Login/Login";
import NotFound from "@/pages/NotFound/NotFound";
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/jobs",
        element: <Jobs/>,
      }
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
]);

export default router;
