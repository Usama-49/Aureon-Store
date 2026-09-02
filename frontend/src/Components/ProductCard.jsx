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
  const navigate = useNavigate();
  const { role } = useContext(authContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [show,setShow] = useState(false);
  const handleDel = async (id) => {
    try {
      setIsDeleting(true);
      await api.delete(`/admin/items/${id}`);
      toast.success(`Deleted Item with id:${id}`);
      await fetchProducts();
    } catch (err) {
      console.log(err);
      toast.error("Deletion failed!");
    } finally{
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
    addToCart(product);
    toast.success("Added to cart");
  };
  return (
    <>
      <div className="bg-gray-900 overflow-hidden rounded-2xl flex flex-col height-full transition-all duration-400 ease-in-out border border-gray-800 hover:scale-[1.03]">
        <Link to={`/product/${product._id}?page=${currentPage}`} className="relative cursor-pointer overflow-hidden">
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-56 object-cover transition-all duration-500 hover:scale-110 hover:opacity-80 "
          />
          <div className="absolute bottom-0 left-0 bg-orange-600/90 text-white px-2 py-1 text-xl font-medium rounded-tr-xl ">
            {product.price}$
          </div>
        </Link>
        <div className="p-5 flex flex-col grow">
          <Link to={`/product/${product.id}`}>
            <h3 className="hover:text-orange-400 font-extrabold transition-all duration-500 line-clamp-1 cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <p className="line-clamp-3 text-gray-400 text-sm">{product.description}</p>
          <div className="mt-2">
            <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-full">
              {product.category}
            </span>
          </div>
          {role === "admin" ? (
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => {
                  handleEdit(product._id);
                }}
                className="flex-1 flex items-center justify-center py-3 bg-orange-500 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-200"
              >
                <SquarePen size={20} />
                <span className="ml-2">Edit Product</span>
              </button>

              <button
                onClick={() => {
                  setShow(true);

                }}
                className="w-14 h-14 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleAdd(product)}
              className="mt-5 flex items-center justify-center w-full py-3 bg-orange-500 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-200"
            >
              <ShoppingCart size={20} />
              <span className="ml-2">Add to Cart</span>
            </button>
          )}
          <ConfirmModal isOpen={show} onCancel={()=>setShow(false)} isConfirming={isDeleting} onConfirm={()=>handleDel(product._id)}/>
        </div>
      </div>
    </>
  );
}
