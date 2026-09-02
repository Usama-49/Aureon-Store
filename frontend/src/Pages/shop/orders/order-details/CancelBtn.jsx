import { toast } from "react-toastify";
import api from "../../../../services/api/api";
import { useState } from "react";

export default function CancelBtn({ order, id, setOrder }) {
  const isCancelled = order?.orderStatus === "Cancelled";
  const [cancelling, setCancelling] = useState(false);
  const handleDel = async () => {
    try {
      setCancelling(true);
      await api.patch(`/order/${id}/cancel`);
      setOrder((prev)=>({
        ...prev, orderStatus:"Cancelled"
      }))
      setCancelling(false);
      toast.success("Order Cancelled");
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        disabled={isCancelled || cancelling}
        onClick={handleDel}
        className={`px-8 py-3 rounded-full border font-semibold transition-all duration-300 ${
          isCancelled || cancelling
            ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500 hover:text-white hover:scale-105 cursor-pointer"
        }`}
      >
        {cancelling ? "Cancelling Order ..." :(isCancelled ? "Order Cancelled" : "Cancel Order")}
      </button>
    </div>
  );
}
