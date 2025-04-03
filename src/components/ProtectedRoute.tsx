
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/App";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresPlaid?: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiresPlaid = false, 
  redirectPath = "/login" 
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user has connected to Plaid if required
  const hasPlaidConnection = (): boolean => {
    if (!requiresPlaid) return true;
    return !!localStorage.getItem("plaid_access_token");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access this page");
      // Save the current path so we can redirect back after login
      navigate(redirectPath, { 
        state: { from: location.pathname + location.search + location.hash } 
      });
    } else if (requiresPlaid && !hasPlaidConnection()) {
      toast.warning("Please connect your bank account first");
      // Redirect to dashboard where they can connect their account
      navigate("/dashboard", {
        state: { 
          from: location.pathname,
          requiresPlaidConnection: true
        }
      });
    }
  }, [isAuthenticated, requiresPlaid, navigate, location, redirectPath]);

  return isAuthenticated && (!requiresPlaid || hasPlaidConnection()) ? <>{children}</> : null;
};

export default ProtectedRoute;
