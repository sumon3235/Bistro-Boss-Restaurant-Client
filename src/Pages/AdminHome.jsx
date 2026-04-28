import { useQuery } from "@tanstack/react-query";
import { FaWallet, FaUsers, FaShoppingBag, FaTruck } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch admin stats from the server
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Map the stats data to card objects for rendering
  const cards = [
    {
      label: "Revenue",
      // Match with 'reveneu' from your API response
      value: stats.reveneu || 0,
      icon: <FaWallet className="text-2xl" />,
      bg: "from-purple-500 to-pink-500",
    },
    {
      label: "Customers",
      // Match with 'user' from your API response
      value: stats.user || 0,
      icon: <FaUsers className="text-2xl" />,
      bg: "from-yellow-500 to-orange-400",
    },
    {
      label: "Products",
      // Match with 'menu' from your API response
      value: stats.menu || 0,
      icon: <FaShoppingBag className="text-2xl" />,
      bg: "from-pink-500 to-rose-400",
    },
    {
      label: "Orders",
      // Match with 'orders' from your API response
      value: stats.orders || 0,
      icon: <FaTruck className="text-2xl" />,
      bg: "from-blue-400 to-indigo-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-40">
      {/* Welcome Message */}
      <h2 className="text-2xl font-bold text-base-content mb-6 font-serif">
        Hi, Welcome Back!
      </h2>

      {/* Grid container for stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${card.bg} rounded-2xl px-6 py-5 flex items-center gap-4 text-white shadow-lg justify-center`}
          >
            {/* Display Card Icon */}
            <div className="opacity-80">{card.icon}</div>

            {/* Display Card Value and Label */}
            <div>
              <p className="text-3xl font-black leading-none">{card.value}</p>
              <p className="text-sm font-medium opacity-80 mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;