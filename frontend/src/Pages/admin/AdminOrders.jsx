import { useEffect, useState } from "react";
import AdminHeader from "../../Components/admin/orders/AdminHeader";
import AdminFilters from "../../Components/admin/orders/AdminFilters";
import AdminStats from "../../Components/admin/orders/AdminStats";
import AdminOrderCard from "../../Components/admin/orders/AdminOrderCard";
// import { dummyOrders } from "./DummyData";
import { Link } from "react-router-dom";
import api from "../../services/api/api";

export default function AdminOrders() {
  // Temporary Dummy Data (Will Replace Tomorrow)
  const [orders, setOrders] = useState([]);

 useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/admin/orders");
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  // const orders = dummyOrders;

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredOrders = orders?.filter((order) => {
    const matchesStatus = selectedStatus === "All" || order.orderStatus === selectedStatus;

    const matchesSearch =
      order.user.email.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-zinc-800 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AdminHeader />

        {/* Filters */}
        <div className="mt-8">
          <AdminFilters selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        </div>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by customer email or order ID..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500"
          />
        </div>

        {/* Stats */}
        <div className="mt-6">
          <AdminStats orders={orders} />
        </div>

        {/* Orders */}
        <div className="mt-8 space-y-5">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
                <AdminOrderCard key={order._id} order={order} />
            ))
          ) : (
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl py-14 text-center">
              <p className="text-zinc-400 text-lg">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
