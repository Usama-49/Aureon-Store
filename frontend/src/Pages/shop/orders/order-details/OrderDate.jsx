import { CalendarDays } from "lucide-react";

export default function OrderDate({order}){
    return <>
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 hover:border-orange-500 transition">
                <div className="flex items-center gap-2 mb-5">
                  <CalendarDays className="text-orange-400" size={20} />
                  <h2 className="text-xl font-semibold">Ordered On</h2>
                </div>
    
                <p className="text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
    </>
}