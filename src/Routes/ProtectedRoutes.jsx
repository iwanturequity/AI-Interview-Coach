import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { User, fetchedUser } = useAuth();

  if (fetchedUser) return null;

  return User ? children : <Navigate to="/Login" />;
};

export default ProtectedRoute;
