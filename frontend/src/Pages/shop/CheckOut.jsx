import { MapPin, Package } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import OrderConfirmation from "./OrderConfirmation";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../services/api/api";

export default function CheckOut() {
  const { totalPrice, clearCart, cart } = useContext(CartContext);
  const [confirm, setConfirm] = useState(false);

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
      await api.post("/order/add",payload);
      toast.success("Order Placed!");
      clearCart();
      setConfirm(true);
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to place order.");
    }
  };
  const [details, setDetails] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
  });
  if (confirm) return <OrderConfirmation deliveryDetails={details} />;
  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8 ">
        <h2 className="text-3xl font-bold tracking-tight mb-10">Finalize Order</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 p-8 bg-gray-900 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-semibold text-orange-400/90 mb-6 flex items-center space-x-3 border-b  border-gray-700 pb-4">
              <MapPin className="h-7 w-7 text-orange-400/90" />
              <span>Shipping Information</span>
            </h3>
            <form onSubmit={handleSubmit}>
              {Object.keys(details).map((key) => (
                <div key={key}>
                  <label className="block text-semibold text-gray-300 text-sm capitalize mb-1">
                    <div className="flex flex-col ">
                      <span className="font-semibold">{key}</span>
                      <input
                        onChange={(e) =>
                          setDetails({ ...details, [e.target.name]: e.target.value })
                        }
                        name={key}
                        required
                        value={details[key]}
                        className="border w-full rounded-lg px-4 mb-1 mt-2 py-2 focus:outline-none focus:ring-1/2 text-white focus:ring-orange-300 border-gray-700 focus:border-orange-500"
                        type={key == "zipCode" ? "number" : "text"}
                      />
                    </div>
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="mt-5 flex items-center justify-center flex-row max-auto w-full py-3 bg-orange-500/80 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600/40 transition-all duration-200"
              >
                <span className="ml-2">Pay & Confirm Order ({totalPrice}$)</span>
              </button>
            </form>
          </div>
          {/* Second Child */}
          <div className="lg:col-span-1 p-8 bg-gray-900 rounded-2xl border-1-4 sticky top-20 h-fit border border-gray-900/90 ">
            <h3 className="text-2xl font-bold mb-5 space-x-2 flex items-center">
              <div className="w-full border-b pb-3 border-gray-600">
                <span className="w-6 h-6 text-orange-400 mr-1">
                  <Package className="inline mb-1" />
                </span>
                <span className="ml-1">Summary</span>
              </div>
            </h3>
            <div className="border-b border-gray-600 pb-3">
              {cart.map((item) => {
                return (
                  <div key={item._id} className="flex justify-between mt-1 mb-3 items-center">
                    <span className="text-gray-400 font-sm font-semibold line-clamp-1">
                      {item.name}
                    </span>
                    <span className="font-sm font-semibold text-orange-400">
                      {item.price * item.quantity}$
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Sub Total */}
            <div className="space-y-4 mt-2">
              <div className="text-lg ">
                <span className="text-gray-400 font-semibold">
                  SubTotal : <span>${totalPrice}</span>
                </span>
              </div>
            </div>
            {/* Shipping Express */}
            <div className="space-y-4 border-b border-gray-600 pb-4">
              <div className="text-lg ">
                <span className="text-gray-400 font-semibold">
                  Shipping(Express) : <span className="text-green-400">Free</span>
                </span>
              </div>
            </div>
            {/* Estimate Total */}
            <div className="space-y-4 mt-4">
              <div className="text-xl font-semibold text-white">
                Total Due : <span className="text-orange-500">${totalPrice}</span>
              </div>
            </div>
            <p className="mt-3 ml-12 text-gray-400/80 text-sm font-light">
              All Transactions are Processed Securely
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
