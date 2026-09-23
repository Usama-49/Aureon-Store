import { Link } from "react-router-dom";
import { ChevronLeft, Zap, ShoppingBag, ShieldCheck } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import CartItem from "../../Components/CartItem";

export default function Cart() {
  const { cartCount, cart, totalPrice } = useContext(CartContext);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
      {/* Back To Store */}
      <div className="flex items-center mb-6">
        <Link
          to="/home"
          className="inline-flex items-center text-gray-400 hover:text-orange-400 transition-colors duration-200 font-semibold text-base group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to store</span>
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8 tracking-tight">
        Shopping Cart ({cartCount})
      </h1>

      {cartCount === 0 ? (
        /* Empty Cart View */
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-gray-900 rounded-2xl border border-gray-800 text-center">
          <div className="w-16 h-16 bg-gray-800/80 rounded-2xl flex items-center justify-center text-orange-400 mb-4 shadow-inner">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 max-w-md text-sm sm:text-base mb-6">
            Looks like you haven't added anything to your cart yet. Explore our store to find your
            favorite products.
          </p>
          <Link
            to="/home"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Active Cart View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 p-5 sm:p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl lg:sticky lg:top-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="text-orange-400">$</span>
              <span>Order Total</span>
            </h3>

            {/* Pricing Breakdowns */}
            <div className="space-y-3.5 border-b border-gray-800 pb-5 text-sm sm:text-base">
              <div className="flex justify-between items-center text-gray-400 font-medium">
                <span>SubTotal</span>
                <span className="text-gray-200 font-semibold">${totalPrice}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 font-medium">
                <span>Shipping (Express)</span>
                <span className="text-green-400 font-semibold">Free</span>
              </div>
            </div>

            {/* Estimated Total */}
            <div className="pt-5 flex justify-between items-center text-lg sm:text-xl font-bold text-white">
              <span>Estimated Total</span>
              <span className="text-orange-400">${totalPrice}</span>
            </div>

            {/* Proceed to Checkout Button */}
            <Link to="/checkout" className="block mt-6">
              <button className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-base sm:text-lg cursor-pointer">
                <Zap className="w-5 h-5 fill-current" />
                <span>Proceed Securely</span>
              </button>
            </Link>

            {/* Trust Badge */}
            <div className="mt-5 flex items-center justify-center gap-2 text-gray-400/80 text-xs text-center font-medium">
              <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
              <span>All Transactions are Processed Securely</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
