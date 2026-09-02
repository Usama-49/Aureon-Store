import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import UserHeader from "../../../Components/admin/user-details/UserHeader";
import UserStats from "../../../Components/admin/user-details/UserStats";
import UserFilters from "../../../Components/admin/user-details/UserFilters";
import UserOrders from "../../../Components/admin/user-details/UserOrders";
import UserActions from "../../../Components/admin/user-details/UserActions";
import api from "../../../services/api/api";
import Loading from "../../../Components/Loading";

export default function AdminUserDetails() {
  const { id } = useParams();
  const [user,setUser] = useState(null);
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        setLoading(true);
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data.user);
        setOrders(res.data.orders);
      } catch(err){
        console.log(err.response?.data?.message || "Something went wrong");
      } finally{
        setLoading(false);
      }
    }
    fetch();
  },[id]);
  const handleStatusUpdated = (newStatus) => {
  setUser((prev) => ({
    ...prev,
    isBanned: newStatus,
  }));
};

  const [selectedStatus, setSelectedStatus] = useState("All");

  if(loading){
    return <Loading />
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

  // const userOrders = dummyOrders.filter((order) => order.user === id);

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.orderStatus === selectedStatus);

  const stats = {
    totalOrders: orders.length,

    totalSpent: orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((sum, order) => sum + order.totalPrice, 0),

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

      {/* Orders */}
      <div className="mt-8">
        <UserOrders orders={filteredOrders} />
      </div>

      {/* Actions */}
      <div className="mt-8">
        <UserActions isBanned={user?.isBanned} id={id} onUpdate={handleStatusUpdated}/>
      </div>
    </section>
  );
}
