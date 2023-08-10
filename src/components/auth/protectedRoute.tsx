import { Navigate } from "react-router-dom";
import { loggedIn } from "./loginFunctions";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!loggedIn()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
