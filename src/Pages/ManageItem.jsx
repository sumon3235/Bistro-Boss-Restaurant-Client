import { FaEdit, FaTrash } from "react-icons/fa";
import useMenu from "../hooks/useMenu";
import SectionTile from "../Components/Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Components/Shared/Loading";
import { Link } from "react-router";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  if (loading) {
    return <Loading />;
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Delete This Item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/menu/${item._id}`);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire(error.message);
      }
    }
  };

  return (
    <div>
      <SectionTile
        subHeading={"---Hurry Up!---"}
        heading={"MANAGE ALL ITEMS"}
      />

      <section className="max-w-5xl mx-auto">
        {/* Total items */}
        <h3 className="text-lg font-bold text-base-content mb-4">
          Total Items: {menu.length}
        </h3>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <div className="min-w-[600px]">
            {/* Header */}
            <div
              className="grid grid-cols-12 px-4 py-3 text-[10px] font-bold uppercase tracking-[2px] bg-[#BB8506]"
              style={{ color: "#1a1a1a" }}
            >
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-2 text-center">Image</div>
              <div className="col-span-3 text-center">Name</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            {/* Rows */}
            {menu.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-12 items-center px-4 py-3 border-b border-base-200 hover:bg-base-200 transition-colors duration-200"
              >
                {/* Index */}
                <div className="col-span-1 text-center text-sm text-base-content/50 font-semibold">
                  {index + 1}
                </div>

                {/* Image */}
                <div className="col-span-2 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>

                {/* Name */}
                <div className="col-span-3 text-center text-sm text-base-content font-medium">
                  {item.name}
                </div>

                {/* Category */}
                <div className="col-span-2 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#BB8506]/10 text-[#BB8506] px-2 py-1 rounded-lg">
                    {item.category}
                  </span>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center text-sm font-bold text-[#BB8506]">
                  ${parseFloat(item.price).toFixed(2)}
                </div>

                {/* Action */}
                <div className="col-span-2 flex justify-center gap-2">

                    {/* Update A Item */}
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className="w-8 h-8 bg-[#BB8506] hover:bg-[#a07205] text-white rounded-lg flex items-center justify-center transition-colors duration-200 active:scale-95">
                      <FaEdit className="text-xs" />
                    </button>
                  </Link>

                  {/* Delete A item */}
                  <button
                    onClick={() => handleDelete(item)}
                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200 active:scale-95"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty state */}
            {menu.length === 0 && (
              <div className="text-center py-16 text-base-content/40">
                <p className="text-sm uppercase tracking-widest">
                  No items found
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageItems;
