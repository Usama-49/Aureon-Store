import {MapPin} from "lucide-react"

export default function Adress({order}){
    return <>
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mt-8 hover:border-orange-500 transition">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="text-orange-400" size={20} />

            <h2 className="text-xl font-semibold">Shipping Address</h2>
          </div>

          <div className="space-y-2 text-gray-300">
            <p className="font-semibold text-white">{order.shippingAddress.name}</p>

            <p>{order.shippingAddress.address}</p>

            <p>{order.shippingAddress.city}</p>

            <p>{order.shippingAddress.zipCode}</p>
          </div>
        </div>
    </>
}