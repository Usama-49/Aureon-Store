import { useState } from "react";
import api from "../../../services/api/api";
import { toast } from "react-toastify";
import ConfirmModal from "../../../Components/ConfirmModal";

export default function ActionButtons({ orderStatus, id }) {
  const [status, setStatus] = useState(orderStatus);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  console.log(status);
  function handleUpdate() {
    const patch = async () => {
      try {
        setUpdateStatus(true);
        await api.patch(`/admin/orders/${id}`, { status: status });
        toast.success("Updated Order");
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        setUpdateStatus(false);
        setShowConfirm(false);
      }
    };
    patch();
  }

  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all 
    duration-300 hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      <h2 className="mb-6 text-lg font-semibold text-white">Actions</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="status" className="mb-2 block text-sm text-zinc-400">
            Update Order Status
          </label>

          <select
            id="status"
            value={status}
            disabled={status === "Cancelled"}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full rounded-lg border border-zinc-700 ${
              status === "Cancelled" ? "text-gray-500 cursor-not-allowed" : "text-white "
            }bg-zinc-950 px-4 py-3 outline-none transition focus:border-orange-500`}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <button
          onClick={() => {
            setShowConfirm(true);
          }}
          disabled={updateStatus || status === "Cancelled"}
          className={`w-full rounded-lg ${
            status === "Cancelled"
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-orange-600 bg-orange-500 transition"
          }  px-4 py-3 font-medium`}
        >
          {status === "Cancelled"
            ? "Order Cancelled!"
            : updateStatus
              ? "Saving Changes..."
              : "Save Changes"}
        </button>
        <ConfirmModal
          isOpen={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleUpdate}
          isConfirming={updateStatus}
        />
      </div>
    </div>
  );
}
