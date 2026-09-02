import {X} from "lucide-react";
import {useContext} from "react";
import {CartContext} from "../Context/CartContext";

export default function CartItem({item}) {
  const {addToCart, removeItem} = useContext(CartContext);
  const increaseQ = () => addToCart(item);
  const productId = item._id;
  const decreaseQ = () => removeItem(productId);
  const delAll = () => removeItem(productId, true);

  return (
    <>
      <div className="flex items-center justify-between p-4 sm:p-6 mb-4 bg-gray-900 rounded-xl border border-gray-800 transition-all duration-300 hover:border-orange-600/50">
        {/* Img, name */}
        <div className="flex items-center w-full space-x-4 sm:w-auto ">
          <img src={item.image.url} alt={item.name} className="w-24 h-24 object-cover rounded-lg border border-gray-700" />
          <div>
            <h3 className="text-xl font-bold text-white line-clamp-1">{item.name}</h3>
            <p className="text-lg text-orange-400 font-semibold">${item.price}</p>
          </div>
        </div>
        {/* Plus minus etc */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-2/5 sm:mt-0 space-x-4 ">
          <div className="flex items-center border border-gray-700 rounded-full overflow-hidden">
            <button onClick={decreaseQ} className="w-8 h-8 justify-center items-center transition-all duration-200 hover:bg-gray-900 p-2 text-gray-400 bg-gray-800">
              -
            </button>
            <span className="bg-gray-800 text-gray-400 min-w-2.5">{item.quantity}</span>
            <button onClick={increaseQ} className="w-8 h-8 justify-center items-center transition-all duration-200 hover:bg-gray-900 p-2 text-gray-400 bg-gray-800">
              +
            </button>
          </div>
          {/* Total */}
          <p className="text-lg text-orange-300 font-semibold text-right md:block">${item.price * item.quantity}</p>
        </div>
        <div className="ml-5 mt-2">
          <button onClick={delAll}>
            <X className="w-5 h-5 bg-red-400 rounded-full hover:bg-red-600 transition-colors duration-300 ease-in-out " />
          </button>
        </div>
      </div>
    </>
  );
}
