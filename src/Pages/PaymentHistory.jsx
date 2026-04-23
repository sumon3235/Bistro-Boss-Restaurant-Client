import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../context/useAuth";
import SectionTile from "../Components/Shared/SectionTitle";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch payment history
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#BB8506]" />
      </div>
    );
  }

  return (
    <div>
      <SectionTile
        subHeading={"---At a Glance---"}
        heading={"PAYMENT HISTORY"}
      />

      <section className="max-w-5xl mx-auto">
        {/* Total */}
        <h3 className="text-lg font-bold text-base-content mb-4">
          Total Payments: {payments.length}
        </h3>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <div className="min-w-[650px]">

            {/* Header */}
            <div
              className="grid grid-cols-12 px-4 py-3 text-[10px] font-bold uppercase tracking-[2px] bg-[#BB8506]"
              style={{ color: "#1a1a1a" }}
            >
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-3 text-center">Transaction ID</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Items</div>
              <div className="col-span-2 text-center">Date</div>
              <div className="col-span-2 text-center">Status</div>
            </div>

            {/* Rows */}
            {payments.map((payment, index) => (
              <div
                key={payment._id}
                className="grid grid-cols-12 items-center px-4 py-3 border-b border-base-200 hover:bg-base-200 transition-colors duration-200"
              >
                {/* Index */}
                <div className="col-span-1 text-center text-sm text-base-content/50 font-semibold">
                  {index + 1}
                </div>

                {/* Transaction ID */}
                <div className="col-span-3 text-center">
                  <p className="text-[10px] font-mono text-[#BB8506] truncate px-2">
                    {payment.transactionId}
                  </p>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-sm font-bold text-base-content">
                  ${parseFloat(payment.price).toFixed(2)}
                </div>

                {/* Items count */}
                <div className="col-span-2 text-center text-sm text-base-content/70">
                  {payment.menuItemIds?.length || 0} items
                </div>

                {/* Date */}
                <div className="col-span-2 text-center text-xs text-base-content/50">
                  {new Date(payment.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg
                    ${payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>

              </div>
            ))}

            {/* Empty state */}
            {payments.length === 0 && (
              <div className="text-center py-16 text-base-content/40">
                <p className="text-sm uppercase tracking-widest">
                  No payment history found
                </p>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentHistory;