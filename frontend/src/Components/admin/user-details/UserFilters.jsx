export default function UserFilters({ selectedStatus, setSelectedStatus }) {
  const filters = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:border-orange-500">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Order History</h2>

        <p className="mt-1 text-sm text-zinc-400">
          Filter this user's orders by their current status.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {filters.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              selectedStatus === status
                ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "border-zinc-700 bg-zinc-950 text-zinc-300 hover:border-orange-500 hover:text-orange-400"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
