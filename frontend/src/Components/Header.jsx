import {
  House,
  ShoppingCart,
  LogOut,
  ShieldCheck,
  Package,
  ShoppingBag,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { authContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import api from "../services/api/api";
import ConfirmModal from "./ConfirmModal";

export default function Header({ restricted = false }) {
  const { cartCount } = useContext(CartContext);
  const { loggedIn, setLoggedIn, role, setRole, isBanned } = useContext(authContext);
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      await api.post("/auth/logout", {});
      setLoggedIn(false);
      setRole(null);
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to log out");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleCartClick = (e) => {
    if (!loggedIn) {
      e.preventDefault();
      toast.warn("Plz login first");
      navigate("/login");
    }
  };

  // Logo block — rendered inside a <Link> in normal mode,
  // as an inert <div> in restricted mode so banned/unverified
  // users can't navigate away via the logo.
  const logo = (
    <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
      <House className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 shrink-0" />
      <h1 className="hover:text-yellow-400/80 transition-all duration-500 ease-in-out text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
        Aureon <span className="text-orange-500">Store</span>
      </h1>
    </div>
  );

  return (
    <header className="bg-zinc-900/90 sticky z-10 top-0 backdrop-blur-md text-white shadow-2xl shadow-gray-900/60 border-b border-orange-900/50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center max-w-full overflow-hidden">
        {/* Logo Section */}
        {restricted ? (
          <div>{logo}</div>
        ) : (
          <Link to={!loggedIn ? "/" : role === "user" ? "/home" : "/admin"}>
            <div className="cursor-pointer">{logo}</div>
          </Link>
        )}

        {/* Navigation Actions */}
        <nav className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          {/* ─── Full nav — hidden when restricted ─────────────────── */}
          {!restricted && (
            <>
              {role === "admin" && (
                <Link
                  to="/admin"
                  className="p-2 rounded-lg text-zinc-300 hover:text-orange-500 hover:bg-zinc-800 transition-all duration-200"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="text-orange-400 w-6 h-6 sm:w-7 sm:h-7" />
                </Link>
              )}

              {!isBanned && role === "admin" && (
                <Link
                  to="/admin/orders"
                  className="bg-orange-500/10 p-2 sm:p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
                  title="Manage Orders"
                >
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </Link>
              )}

              {!isBanned && role === "user" && (
                <Link
                  to={"/orders"}
                  className="bg-orange-500/10 p-2 sm:p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
                  title="My Orders"
                >
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                </Link>
              )}

              {!isBanned && role !== "admin" && (
                <Link
                  to={"/cart"}
                  onClick={handleCartClick}
                  className="relative bg-orange-500/10 p-2 sm:p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
                  title="Cart"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />

                  {cartCount > 0 && loggedIn && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs leading-none text-white bg-red-400 rounded-md transform translate-x-1/2 -translate-y-1/2 min-w-[16px] ring-2 ring-gray-900">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
            </>
          )}

          {/* ─── Right-side actions ────────────────────────────────── */}
          {restricted ? (
            /* Restricted mode → Logout ONLY */
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="bg-orange-500/10 p-2 sm:px-4 sm:py-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer flex items-center gap-2 text-orange-400 font-medium text-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : loggedIn ? (
            /* Logged-in (verified) user → Logout */
            <button
              type="button"
              onClick={() => setShowLogoutModal(true)}
              className="bg-orange-500/10 p-2 sm:px-4 sm:py-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer flex items-center gap-2 text-orange-400 font-medium text-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            /* Guest → Login + Sign Up */
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="bg-orange-500/10 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer flex items-center gap-1.5 text-orange-400 font-medium text-sm"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
              <Link
                to="/signup"
                className="bg-orange-500 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl hover:bg-orange-600 transition-all ease-in-out duration-300 shadow-lg cursor-pointer flex items-center gap-1.5 text-white font-medium text-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>
            </div>
          )}
        </nav>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogOut}
        isConfirming={isLoggingOut}
      />
    </header>
  );
}
