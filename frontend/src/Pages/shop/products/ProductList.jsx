import { useContext, useEffect, useState } from "react";
import CategoryFilter from "../../../Components/CategoryFilter";
import Search from "../../../Components/Search";
import { CartContext } from "../../../Context/CartContext";
import ProductCard from "../../../Components/ProductCard";
import Pagination from "../../../Components/Pagination";
import Loading from "../../../Components/Loading";
import { useSearchParams } from "react-router-dom";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { products, fetchProducts, totalProducts, loading } = useContext(CartContext);

  const [selectedCategory, setselectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(totalProducts / 12);

  useEffect(() => {
    fetchProducts(currentPage, searchQuery, selectedCategory);
  }, [currentPage, searchQuery, selectedCategory]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setSearchParams({ page: 1 });
  };

  const handleCategoryChange = (category) => {
    setselectedCategory(category);
    setSearchParams({ page: 1 });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pt-8">
      <Search searchQuery={searchQuery} setSearchQuery={handleSearchChange} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setselectedCategory={handleCategoryChange}
      />

      <h2 className="text-lg font-bold mb-5">Total ({totalProducts} Items)</h2>

      {loading ? (
        <div className="min-h-125 flex items-center justify-center">
          <Loading />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-zinc-400 py-16">
          <p className="text-lg">No products found matching your criteria!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod) => (
            <ProductCard key={prod._id} product={prod} currentPage={currentPage} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setSearchParams({ page: page })}
        />
      )}
    </div>
  );
}
