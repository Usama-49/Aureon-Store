import { ChevronLeft, Package, Clock3, CircleCheckBig, CircleX, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../Components/Loading";
import api from "../../../services/api/api";

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pending: 0,
    cancelled: 0,
    delivered: 0,
    totalSpent: 0,
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [statsRes, ordersRes] = await Promise.all([
          api.get("/order/stats"),
          api.get("/order"),
        ]);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="min-h-screen bg-zinc-800 px-4 md:px-8 py-8">
      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8 shadow-xl">
        {/* Back */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
        >
          <ChevronLeft size={22} />
          <span className="font-medium">Back to Store</span>
        </Link>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Package className="text-orange-500" size={36} />
            My Orders
          </h1>

          <p className="text-gray-400 mt-2">
            Track your purchases and monitor every order you've placed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-orange-500 transition-all">
            <Package className="text-orange-500 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.totalOrders}</h2>
            <p className="text-gray-400 mt-1">Total Orders</p>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-yellow-500 transition-all">
            <Clock3 className="text-yellow-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.pending}</h2>
            <p className="text-gray-400 mt-1">Pending</p>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-green-500 transition-all">
            <CircleCheckBig className="text-green-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.delivered}</h2>
            <p className="text-gray-400 mt-1">Delivered</p>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 hover:border-red-500 transition-all">
            <CircleX className="text-red-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.cancelled}</h2>
            <p className="text-gray-400 mt-1">Cancelled</p>
          </div>
        </div>

        {/* Total Spent */}
        <div className="mt-8 bg-linear-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl px-6 py-5 flex items-center gap-4">
          <DollarSign className="text-orange-500" size={34} />

          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Total Spent</p>

            <h2 className="text-4xl font-bold text-orange-500">${stats.totalSpent}</h2>
          </div>
        </div>
      </section>

      {/* ================= ORDERS ================= */}

      <section className="space-y-6 max-w-7xl mx-auto mt-10">
        {orders.map((order) => {
          return (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <OrderCard order={order} />
            </Link>
          );
        })}
      </section>
    </main>
  );
}
