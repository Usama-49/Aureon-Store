import { X, Plus, Minus } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export default function CartItem({ item }) {
  const { addToCart, removeItem } = useContext(CartContext);
  const increaseQ = () => addToCart(item);
  const productId = item._id;
  const decreaseQ = () => removeItem(productId);
  const delAll = () => removeItem(productId, true);

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 mb-4 bg-gray-900/90 rounded-2xl border border-gray-800/80 shadow-lg hover:border-orange-500/40 transition-all duration-300">
      {/* Product Details (Image, Title & Base Price) */}
      <div className="flex items-center gap-4 min-w-0 w-full sm:w-1/2">
        <img
          src={item.image.url}
          alt={item.name}
          className="w-20 h-20 sm:w-22 sm:h-22 object-cover rounded-xl border border-gray-800 flex-shrink-0"
        />
        <div className="min-w-0 flex-1 pr-6 sm:pr-0">
          <h3 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm sm:text-base text-gray-400 font-medium mt-0.5">${item.price}</p>
        </div>
      </div>

      {/* Controls & Total Price Section */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-1/2 gap-4 pt-3 sm:pt-0 border-t border-gray-800/60 sm:border-t-0">
        <div className="flex items-center bg-gray-800/80 border border-gray-700/60 rounded-xl p-1 shadow-inner">
          <button
            onClick={decreaseQ}
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/70 active:scale-95 rounded-lg transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <span className="w-9 text-center text-sm font-semibold text-gray-100">
            {item.quantity}
          </span>

          <button
            onClick={increaseQ}
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/70 active:scale-95 rounded-lg transition-all"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Calculated Item Total */}
        <div className="text-right min-w-20">
          <p className="text-base sm:text-lg text-orange-400 font-bold tracking-tight">
            ${item.price * item.quantity}
          </p>
        </div>

        <button
          onClick={delAll}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 active:scale-90 rounded-xl transition-all"
          aria-label="Remove item"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
