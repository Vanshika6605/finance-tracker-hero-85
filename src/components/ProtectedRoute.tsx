
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/App";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access this page");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
