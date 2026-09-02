import { useContext, useEffect, useState } from "react";
import CategoryFilter from "../../../Components/CategoryFilter";
import Search from "../../../Components/Search";
import { CartContext } from "../../../Context/CartContext";
import ProductCard from "../../../Components/ProductCard";
import Pagination from "../../../Components/Pagination";
import Loading from "../../../Components/Loading";
import { useSearchParams } from "react-router-dom";
import api from "../../../services/api/api";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { products, fetchProducts, totalProducts, loading } = useContext(CartContext);

  const [selectedCategory, setselectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [total,setTotal] = useState(0);

  const totalPages = Math.ceil(totalProducts / 12);

  useEffect(() => {
    const fetch = async ()=>{
      try{
        fetchProducts(currentPage);
        const res = await api.get("/admin/totalProducts");
        setTotal(res.data.total); 
      } catch (err){
        console.log(err.response?.data?.message || "Something went wrong");

      }
    };
    fetch();
  }, [currentPage]);

  const filteredProducts = products.filter((prod) => {
    const categoryMatch = selectedCategory === "All" || prod.category === selectedCategory;

    const searchMatch = prod.name.toLowerCase().includes(searchQuery.toLowerCase().trim());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 md:px-8 pt-8">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setselectedCategory={setselectedCategory}
      />

      <h2 className="text-lg font-bold mb-5">Total ({total} Items)</h2>

      {loading ? (
        <div className="min-h-125 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod._id} product={prod} currentPage={currentPage} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setSearchParams({ page: page })}
      />
    </div>
  );
}
