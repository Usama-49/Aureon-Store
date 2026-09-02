import { CreditCard } from "lucide-react";

export default function PaymentMethod({order}){
    return <>
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-orange-500 transition">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="text-orange-400" size={20} />

              <h2 className="text-xl font-semibold">Payment Method</h2>
            </div>

            <p className="text-gray-300">{order.paymentMethod}</p>
          </div>
    </>
}