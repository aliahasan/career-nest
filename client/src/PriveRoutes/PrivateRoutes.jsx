import Loading from "@/myComponents/Loading";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoutes;
