import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Tag, Zap, SquarePen, ShoppingCart, TriangleAlert } from "lucide-react";
import { CartContext } from "../../../Context/CartContext";
import { authContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { addToCart, products } = useContext(CartContext);
  const { role } = useContext(authContext);
  const { id } = useParams();
  const product = products?.find((data) => data._id == id);
  const navigate = useNavigate();
  const handleEdit = async (id) => {
    try {
      navigate(`/admin/edit/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdd = async (product) => {
    addToCart(product);
    toast.success("Added to Cart");
  };

  useEffect(() => {}, [products, id]);

  const stockQuantity = product?.stock;

  const stockStatus =
    stockQuantity === 0
      ? {
          text: "✕ Out of Stock",
          classes: "bg-red-500/10 text-red-400 border border-red-500/20",
        }
      : stockQuantity < 5
        ? {
            text: `⚠ Low Stock (${stockQuantity} Available)`,
            classes: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
          }
        : {
            text: `✓ In Stock (${stockQuantity} Available)`,
            classes: "bg-green-500/10 text-green-400 border border-green-500/20",
          };

  const isDisabled = stockQuantity === 0 && role === "user";
  return (
    <>
      <div className="container px-4 sm:px-8 bg-gray-800 min-h-screen rounded-2xl my-8 p-6 md:p-12 border border-gray-800">
        <Link to={`/home?page=${page}`}>
          <button className="flex cursor-pointer items-center mb-10 text-gray-400 hover:text-orange-400 text-lg font-semibold ease-in-out transition-all duration-300">
            <ChevronLeft />
            <span>Back to All Products</span>
          </button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          <div className="w-full">
            <div className="w-72 h-72 overflow-hidden rounded-2xl">
              <img
                src={product?.image.url}
                alt={product?.name}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 hover:text-yellow-300/80 transition-colors ease-in-out duration-300">
                {product?.name}
              </h1>
            </div>

            <p className="font-bold text-orange-400 mb-4 text-xl hover:text-yellow-300/80 transition-colors ease-in-out duration-300">
              ${product?.price}
            </p>

            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${stockStatus.classes}`}
              >
                {stockStatus.text}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2 border-b border-orange-900/50 pb-2 flex items-center text-gray-200">
              <Tag className="w-5 h-5 text-orange-400" />
              <span className="ml-2 hover:text-yellow-300/80 transition-colors ease-in-out duration-300">
                Product Overview
              </span>
            </h2>

            <p className="text-gray-400 mb-3">{product?.description}</p>

            <ul className="space-y-3 text-gray-300/90 p-4 bg-gray-800 rounded-xl border border-gray-700">
              <li className="flex items-center space-x-3 text-lg">
                <Zap className="w-5 h-5 text-orange-400" />
                <span>High Quality Professional Grade Material</span>
              </li>

              <li className="flex items-center space-x-3 text-lg">
                <Zap className="w-5 h-5 text-orange-400" />
                <span>Comprehensive Manufacturer Warranty</span>
              </li>

              <li className="flex items-center space-x-3 text-lg">
                <Zap className="w-5 h-5 text-orange-400" />
                <span>Immediate Shipping for In-Stock Items</span>
              </li>
            </ul>
            <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 flex gap-3">
              <TriangleAlert size={18} className="text-yellow-400 shrink-0 mt-0.5" />

              <p className="text-sm text-yellow-300 leading-relaxed">
                <span className="font-semibold">Stock is verified during checkout.</span> If
                availability changes, you'll be asked to update your cart before placing your order.
              </p>
            </div>
            <button
              onClick={() => {
                role === "admin" ? handleEdit(id) : product && handleAdd(product);
              }}
              disabled={isDisabled}
              className={`mt-5 flex items-center justify-center w-full py-3 font-bold rounded-full transition-all duration-200 ${
                isDisabled
                  ? "bg-gray-600 border border-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-orange-500 border border-orange-500 text-white hover:bg-orange-600/20 hover:scale-[1.02] cursor-pointer"
              }`}
            >
              {role === "admin" ? <SquarePen size={20} /> : <ShoppingCart size={20} />}

              <span className="ml-2">
                {role === "admin" ? "Edit Product" : isDisabled ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>

            {role === "user" && (
              <Link to={"/home"}>
                <button className="mt-5 flex items-center justify-center flex-row max-auto w-full py-3 bg-orange-400/10 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600/20 transition-all duration-200 cursor-pointer">
                  <span className="ml-2">Keep Shopping</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
