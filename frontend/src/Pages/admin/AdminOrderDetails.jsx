import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import CustomerInfo from "../../Components/admin/order-details/CustomerInfo";
import OrderItems from "../../Components/admin/order-details/OrderItems";
import OrderSummary from "../../Components/admin/order-details/OrderSummary";
import StatusCard from "../../Components/admin/order-details/StatusCard";
import ActionButtons from "../../Components/admin/order-details/ActionButtons";
import ShippingInfo from "../../Components/admin/order-details/ShippingInfo";
import { useEffect, useState } from "react";
import api from "../../services/api/api";
import Loading from "../../Components/Loading";
// import { dummyOrders } from "./DummyData";
export default function AdminOrderDetails() {
  const [order, setOrders] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/admin/orders/${id}`);
        setOrders(res.data.order);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [id]);
  // const order = orders?.find((order) => order._id === id);

  if (!order) {
    return (
      <Loading />
    );
  }

  return (
    <section className="px-6 py-8">
      {/* Back Button */}
      <button
        className="mb-8 inline-flex items-center
       gap-2 text-zinc-400 transition-colors hover:text-orange-500"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft size={20} />
        <span className="text-sm md:text-base lg:text-lg font-medium">Go Back</span>
      </button>
      {/* Title */}
      <div className="mb-8">
        <p className="text-sm text-zinc-400">Order ID</p>

        <h1 className="text-3xl font-bold text-white">#{order?._id.toUpperCase()}</h1>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <CustomerInfo userEmail={order?.user.email} />

          <ShippingInfo
            shippingAddress={order?.shippingAddress}
            paymentMethod={order?.paymentMethod}
          />

          <OrderItems items={order?.items} />
        </div>

        <div className="space-y-6">
          <StatusCard paymentStatus={order?.paymentStatus} orderStatus={order?.orderStatus} />

          <OrderSummary
            totalPrice={order?.totalPrice}
            createdAt={order?.createdAt}
            updatedAt={order?.updatedAt}
          />

          <ActionButtons id={id} orderStatus={order?.orderStatus} />
        </div>
      </div>
    </section>
  );
}
