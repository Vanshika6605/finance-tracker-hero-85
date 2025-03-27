
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "@/App";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = ({ className }: { className?: string }) => {
  const { isAuthenticated, setUser } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="mr-2 h-4 w-4" /> },
    { href: "/transactions", label: "Transactions", icon: <CreditCard className="mr-2 h-4 w-4" /> },
    { href: "/analytics", label: "Analytics", icon: <BarChart className="mr-2 h-4 w-4" /> },
    { href: "/profile", label: "Profile", icon: <User className="mr-2 h-4 w-4" /> },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 z-40 w-full glass backdrop-blur-md border-b border-slate-200/20",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">
                FinTrack
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-primary hover:bg-blue-50"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-primary"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-primary"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-primary text-white hover:bg-blue-600"
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden glass animate-fade-in border rounded-lg mt-2 mb-4 overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-primary hover:bg-blue-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-left flex items-center text-gray-600 hover:text-primary"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              ) : (
                <div className="grid gap-2 my-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Log in
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary text-white hover:bg-blue-600"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
