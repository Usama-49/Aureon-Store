import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function OrderCard({ order }) {
const formatDateTime = (date) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
const moreItems = order.items.length;
const totalQuantity = order.items.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  const statusStyles = {
    Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    Delivered: "bg-green-500/15 text-green-400 border-green-500/30",
    Cancelled: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <div
      className="
          bg-gray-900
          border border-gray-800
          rounded-2xl
          p-5
          transition-all
          duration-300
          hover:border-orange-500/60
          hover:shadow-xl
          hover:shadow-orange-500/10
          hover:scale-[1.01]
          cursor-pointer
          mt-2
        "
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* LEFT */}

        <div className="flex items-center gap-5">
          <img
            src={order.items[0].image.url}
            alt={order.items[0].name}
            className="w-28 h-28 rounded-xl object-cover border border-gray-700"
          />
          <div>
            <div>
              <h2 className="text-2xl font-bold text-white line-clamp-1">{order.items[0].name}</h2>

              {moreItems > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  +{moreItems} more item{moreItems > 1 ? "s" : ""}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Order #<span className="text-orange-400 font-semibold">{order._id}</span>
            </p>

            <p className="text-gray-400 mt-2">
              Ordered on <span className="text-white">{formatDateTime(order.createdAt)}</span>
            </p>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm uppercase">Qty</p>

            <h3 className="text-xl font-bold text-white">{totalQuantity}</h3>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm uppercase">Total</p>

            <h3 className="text-xl font-bold text-orange-500">${order.totalPrice}</h3>
          </div>

          <span
            className={`
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                border
                ${statusStyles[order.orderStatus]}
              `}
          >
            {order.orderStatus}
          </span>

          <ChevronRight
            className="text-gray-500 group-hover:text-orange-500 transition-colors"
            size={26}
          />
        </div>
      </div>
    </div>
  );
}
