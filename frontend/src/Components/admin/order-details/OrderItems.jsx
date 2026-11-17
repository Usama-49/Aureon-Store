export default function OrderItems({ items }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6
      transition-all duration-300 hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Order Items ({items.length})</h2>

      <div className="space-y-4">
        {items.map((item) => {
          const subtotal = item.price * item.quantity;

          return (
            <div
              key={item.product}
              className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-400 
              hover:-translate-y-0.5 hover:scale-[1.01] hover:border-zinc-700 hover:bg-zinc-900"
            >
              <img
                src={item.image.url}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-white">{item.name}</h3>

                <div className="mt-1 flex items-baseline gap-1 text-sm text-zinc-400">
                  <div className="flex items-baseline gap-1">
                    <span className="text-orange-400 text-[10px] font-semibold tracking-wide">
                      PKR
                    </span>
                    <span>{item.price}</span>
                  </div>
                  <span>× {item.quantity}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-zinc-400">Subtotal</p>

                <div className="flex items-baseline justify-end gap-1.5 font-semibold text-orange-500">
                  <span className="text-orange-400 text-xs font-semibold tracking-wide">PKR</span>
                  <span className="text-base font-bold">{subtotal}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
