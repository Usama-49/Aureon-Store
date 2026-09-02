import {Search} from "lucide-react";

export default function SearchFilter({searchQuery, setSearchQuery}) {
  return (
    <>
      <div className="mb-5 p-5 rounded-2xl shadow-xl border border-gray-800 ">
        <div className="flex items-center border border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-600/50 transition-all duration-300">
          <Search className="w-5 h-5 text-gray-500 ml-4" />
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            type="text"
            placeholder="Search Products Here"
            className="w-full p-4 outline-none text-white placeholder-gray-500 text-base font-medium"
          />
        </div>
      </div>
    </>
  );
}
