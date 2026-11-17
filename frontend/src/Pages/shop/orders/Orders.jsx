import {
  ChevronLeft,
  Package,
  Clock3,
  CircleCheckBig,
  CircleX,
  CreditCard,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
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
    <main className="min-h-screen bg-gray-950 px-4 md:px-8 py-8">
      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8 shadow-xl">
        {/* Back */}
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium text-sm group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Store</span>
        </Link>

        {/* Title */}
        <div className="mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Package className="text-orange-400" size={36} />
            My Orders
          </h1>

          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Track your purchases and monitor every order you've placed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-orange-500 transition-all">
            <Package className="text-orange-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.totalOrders}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium">Total Orders</p>
          </div>

          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-yellow-500 transition-all">
            <Clock3 className="text-yellow-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.pending}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium">Pending</p>
          </div>

          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-green-500 transition-all">
            <CircleCheckBig className="text-green-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.delivered}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium">Delivered</p>
          </div>

          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-5 hover:border-red-500 transition-all">
            <CircleX className="text-red-400 mb-4" size={28} />
            <h2 className="text-3xl font-bold text-white">{stats.cancelled}</h2>
            <p className="text-gray-400 mt-1 text-sm font-medium">Cancelled</p>
          </div>
        </div>

        {/* Total Spent */}
        <div className="mt-6 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent border border-orange-500/20 rounded-xl px-6 py-5 flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
            <CreditCard size={28} />
          </div>

          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Total Spent
            </p>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-orange-400 text-xs sm:text-sm font-semibold tracking-wide">
                PKR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{stats.totalSpent}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORDERS ================= */}
      <section className="max-w-7xl mx-auto mt-8">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-xl font-bold text-white">Order History</h2>
          <span className="text-sm text-gray-400 font-medium">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-12 text-center shadow-xl">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-400 border border-orange-500/20">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No orders placed yet</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">
              When you place orders, they will appear here so you can track their fulfillment
              status.
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              return (
                <Link key={order._id} to={`/orders/${order._id}`} className="block group">
                  <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                    <OrderCard order={order} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
