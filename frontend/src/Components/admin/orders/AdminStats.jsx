import { PackageCheck, Clock3, CircleDollarSign, Truck } from "lucide-react";

export default function AdminStats({ orders }) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter((order) => order.orderStatus === "Pending").length;

  const deliveredOrders = orders.filter((order) => order.orderStatus === "Delivered").length;

  const totalRevenue = orders
    .filter((order) => order.paymentStatus === "Paid")
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: PackageCheck,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
      iconColor: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: Truck,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue}`,
      icon: CircleDollarSign,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`bg-zinc-900 border ${stat.borderColor} rounded-2xl p-5 transition-all duration-300
            hover:scale-[1.02] hover:shadow-lg hover:${stat.borderColor.replace("/20", "/60")}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">{stat.title}</p>

                <h2 className="text-3xl font-bold text-white mt-2">{stat.value}</h2>
              </div>

              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <Icon className={stat.iconColor} size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
