import { ShoppingBag } from "lucide-react";

export default function OrderSummary({ order }) {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 mt-8 p-6 hover:border-orange-500 transition">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="text-orange-400" size={20} />
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </div>

      {order.items.map((item, index) => (
        <div key={item._id}>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <span>Product</span>
              <span className="font-medium text-white">{item.name}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Quantity</span>
              <span className="font-medium text-white">{item.quantity}</span>
            </div>

            <div className="flex justify-between items-baseline text-gray-300">
              <span>Unit Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-orange-400 text-xs font-semibold tracking-wide">PKR</span>
                <span className="font-medium text-white">{item.price}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline text-gray-300">
              <span>Subtotal</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-orange-400 text-xs font-semibold tracking-wide">PKR</span>
                <span className="font-medium text-white">{item.price * item.quantity}</span>
              </div>
            </div>
          </div>
          {index !== order.items.length - 1 && <hr className="my-6 border-gray-700" />}
        </div>
      ))}

      <div className="border-t border-gray-700 pt-5 mt-6 flex justify-between items-baseline">
        <span className="text-lg font-semibold text-white">Total Paid</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-orange-400 text-sm font-semibold tracking-wide">PKR</span>
          <span className="text-2xl font-bold text-white">{order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
