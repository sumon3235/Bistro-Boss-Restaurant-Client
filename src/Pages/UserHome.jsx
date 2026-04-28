import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../context/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // TanStack Query দিয়ে ডাটা আনা
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#1E2129]">
        <span className="loading loading-spinner loading-lg text-[#BB8506]"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2129] p-4 lg:p-8 text-gray-200">
      {/* Main Container - max-w-6xl Restriction */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold nunito-font text-white">HI, WELCOME BACK!</h2>
          <p className="text-gray-400 mt-1">{user?.displayName || user?.email}</p>
        </div>

        {/* Top 3 Quick Navigation Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="px-6 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#8B5CF6' }}>Menu 205</button>
          <button className="px-6 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#92400E' }}>Shop 103</button>
          <button className="px-6 py-2 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: '#EC4899' }}>Contact 03</button>
        </div>

        {/* Main Content Area: Profile & Stats */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          
          {/* Left: User Profile Circle */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="avatar">
              <div className="w-32 md:w-36 rounded-full ring-4 ring-[#BB8506] ring-offset-4 ring-offset-[#1E2129]">
                <img 
                  src={user?.photoURL || "https://i.ibb.co.com/4ZpKHj9/default-avatar.png"} 
                  alt="User Profile" 
                  className="bg-gray-700"
                />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-center nunito-font text-white">
              {user?.displayName || "User Name"}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          {/* Right: Activities Stats Card (Dark Card with Gold Accent) */}
          <div className="flex-1 w-full">
            <div className="bg-[#262A35] border-l-4 border-[#BB8506] p-8 md:p-10 rounded-r-2xl shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 nunito-font text-white">YOUR ACTIVITIES</h2>
              
              <div className="space-y-6">
                {/* Orders */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                  <span className="text-lg md:text-xl font-semibold text-gray-400 tracking-wide">ORDERS:</span>
                  <span className="text-3xl font-bold text-[#BB8506]">{stats.orders || 0}</span>
                </div>

                {/* Reviews */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                  <span className="text-lg md:text-xl font-semibold text-gray-400 tracking-wide">REVIEWS:</span>
                  <span className="text-3xl font-bold text-[#BB8506]">{stats.reviews || 0}</span>
                </div>

                {/* Bookings */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                  <span className="text-lg md:text-xl font-semibold text-gray-400 tracking-wide">BOOKINGS:</span>
                  <span className="text-3xl font-bold text-[#BB8506]">{stats.bookings || 0}</span>
                </div>

                {/* Payments */}
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold text-gray-400 tracking-wide">PAYMENT:</span>
                  <span className="text-3xl font-bold text-[#BB8506]">{stats.payments || 0}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserHome;