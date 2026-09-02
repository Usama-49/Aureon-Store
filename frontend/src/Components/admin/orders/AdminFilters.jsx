export default function AdminFilters({ selectedStatus, setSelectedStatus }) {
  const filters = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

  return (
    <div
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all 
    duration-300 hover:border-orange-500/70 hover:shadow-[0_0_0_1px_rgba(249,115,22,0.25)]"
    >
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setSelectedStatus(status)}
          className={`px-5 py-2.5 rounded-xl border text-sm m-2 font-medium transition-all duration-200 cursor-pointer
            ${
              selectedStatus === status
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-orange-500 hover:text-orange-400"
            }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
