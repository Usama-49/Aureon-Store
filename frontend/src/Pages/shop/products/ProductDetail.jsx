import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ChevronLeft, Tag, Zap, SquarePen, ShoppingCart, TriangleAlert } from "lucide-react";
import { CartContext } from "../../../Context/CartContext";
import { authContext } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import api from "../../../services/api/api";
import Loading from "../../../Components/Loading";
import ProductGallery from "./ProductGallery";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { addToCart, products } = useContext(CartContext);
  const { role, loggedIn } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const cachedProduct = products?.find((data) => data._id === id);
  const [product, setProduct] = useState(cachedProduct || null);
  const [loading, setLoading] = useState(!cachedProduct);

  // changed: Always fetch fresh /items/:id detail so gallery images are present even if cached from list
  useEffect(() => {
    let isMounted = true;

    const fetchProductById = async () => {
      try {
        if (!cachedProduct) setLoading(true);
        const res = await api.get(`/items/${id}`);
        if (isMounted) {
          setProduct(res.data.item);
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        if (isMounted && !cachedProduct) {
          toast.error(err.response?.data?.message || "Failed to load product details");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProductById();

    // Cleanup flag to prevent stale async responses on id change/unmount
    return () => {
      isMounted = false;
    };
  }, [id, cachedProduct]);

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
    toast.success("Added to Cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container px-4 sm:px-8 bg-gray-800 min-h-screen rounded-2xl my-8 p-6 md:p-12 border border-gray-800 flex flex-col items-center justify-center text-zinc-400">
        <p className="text-xl font-semibold mb-4">Product not found!</p>
        <Link to={`/home?page=${page}`}>
          <button className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all cursor-pointer">
            Back to Store
          </button>
        </Link>
      </div>
    );
  }

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

  const isDisabled = stockQuantity === 0 && role !== "admin";
  // changed: Extract URL strings from backend gallery objects (or plain URL strings) and remove hardcoded fallback
  const galleryImages = Array.isArray(product?.gallery)
    ? product.gallery
        .map((entry) => (typeof entry === "string" ? entry : entry?.url))
        .filter(Boolean)
    : [];

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
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h1 className="text-3xl font-bold text-white hover:text-yellow-300/80 transition-colors ease-in-out duration-300">
                {product?.name}
              </h1>

              {product?.discountPercentage > 0 && (
                <span className="bg-red-600 text-white px-3.5 py-1 text-xs font-bold rounded-full shadow-lg animate-bounce uppercase tracking-wider shrink-0">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-orange-400 text-sm font-semibold tracking-wide">PKR</span>
                <span className="text-white text-2xl font-bold">{product?.price}</span>
              </div>
              {product?.oldPrice && (
                <span className="text-zinc-500 text-sm line-through block mt-0.5">
                  PKR {product.oldPrice}
                </span>
              )}
            </div>

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

            {role !== "admin" && (
              <Link to={"/home"}>
                <button className="mt-5 flex items-center justify-center flex-row max-auto w-full py-3 bg-orange-400/10 border border-orange-500 text-white font-bold rounded-full hover:bg-orange-600/20 transition-all duration-200 cursor-pointer">
                  <span className="ml-2">Keep Shopping</span>
                </button>
              </Link>
            )}
          </div>
        </div>

        <ProductGallery images={galleryImages} productName={product?.name} />
      </div>
    </>
  );
}
