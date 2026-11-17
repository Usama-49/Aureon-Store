import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext";
import { authContext } from "../Context/AuthContext";
import api from "../services/api/api";
import ConfirmModal from "./ConfirmModal";

export default function ProductCard({ product, currentPage }) {
  const { addToCart, fetchProducts } = useContext(CartContext);
  const stockQuantity = product?.stock;

  const navigate = useNavigate();
  const { role, loggedIn } = useContext(authContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [show, setShow] = useState(false);

  const handleDel = async (id) => {
    try {
      setIsDeleting(true);
      await api.delete(`/admin/items/${id}`);
      toast.success(`Deleted Item with id:${id}`);
      await fetchProducts(currentPage);
    } catch (err) {
      console.log(err);
      toast.error("Deletion failed!");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async (id) => {
    try {
      navigate(`/admin/edit/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (product) => {
    if (!loggedIn) {
      toast.warn("Plz login first");
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="bg-gray-900 overflow-hidden rounded-2xl flex flex-col height-full transition-all duration-400 ease-in-out border border-gray-800 hover:scale-[1.03]">
        <Link
          to={`/product/${product._id}?page=${currentPage}`}
          className="relative cursor-pointer overflow-hidden block"
        >
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-56 object-cover transition-all duration-500 hover:scale-110 hover:opacity-80"
          />

          {/* // changed: Only show Sale! badge if discountPercentage is active (> 0) */}
          {product?.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-bounce uppercase tracking-wider">
              Sale!
            </div>
          )}

          {/* // changed: Dynamically render live discount percentage instead of hardcoded 90% OFF */}
          {product?.discountPercentage > 0 && (
            <div className="absolute bottom-0 left-0 bg-orange-600/90 text-white px-3 py-1 text-sm font-semibold rounded-tr-xl">
              {product.discountPercentage}% OFF
            </div>
          )}
        </Link>

        <div className="p-5 flex flex-col grow">
          <div className="flex justify-between items-start gap-2 mb-2">
            <Link to={`/product/${product._id}?page=${currentPage}`} className="flex-1 min-w-0">
              <h3 className="hover:text-orange-400 font-extrabold transition-all duration-500 truncate cursor-pointer text-white">
                {product.name}
              </h3>
            </Link>

            {/* // changed: Live price and conditional old price rendering */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-orange-400 text-xs font-semibold tracking-wide">PKR</span>
                <span className="text-white text-lg font-bold">{product.price}</span>
              </div>
              {product?.oldPrice && (
                <span className="text-zinc-500 text-xs line-through block">
                  PKR {product.oldPrice}
                </span>
              )}
            </div>
          </div>

          <p className="line-clamp-3 text-gray-400 text-sm mb-2">{product.description}</p>

          <div className="mt-auto">
            <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300">
              {product.category}
            </span>
          </div>

          {role === "admin" ? (
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => {
                  handleEdit(product._id);
                }}
                className="flex-1 flex items-center justify-center py-3 bg-orange-500 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-200 cursor-pointer"
              >
                <SquarePen size={20} />
                <span className="ml-2">Edit Product</span>
              </button>

              <button
                onClick={() => {
                  setShow(true);
                }}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAdd(product)}
              disabled={stockQuantity <= 0}
              className={`mt-5 flex items-center justify-center w-full py-3 font-bold rounded-full border transition-all duration-200 ${
                stockQuantity > 0
                  ? "bg-orange-500 border-orange-500 text-white cursor-pointer hover:bg-orange-600"
                  : "bg-red-500/10 text-red-400 cursor-not-allowed border-red-500/20"
              }`}
            >
              <ShoppingCart size={20} />
              <span className="ml-2">{stockQuantity > 0 ? "Add to Cart" : "✕ Out of Stock"}</span>
            </button>
          )}

          <ConfirmModal
            isOpen={show}
            onCancel={() => setShow(false)}
            isConfirming={isDeleting}
            onConfirm={() => handleDel(product._id)}
          />
        </div>
      </div>
    </>
  );
}
