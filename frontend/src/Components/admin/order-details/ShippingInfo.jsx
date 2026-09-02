import { CreditCard, House } from "lucide-react";

export default function ShippingInfo({ shippingAddress, paymentMethod }) {
  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all 
    duration-300 hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Shipping Information</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
            <House size={20} />
          </div>

          <div>
            <p className="text-sm text-zinc-400">Recipient</p>
            <p className="font-medium text-white">{shippingAddress.name}</p>

            <div className="mt-2 space-y-1 text-sm text-zinc-300">
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}</p>
              <p>{shippingAddress.zipCode}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
              <CreditCard size={20} />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Payment Method</p>
              <p className="font-medium text-white">{paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
