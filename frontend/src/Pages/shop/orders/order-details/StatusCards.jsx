export default function StatusCards({ order }) {
  const styles = {
    "Pending": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
    "Delivered": "bg-green-500/20 text-green-400 border border-green-500/40",
    "Processing": "bg-blue-500/20 text-blue-400 border border-blue-500/40",
    "Cancelled": "bg-red-500/20 text-red-400 border border-red-500/40",
  };
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Order Status */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-orange-500 transition">
          <h2 className="font-semibold text-lg mb-5">Order Status</h2>
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              styles[order.orderStatus] || "bg-gray-700 border border-gray-600 text-gray-200"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>
        {/* Payment Status */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-orange-500 transition">
          <h2 className="font-semibold text-lg mb-5">Payment Status</h2>
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
              styles[order.orderStatus] || "bg-gray-700 border border-gray-600 text-gray-200"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>
      </div>
    </>
  );
}
