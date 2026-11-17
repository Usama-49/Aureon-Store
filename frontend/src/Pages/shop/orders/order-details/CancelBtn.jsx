import { toast } from "react-toastify";
import api from "../../../../services/api/api";
import { useState } from "react";
import ConfirmModal from "../../../../Components/ConfirmModal";

export default function CancelBtn({ order, id, setOrder }) {
  const isCancelled = order?.orderStatus === "Cancelled";
  const [cancelling, setCancelling] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDel = async () => {
    try {
      setCancelling(true);
      await api.patch(`/order/${id}/cancel`);
      setOrder((prev) => ({
        ...prev,
        orderStatus: "Cancelled",
      }));
      toast.success("Order Cancelled");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setCancelling(false);
      setShowModal(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        type="button"
        disabled={isCancelled || cancelling}
        onClick={() => setShowModal(true)}
        className={`px-8 py-3 rounded-full border font-semibold transition-all duration-300 ${
          isCancelled || cancelling
            ? "bg-gray-700 border-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-red-500/10 border-red-500 text-red-400 hover:bg-red-500 hover:text-white hover:scale-105 cursor-pointer"
        }`}
      >
        {cancelling ? "Cancelling Order ..." : isCancelled ? "Order Cancelled" : "Cancel Order"}
      </button>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDel}
        isConfirming={cancelling}
      />
    </div>
  );
}
