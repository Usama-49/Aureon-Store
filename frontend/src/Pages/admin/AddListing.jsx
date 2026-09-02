import { ChevronLeft, PackagePlus } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loading from "../../Components/Loading";
import api from "../../services/api/api";
import ConfirmModal from "../../Components/ConfirmModal";

export default function AddListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products } = useContext(CartContext);
  const item = products.find((p) => p._id === id);
  const [loading, setLoading] = useState(false);
  const [show,setShow] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [formData, setFormData] = useState(null);
  
  const categories = ["Laptop", "Phone","History", "Camera", "Tablet", "Anime","HollyWood"];
  const handleFormSubmit = (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    setFormData(data);
    setShow(true);
  }
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setConfirming(true)
      if (id) {
        await api.patch(`/admin/items/${id}`,formData);
        toast.success("Updating Product successful");
      } else {
        await api.post("/admin/addItem",formData);
        toast.success("Listing successful");
      }
      navigate("/home");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            navigate("/admin");
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
              <label className="block text-zinc-300 mb-2 font-medium">Product Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                defaultValue={id ? item?.name : ""}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Product Price ($)</label>

              <input
                type="number"
                name="price"
                defaultValue={id ? item?.price : ""}
                placeholder="1199"
                min="1"
                step="0.01"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Product Category</label>

              <select
                name="category"
                defaultValue={id ? item?.category : ""}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-all cursor-pointer"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-zinc-900">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Quantity In Stock</label>

              <input
                type="number"
                name="stock"
                defaultValue={id ? item?.stock : ""}
                placeholder="50"
                min="0"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-all"
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
                required= {!id}              />
            </div>

            <div>
              <label className="block text-zinc-300 mb-2 font-medium">Product Description</label>

              <textarea
                rows="6"
                name="description"
                defaultValue={id ? item?.description : ""}
                placeholder="Enter detailed product description..."
                className="w-full resize-none bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
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
        <ConfirmModal isOpen={show} onCancel={()=>setShow(false)} onConfirm={handleSubmit} isConfirming={confirming}/>
      </div>
    </div>
  );
}
