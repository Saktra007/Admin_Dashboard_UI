import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoadingScreen } from "../ui";

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
