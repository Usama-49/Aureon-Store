import { House, ShoppingCart, LogOut, ShieldCheck, Package, ShoppingBag } from "lucide-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { authContext } from "../Context/AuthContext";
import api from "../services/api/api";

export default function NavBar() {
  const { cartCount } = useContext(CartContext);
  const { loggedIn, setLoggedIn, role, setRole, isBanned } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await api.post("/auth/logout", {});
      setLoggedIn(false);
      setRole(null);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-zinc-900/90 sticky z-10 top-0 backdrop-blur-md text-white shadow-2xl shadow-gray-900/60 border-b border-orange-900/50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center max-w-full overflow-hidden">
        
        {/* Logo Section */}
        <Link to={!isBanned && (!loggedIn ? "/" : role === "user" ? "/home" : "/admin")}>
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0">
            <House className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 shrink-0" />
            <h1 className="hover:text-yellow-400/80 transition-all duration-500 ease-in-out text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
              Aureon <span className="text-orange-500">Store</span>
            </h1>
          </div>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center space-x-2 sm:space-x-4 shrink-0">
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
              to={"/admin/orders"}
              className="bg-orange-500/10 p-2 sm:p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
              title="My Orders"
            >
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </Link>
          )}

          {!isBanned && role === "user" && (
            <Link
              to={"/cart"}
              className="relative bg-orange-500/10 p-2 sm:p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
              title="Cart"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />

              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] sm:text-xs leading-none text-white bg-red-400 rounded-md transform translate-x-1/2 -translate-y-1/2 min-w-[16px] ring-2 ring-gray-900">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {loggedIn && (
            <button
              onClick={handleLogOut}
              className="bg-orange-500/10 p-2 sm:px-4 sm:py-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer flex items-center gap-2 text-orange-400 font-medium text-sm"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}