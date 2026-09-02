import { Package } from "lucide-react";

export default function OrderHeader({ order }) {
  return (
    <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-lg p-6 hover:border-orange-500 transition-all duration-300">
      <div className="flex items-center gap-2 text-orange-400 mb-6">
        <Package size={22} />
        <span className="text-xl font-semibold">Order Details</span>
      </div>

      <div className="space-y-6">
        {order.items.map((item, index) => {
          const subtotal = item.price * item.quantity;

          return (
            <div
              key={item._id}
              className="group rounded-2xl p-4 transition-all duration-300 hover:bg-gray-800/40"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Product Image */}
                <div className="overflow-hidden rounded-2xl border border-gray-800">
                  <img
                    src={item.image.url}
                    alt={item.name}
                    className="w-full md:w-40 h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-5">{item.name}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-800 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-orange-500 hover:-translate-y-1">
                      <p className="text-sm text-gray-400 mb-1">Quantity</p>
                      <p className="text-xl font-semibold text-white">{item.quantity}</p>
                    </div>

                    <div className="bg-gray-800 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-orange-500 hover:-translate-y-1">
                      <p className="text-sm text-gray-400 mb-1">Unit Price</p>
                      <p className="text-xl font-semibold text-white">${item.price}</p>
                    </div>

                    <div className="bg-gray-800 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-orange-500 hover:-translate-y-1">
                      <p className="text-sm text-gray-400 mb-1">Subtotal</p>
                      <p className="text-2xl font-bold text-orange-400">${subtotal}</p>
                    </div>
                  </div>
                </div>
              </div>

              {index !== order.items.length - 1 && <hr className="mt-6 border-gray-700" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
