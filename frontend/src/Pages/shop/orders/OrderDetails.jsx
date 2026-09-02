import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import StatusCards from "./order-details/StatusCards";
import Adress from "./order-details/Adress";
import OrderHeader from "./order-details/OrderHeader";
import OrderSummary from "./order-details/OrderSummary";
import CancelBtn from "./order-details/CancelBtn";
import PaymentMethod from "./order-details/PaymentMethod";
import OrderDate from "./order-details/OrderDate";
import { useEffect, useState } from "react";
import api from "../../../services/api/api";
import { CartContext } from "../../../Context/CartContext";
import Loading from "../../../Components/Loading";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/order/${id}`);
      setOrder(res.data);
    };
    fetch();
  }, [id]);

  if (!order) {
    return <Loading />
  }

  return (
    <section className="min-h-screen bg-gray-950 text-white py-10 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>
        {/* Product Information & image */}
        <OrderHeader order={order} /> 
        {/* Status Cards */}
        <StatusCards order={order} />
        {/* Shipping Address */}
        <Adress order={order} /> 
        {/* Payment & Ordered Date */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <PaymentMethod order={order} /> 
          <OrderDate order={order} /> 
        </div>
        {/* Order Summary */}
        <OrderSummary order={order} /> 
        {/* Cancel Button */}
        <CancelBtn id={id} order={order} setOrder={setOrder}/>
        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-10">
          Need help with this order?{" "}
          <span className="text-orange-400 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </section>
  );
}
