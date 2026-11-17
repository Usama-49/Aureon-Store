import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusCards from "./order-details/StatusCards";
import Adress from "./order-details/Adress";
import OrderHeader from "./order-details/OrderHeader";
import OrderSummary from "./order-details/OrderSummary";
import CancelBtn from "./order-details/CancelBtn";
import PaymentMethod from "./order-details/PaymentMethod";
import OrderDate from "./order-details/OrderDate";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";
import Loading from "../../../Components/Loading";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/order/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading || !order) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ================= BACK BUTTON ================= */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors font-medium text-sm group mb-2"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Orders</span>
        </Link>

        {/* ================= ORDER HEADER ================= */}
        <OrderHeader order={order} />

        {/* ================= STATUS CARDS ================= */}
        <StatusCards order={order} />

        {/* ================= SHIPPING ADDRESS ================= */}
        <Adress order={order} />

        {/* ================= PAYMENT & ORDER DATE ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PaymentMethod order={order} />
          <OrderDate order={order} />
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <OrderSummary order={order} />

        {/* ================= CANCEL BUTTON ================= */}
        <CancelBtn id={id} order={order} setOrder={setOrder} />

        {/* ================= FOOTER / SUPPORT ================= */}
        <div className="pt-6 border-t border-gray-900 text-center">
          <p className="text-gray-500 text-sm">
            Need help with this order?{" "}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=woodorycraft@gmail.com&su=${encodeURIComponent(
                `Support Inquiry - Order #${order._id}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 font-medium cursor-pointer hover:text-orange-500 hover:underline transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
