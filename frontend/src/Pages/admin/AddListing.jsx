import { ChevronLeft, PackagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import api from "../../services/api/api";
import ConfirmModal from "../../Components/ConfirmModal";

const GALLERY_FIELDS = [
  { label: "Image 1", name: "galleryImage1" },
  { label: "Image 2", name: "galleryImage2" },
  { label: "Image 3", name: "galleryImage3" },
  { label: "Image 4", name: "galleryImage4" },
];

// Centralize field limits matching backend express-validator rules
const FIELD_LIMITS = {
  name: 100,
  category: 50,
  description: 2000,
  price: 9999999,
  stock: 9999,
};

export default function AddListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useContext(CartContext);
  const item = products.find((p) => p._id === id);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [formData, setFormData] = useState(null);
  // Track live field values to display character/numeric counters and limit warnings
  const [fieldValues, setFieldValues] = useState({
    name: id ? item?.name || "" : "",
    price: id && item?.price != null ? String(item.price) : "",
    oldPrice: id && item?.oldPrice != null ? String(item.oldPrice) : "",
    category: id ? item?.category || "" : "",
    stock: id && item?.stock != null ? String(item.stock) : "",
    description: id ? item?.description || "" : "",
  });

  // Update tracked field value on input change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  // Compute live lengths and out-of-range flags for visual red indicators
  const nameLength = fieldValues.name.trim().length;
  const categoryLength = fieldValues.category.trim().length;
  const descriptionLength = fieldValues.description.trim().length;
  const isNameOver = nameLength > FIELD_LIMITS.name;
  const isCategoryOver = categoryLength > FIELD_LIMITS.category;
  const isDescriptionOver = descriptionLength > FIELD_LIMITS.description;
  const isPriceOver = fieldValues.price !== "" && Number(fieldValues.price) > FIELD_LIMITS.price;
  const isOldPriceOver =
    fieldValues.oldPrice !== "" && Number(fieldValues.oldPrice) > FIELD_LIMITS.price;
  const isStockOver = fieldValues.stock !== "" && Number(fieldValues.stock) > FIELD_LIMITS.stock;
  const hasLimitError =
    isNameOver ||
    isCategoryOver ||
    isDescriptionOver ||
    isPriceOver ||
    isOldPriceOver ||
    isStockOver;

  const formatCategory = (str) => {
    if (!str) return "";
    return str
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (hasLimitError) {
      toast.error("Please fix the fields exceeding their maximum limit ❌");
      return;
    }
    const data = new FormData(e.target);
    const rawCategory = data.get("category");
    if (rawCategory) {
      data.set("category", formatCategory(rawCategory));
    }
    setFormData(data);
    setShow(true);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setConfirming(true);
      if (id) {
        await api.patch(`/admin/items/${id}`, formData);
        toast.success("Updating Product successful");
      } else {
        await api.post("/admin/addItem", formData);
        toast.success("Listing successful");
      }
      navigate("/home");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
      setConfirming(false);
      setShow(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-all duration-300 cursor-pointer mb-8"
        >
          <ChevronLeft size={20} />
          <span className="font-medium">Go Back</span>
        </button>

        <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <PackagePlus className="text-orange-500" size={30} />

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {id ? "Edit Product" : "Add New Product"}
            </h1>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              {/* Label row with tiny x/100 character counter that turns red if exceeded */}
              <div className="flex items-center justify-between mb-2">
                <label className="block text-zinc-300 font-medium">Product Name</label>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isNameOver ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {nameLength}/{FIELD_LIMITS.name}
                </span>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                value={fieldValues.name}
                onChange={handleFieldChange}
                className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                  isNameOver
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
                required
              />
            </div>

            <div>
              {/* Label row with tiny max 9,999,999 limit indicator that turns red if exceeded */}
              <div className="flex items-center justify-between mb-2">
                <label className="block text-zinc-300 font-medium">Product Price (PKR)</label>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isPriceOver ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {Number(fieldValues.price || 0).toLocaleString()}/
                  {FIELD_LIMITS.price.toLocaleString()}
                </span>
              </div>

              <input
                type="number"
                name="price"
                value={fieldValues.price}
                onChange={handleFieldChange}
                placeholder="1199"
                min="1"
                max={FIELD_LIMITS.price}
                step="0.01"
                className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                  isPriceOver
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
                required
              />
            </div>

            {id && (
              <div>
                {/* Label row with tiny max 9,999,999 limit indicator for oldPrice */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="block text-zinc-300 font-medium">
                    Old Price (PKR){" "}
                    <span className="text-zinc-400 text-sm font-normal">
                      (Optional - leave empty to remove sale)
                    </span>
                  </label>
                  <span
                    className={`text-xs font-medium shrink-0 transition-colors ${
                      isOldPriceOver ? "text-red-400" : "text-zinc-500"
                    }`}
                  >
                    {Number(fieldValues.oldPrice || 0).toLocaleString()}/
                    {FIELD_LIMITS.price.toLocaleString()}
                  </span>
                </div>

                <input
                  type="number"
                  name="oldPrice"
                  value={fieldValues.oldPrice}
                  onChange={handleFieldChange}
                  placeholder="e.g. 1999 (must be higher than current price)"
                  min="1"
                  max={FIELD_LIMITS.price}
                  step="0.01"
                  className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                    isOldPriceOver
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-orange-500"
                  }`}
                />
              </div>
            )}

            <div>
              {/* Label row with tiny x/50 character counter for category */}
              <div className="flex items-center justify-between mb-2">
                <label className="block text-zinc-300 font-medium">Product Category</label>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isCategoryOver ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {categoryLength}/{FIELD_LIMITS.category}
                </span>
              </div>
              <input
                type="text"
                name="category"
                value={fieldValues.category}
                onChange={handleFieldChange}
                placeholder="e.g. Anime, Hollywood, Laptops"
                className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                  isCategoryOver
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
                required
              />
            </div>

            <div>
              {/* Label row with tiny x/9,999 stock indicator that turns red above 9999 */}
              <div className="flex items-center justify-between mb-2">
                <label className="block text-zinc-300 font-medium">Quantity In Stock</label>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isStockOver ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {Number(fieldValues.stock || 0).toLocaleString()}/
                  {FIELD_LIMITS.stock.toLocaleString()}
                </span>
              </div>

              <input
                type="number"
                name="stock"
                value={fieldValues.stock}
                onChange={handleFieldChange}
                placeholder="50"
                min="0"
                max={FIELD_LIMITS.stock}
                className={`w-full bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                  isStockOver
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Product Image</label>

              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-300 file:bg-orange-500
                file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 cursor-pointer"
                required={!id}
              />
            </div>

            <div className="bg-zinc-900/70 border border-zinc-700/80 rounded-2xl p-4 sm:p-5">
              <div className="mb-4">
                <h2 className="text-zinc-200 font-semibold text-base">
                  Gallery Images{" "}
                  <span className="text-orange-400 text-xs font-medium ml-1">
                    (Optional {id ? "- leave empty to keep existing" : "- up to 4 extra views"})
                  </span>
                </h2>
                <p className="text-zinc-400 text-xs mt-1">
                  Add up to 4 additional showcase images (Image 1 to Image 4).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {GALLERY_FIELDS.map(({ label, name }) => (
                  <div key={name} className="bg-zinc-900 border border-zinc-700/80 rounded-xl p-3">
                    <label htmlFor={name} className="block text-zinc-300 text-sm mb-2 font-medium">
                      {label} <span className="text-zinc-500 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                      id={name}
                      type="file"
                      name={name}
                      accept="image/*"
                      className="w-full text-sm text-zinc-300 file:bg-orange-500/90 file:hover:bg-orange-500 file:text-white file:border-none file:px-3 file:py-1.5 file:rounded-lg file:mr-3 file:text-xs file:font-semibold cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Label row with tiny x/2000 character counter that turns red above 2000 */}
              <div className="flex items-center justify-between mb-2">
                <label className="block text-zinc-300 font-medium">Product Description</label>
                <span
                  className={`text-xs font-medium transition-colors ${
                    isDescriptionOver ? "text-red-400" : "text-zinc-500"
                  }`}
                >
                  {descriptionLength}/{FIELD_LIMITS.description}
                </span>
              </div>

              <textarea
                rows="6"
                name="description"
                value={fieldValues.description}
                onChange={handleFieldChange}
                placeholder="Enter detailed product description..."
                className={`w-full resize-none bg-zinc-900 border rounded-xl px-4 py-3 text-white outline-none transition-all ${
                  isDescriptionOver
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-orange-500"
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || hasLimitError}
              className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? id
                  ? "Updating product"
                  : "Listing Product..."
                : id
                  ? "Update Product"
                  : "List Product"}
            </button>
          </form>
        </div>
        <ConfirmModal
          isOpen={show}
          onCancel={() => setShow(false)}
          onConfirm={handleSubmit}
          isConfirming={confirming}
        />
      </div>
    </div>
  );
}
