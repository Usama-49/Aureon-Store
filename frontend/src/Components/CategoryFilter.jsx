import {useContext, useState} from "react";
import {Tag} from "lucide-react";
import {CartContext} from "../Context/CartContext";

// const availableCategories = ["All", ...new Set(initialProducts.map((p) => p.category))];
export default function CategoryFilter({selectedCategory, setselectedCategory}) {
  const {availableCategories} = useContext(CartContext);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 border border-gray-800 pb-6">
        <Tag className="w-5 h-5 text-orange-500 mt-2 mr-2 sm:block" />
        {availableCategories.map((category) => (
          <button
            onClick={() => {
              setselectedCategory(category);
            }}
            className={`px-2 py-2 border rounded-full border-orange-400 hover:bg-orange-500/20 ${selectedCategory == category && `bg-orange-500 text-white`}`}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}
