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
    <>
      <header className="bg-zinc-900/90 sticky z-10 top-0 backdrop-blur-md text-white shadow-2xl shadow-gray-900/60 border-b-orange-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to={!isBanned && ( !loggedIn ? "/" : role === "user" ? "/home" : "/admin")}>
            <div className="flex items-center space-x-3 cursor-pointer">
              <House className="w-8 h-8 text-orange-500" />
              <h1 className="hover:text-yellow-400/80 transition-all duration-500 ease-in-out text-4xl font-extrabold tracking-widest uppercase">
                Aureon <span className="text-orange-500">Store</span>
              </h1>
            </div>
          </Link>

          <nav className="flex items-center space-x-6">
            {role === "admin" && (
              <Link
                to="/admin"
                className="p-2 rounded-lg text-zinc-300 hover:text-orange-500 hover:bg-zinc-800
            transition-all duration-200"
              >
                <ShieldCheck className="text-orange-400" size={28} />
              </Link>
            )}
            {!isBanned && role === "admin" && (
              <Link
                to="/admin/orders"
                className="bg-orange-500/10 p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
                title="Manage Orders"
              >
                <ShoppingBag className="w-6 h-6 text-orange-500" />
              </Link>
            )}
            {loggedIn && (
              <button
                onClick={handleLogOut}
                className="bg-orange-500/10 px-4 py-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer flex items-center gap-2 text-orange-400 font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}
            {!isBanned && role === "user" && (
              <Link
                to={"/admin/orders"}
                className="bg-orange-500/10 p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
                title="My Orders"
              >
                <Package className="w-6 h-6 text-orange-500" />
              </Link>
            )}
            {!isBanned && role === "user" && (
              <Link
                to={"/cart"}
                className="relative bg-orange-500/10 p-3 rounded-xl hover:bg-orange-400/20 transition-all ease-in-out duration-300 border border-orange-400 shadow-lg cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6 text-orange-500" />

                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs leading-none text-white bg-red-400 rounded-md transform translate-x-1/2 -translate-y-1/2 min-w-[18px] ring-2 ring-gray-900">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
