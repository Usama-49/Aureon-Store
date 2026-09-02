import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, CircleDollarSign, Package } from "lucide-react";

export default function UserOrders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition-all duration-300 hover:border-orange-500">
        <Package size={40} className="mx-auto text-zinc-500" />

        <h3 className="mt-4 text-xl font-semibold text-white">No Orders Found</h3>

        <p className="mt-2 text-zinc-400">This user hasn't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Link
          key={order._id}
          to={`/admin/orders/${order._id}`}
          className="group block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                Order #{order._id.slice(-6).toUpperCase()}
              </h2>

              <p className="mt-2 text-zinc-400">
                {order.items[0].name}
                {order.items.length > 1 && ` +${order.items.length - 1} more`}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-orange-500" />

                  <span>
                    {order.items.length} Item
                    {order.items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-orange-500" />

                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-sm text-zinc-400">Status</p>

                <span className="mt-2 inline-block rounded-full bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400">
                  {order.orderStatus}
                </span>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-400">Total</p>

                <div className="mt-2 flex items-center justify-end gap-1 font-semibold text-white">
                  <CircleDollarSign size={18} className="text-orange-500" />

                  {order.totalPrice}
                </div>
              </div>

              <ChevronRight
                size={22}
                className="text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange-500"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
