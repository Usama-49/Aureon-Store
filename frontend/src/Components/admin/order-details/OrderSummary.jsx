export default function OrderSummary({ totalPrice, createdAt, updatedAt }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300
     hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Order Summary</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <span className="text-zinc-400">Total Amount</span>

          <span className="text-xl font-bold text-orange-500">${totalPrice}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Order Placed</span>

          <span className="text-right text-white">{new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Last Updated</span>

          <span className="text-right text-white">{new Date(updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
