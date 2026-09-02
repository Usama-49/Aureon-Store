import { Package, Users, ShoppingCart, Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import api from "../../services/api/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, usersRes] = await Promise.all([
          api.get("/admin/totalProducts"),
          api.get("/admin/totalUsers"),
        ]);

        setTotalProducts(productsRes.data.total);
        setTotalUsers(usersRes.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 text-zinc-100">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Admin <span className="text-orange-500">Dashboard</span>
        </h1>
        <p className="text-zinc-400 mt-2">Manage products, users, orders and store settings.</p>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition">
          <Package className="text-orange-500 mb-4" size={30} />
          <h3 className="text-zinc-400 text-sm">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{totalProducts}</p>
        </div>

        <Link to={"/admin/users"}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition">
            <Users className="text-orange-500 mb-4" size={30} />
            <h3 className="text-zinc-400 text-sm">Total Users</h3>
            <p className="text-3xl font-bold mt-2">{totalUsers}</p>
          </div>
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition">
          <ShoppingCart className="text-orange-500 mb-4" size={30} />
          <h3 className="text-zinc-400 text-sm">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500 transition">
          <Settings className="text-orange-500 mb-4" size={30} />
          <h3 className="text-zinc-400 text-sm">Store Status</h3>
          <p className="text-xl font-semibold mt-2 text-green-500">Active</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-5">
          Quick <span className="text-orange-500">Actions</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <button
            onClick={() => {
              navigate("/admin/addlisting");
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-orange-500 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <Plus size={28} className="text-orange-500" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Add Product</h3>
              <p className="text-zinc-400 text-sm">Create a new product listing.</p>
            </div>
          </button>

          <button
            onClick={() => {
              navigate("/home");
            }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-4 hover:border-orange-500 hover:-translate-y-1 transition-all cursor-pointer"
          >
            <Package size={28} className="text-orange-500" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Manage Products</h3>
              <p className="text-zinc-400 text-sm">Edit or remove existing products.</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-2xl font-bold mb-5">
          Recent <span className="text-orange-500">Activity</span>
        </h2>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
          <p className="text-zinc-500">No recent activity available.</p>
        </div>
      </div>
    </div>
  );
}
