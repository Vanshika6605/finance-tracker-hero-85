
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/App";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({ children, redirectPath = "/login" }: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access this page");
      // Save the current path so we can redirect back after login
      navigate(redirectPath, { 
        state: { from: location.pathname + location.search + location.hash } 
      });
    }
  }, [isAuthenticated, navigate, location, redirectPath]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
