import { CircleDollarSign, Clock3, PackageCheck, Truck } from "lucide-react";

export default function UserStats({ totalOrders, totalSpent, pendingOrders, deliveredOrders }) {
  const stats = [
    {
      title: "Orders",
      value: totalOrders,
      icon: PackageCheck,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/10",
      hoverBorder: "hover:border-orange-500/60",
    },
    {
      title: "Spent",
      value: `$${totalSpent}`,
      icon: CircleDollarSign,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/10",
      hoverBorder: "hover:border-blue-500/60",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/10",
      hoverBorder: "hover:border-yellow-500/60",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: Truck,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/10",
      hoverBorder: "hover:border-green-500/60",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`group rounded-2xl border ${stat.borderColor} ${stat.hoverBorder} bg-zinc-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-white">{stat.value}</h2>
              </div>

              <div
                className={`rounded-xl p-3 ${stat.bgColor} transition-all duration-300 group-hover:scale-110`}
              >
                <Icon size={26} className={stat.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
