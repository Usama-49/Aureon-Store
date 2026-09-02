import {Link} from "react-router-dom";
import {ChevronLeft, Zap} from "lucide-react";
import {useContext} from "react";
import {CartContext} from "../../Context/CartContext";
import CartItem from "../../Components/CartItem";

export default function Cart() {
  const {cartCount, cart, totalPrice} = useContext(CartContext);

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        {/* Back To Store */}
        <div className="flex items-center mb-10 ">
          <Link to={"/home"} className="flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300 font-semibold text-lg">
            <ChevronLeft className="w-6 h-6 mr-1" />
            <span>Back to store</span>
          </Link>
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-10 tracking-tight">Shopping Cart ({cartCount})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          {/* First Child */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          {/* Second Child */}
          <div className="lg:col-span-1 p-8 bg-gray-900 rounded-2xl border-1-4 sticky top-20 h-fit border border-gray-900/90 ">
            <h3 className="text-2xl font-bold mb-5 space-x-2 flex items-center">
              <div className="w-full border-b pb-3 border-gray-600">
                <span className="w-6 h-6 text-orange-400 mr-1">$</span> <span>Order Total</span>
              </div>
            </h3>
            {/* Sub Total */}
            <div className="space-y-4">
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
                Estimated Total : <span className="text-orange-400">${totalPrice}</span>
              </div>
            </div>
            {/* Add to Cart btn */}
            <Link to={ cartCount === 0 ? "#" :"/checkout"}>
              <button disabled={cartCount === 0} className="mt-5 flex items-center justify-center flex-row max-auto w-full py-3 bg-orange-600 border border-orange-500 text-white text-xl font-extrabold rounded-full hover:bg-orange-600/40 transition-all duration-200">
                {cartCount !== 0 && <Zap />}
                <span className="ml-2">{cartCount === 0 ? "No Product Added!": "Proceed Securely"}</span>
              </button>
            </Link>
            <p className="mt-3 ml-12 text-gray-400/80 text-sm font-light">All Transactions are Processed Securely</p>
          </div>
        </div>
      </div>
    </>
  );
}
