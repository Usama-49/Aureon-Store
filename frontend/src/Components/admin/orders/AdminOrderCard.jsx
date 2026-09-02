import { ChevronRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminOrderCard({ order }) {
  const firstItem = order.items[0];
  const moreItems = order.items.length - 1;

  function getStatusColor(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";

      case "Processing":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";

      case "Delivered":
        return "bg-green-500/15 text-green-400 border-green-500/30";

      case "Cancelled":
        return "bg-red-500/15 text-red-400 border-red-500/30";

      default:
        return "bg-zinc-700 text-white border-zinc-600";
    }
  }

  return (
    <Link
      to={`/admin/orders/${order._id}`}
      className="block bg-zinc-900 border border-zinc-700 rounded-2xl hover:border-orange-500 transition-all duration-200"
    >
      <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Left */}
        <div className="flex gap-4">
          <img
            src={firstItem.image.url}
            alt={firstItem.name}
            className="w-20 h-20 rounded-xl object-cover border border-zinc-700"
          />

          <div>
            <p className="text-lg font-semibold text-white">{order.userEmail}</p>

            <div className="flex items-center gap-2 text-zinc-400 mt-2">
              <Package size={16} />

              <span>
                {firstItem.name}

                {moreItems > 0 && <span className="text-orange-400"> +{moreItems} more</span>}
              </span>
            </div>

            <p className="text-sm text-zinc-500 mt-2">Order ID: #{order._id.slice(-6)}</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center justify-between md:justify-end gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-white">${order.totalPrice}</p>

            <p className="text-sm text-zinc-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full border text-sm font-medium ${getStatusColor(
              order.orderStatus,
            )}`}
          >
            {order.orderStatus}
          </span>

          <ChevronRight className="text-zinc-500" size={22} />
        </div>
      </div>
    </Link>
  );
}
