export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  
  return (
    <div className="flex justify-center items-center gap-2 mt-10 mb-8">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border transition
          ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-orange-400 hover:text-black"
          }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg border transition
              ${
                currentPage === page
                  ? "bg-white text-black shadow-lg"
                  : "hover:bg-orange-400 hover:text-black"
              }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border transition
          ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-orange-400 hover:text-black"
          }`}
      >
        Next
      </button>
    </div>
  );
}