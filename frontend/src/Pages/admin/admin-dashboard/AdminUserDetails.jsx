import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ShoppingBag } from "lucide-react";

import UserHeader from "../../../Components/admin/user-details/UserHeader";
import UserStats from "../../../Components/admin/user-details/UserStats";
import UserFilters from "../../../Components/admin/user-details/UserFilters";
import UserOrders from "../../../Components/admin/user-details/UserOrders";
import UserActions from "../../../Components/admin/user-details/UserActions";
import api from "../../../services/api/api";
import Loading from "../../../Components/Loading";

export default function AdminUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data.user);
        // Ensure orders safely falls back to an empty array
        setOrders(res.data.orders || []);
      } catch (err) {
        console.log(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStatusUpdated = (newStatus) => {
    setUser((prev) => ({
      ...prev,
      isBanned: newStatus,
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <section className="px-6 py-10">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h2 className="text-xl font-semibold text-white">User not found</h2>
          <p className="mt-2 text-zinc-400">The requested user doesn't exist.</p>
        </div>
      </section>
    );
  }

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === selectedStatus);

  const stats = {
    totalOrders: orders.length,
    totalSpent: orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0),
    pendingOrders: orders.filter((order) => order.orderStatus === "Pending").length,
    deliveredOrders: orders.filter((order) => order.orderStatus === "Delivered").length,
  };

  return (
    <section className="px-6 py-8">
      {/* Back Button */}
      <Link
        to="/admin/users"
        className="mb-8 inline-flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-orange-500"
      >
        <ChevronLeft size={20} />
        <span className="text-lg font-medium">Go Back</span>
      </Link>

      {/* Header */}
      <UserHeader user={user} />

      {/* Stats */}
      <div className="mt-8">
        <UserStats
          totalOrders={stats.totalOrders}
          totalSpent={stats.totalSpent}
          pendingOrders={stats.pendingOrders}
          deliveredOrders={stats.deliveredOrders}
        />
      </div>

      {/* Filters */}
      <div className="mt-8">
        <UserFilters selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      </div>

      {/* Orders Section / Empty State handling */}
      <div className="mt-8">
        {filteredOrders.length > 0 ? (
          <UserOrders orders={filteredOrders} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <div className="rounded-full bg-zinc-800/80 p-4 text-zinc-400">
              <ShoppingBag size={32} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {orders.length === 0 ? "No Orders Placed Yet" : "No Matching Orders"}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              {orders.length === 0
                ? "This user has not placed any orders yet."
                : `There are no orders with status "${selectedStatus}".`}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8">
        <UserActions isBanned={user?.isBanned} id={id} onUpdate={handleStatusUpdated} />
      </div>
    </section>
  );
}
