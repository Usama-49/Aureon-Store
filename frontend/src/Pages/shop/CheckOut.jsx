import { MapPin, Package, ChevronLeft, ShieldCheck } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import OrderConfirmation from "./OrderConfirmation";
import { toast } from "react-toastify";
import api from "../../services/api/api";

export default function CheckOut() {
  const { totalPrice, clearCart, cart } = useContext(CartContext);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      items: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      shippingAddress: details,
    };

    try {
      await api.post("/order/add", payload);
      toast.success("Order Placed!");
      clearCart();
      setConfirm(true);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };

  if (confirm) return <OrderConfirmation deliveryDetails={details} />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors duration-200 font-semibold text-base mb-6 group cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back to Cart</span>
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
        Finalize Order
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Shipping Form Container */}
        <div className="lg:col-span-2 p-5 sm:p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-semibold text-orange-400/90 mb-6 flex items-center gap-3 border-b border-gray-800 pb-4">
            <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-orange-400" />
            <span>Shipping Information</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, [e.target.name]: e.target.value })
                }
                placeholder="John Doe"
                className="w-full rounded-xl px-4 py-3 bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={details.address}
                onChange={(e) =>
                  setDetails({ ...details, [e.target.name]: e.target.value })
                }
                placeholder="123 Main St, Apt 4B"
                className="w-full rounded-xl px-4 py-3 bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
            </div>

            {/* City & Zip Code Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={details.city}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                  placeholder="New York"
                  className="w-full rounded-xl px-4 py-3 bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Zip Code
                </label>
                <input
                  type="number"
                  name="zipCode"
                  required
                  value={details.zipCode}
                  onChange={(e) =>
                    setDetails({ ...details, [e.target.name]: e.target.value })
                  }
                  placeholder="10001"
                  className="w-full rounded-xl px-4 py-3 bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 cursor-pointer"
            >
              Pay & Confirm Order (${totalPrice})
            </button>
          </form>
        </div>

        {/* Summary Sidebar Container */}
        <div className="lg:col-span-1 p-5 sm:p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl lg:sticky lg:top-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 pb-3 border-b border-gray-800 flex items-center gap-2">
            <Package className="w-6 h-6 text-orange-400" />
            <span>Summary</span>
          </h3>

          {/* Itemized List */}
          <div className="border-b border-gray-800 pb-4 max-h-60 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-sm sm:text-base gap-3"
              >
                <span className="text-gray-300 font-medium truncate flex-1">
                  {item.name}{" "}
                  <span className="text-gray-500 text-xs">x{item.quantity}</span>
                </span>
                <span className="font-semibold text-orange-400 flex-shrink-0">
                  ${item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-3 pt-4 border-b border-gray-800 pb-4 text-sm sm:text-base">
            <div className="flex justify-between text-gray-400 font-medium">
              <span>SubTotal</span>
              <span className="text-gray-200">${totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-400 font-medium">
              <span>Shipping (Express)</span>
              <span className="text-green-400 font-semibold">Free</span>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-lg sm:text-xl font-bold text-white">
            <span>Total Due</span>
            <span className="text-orange-400">${totalPrice}</span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-gray-400/80 text-xs text-center font-medium">
            <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span>All Transactions are Processed Securely</span>
          </div>
        </div>
      </div>
    </div>
  );
}