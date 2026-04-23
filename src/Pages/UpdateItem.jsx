import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { MdOutlineFastfood } from "react-icons/md";
import SectionTile from "../Components/Shared/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const imageApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOISTING_KEY}`;

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  // Load item data
  useEffect(() => {
    axiosSecure.get(`/menu/${id}`)
      .then((res) => {
        setItem(res.data);
        reset({
          name: res.data.name,
          category: res.data.category,
          price: res.data.price,
          recipe: res.data.recipe,
        });
      })
      .catch(() => toast.error("Failed to load item!"))
      .finally(() => setLoading(false));
  }, [id, axiosSecure, reset]);

  // Form submit
  const onSubmit = async (data) => {
    try {
      let imageUrl = item?.image;

      if (data.image?.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const uploadRes = await axiosPublic.post(imageApi, formData);
        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.data.display_url;
        }
      }

      // Updated item object
      const updatedItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: imageUrl,
      };

      // Server এ PUT request
      const res = await axiosSecure.put(`/menu/${id}`, updatedItem);
      if (res.data.modifiedCount || res.data.acknowledged) {
        toast.success(`${data.name} updated successfully!`);
        navigate("/dashboard/manageItem");
      }
    } catch {
      toast.error("Update failed! Please try again.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-base-content/50 text-sm uppercase tracking-widest">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div>
      <SectionTile
        subHeading={"---Update Item---"}
        heading={"UPDATE MENU ITEM"}
      />

      <section className="max-w-3xl mx-auto">
        <div className="border border-base-300 rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Recipe Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                Recipe Name*
              </label>
              <input
                type="text"
                placeholder="Recipe name"
                {...register("name", { required: true })}
                className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none focus:border-[#BB8506] transition-colors duration-300 placeholder:text-base-content/30"
              />
              {errors.name && <p className="text-red-500 text-xs">Recipe name is required</p>}
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                  Category*
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none focus:border-[#BB8506] transition-colors duration-300"
                >
                  <option value="">Select category</option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="offered">Offered</option>
                  <option value="drinks">Drinks</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs">Category is required</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                  Price*
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  step="0.01"
                  {...register("price", { required: true })}
                  className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none focus:border-[#BB8506] transition-colors duration-300 placeholder:text-base-content/30"
                />
                {errors.price && <p className="text-red-500 text-xs">Price is required</p>}
              </div>

            </div>

            {/* Recipe Details */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                Recipe Details*
              </label>
              <textarea
                placeholder="Recipe Details"
                rows={5}
                {...register("recipe", { required: true })}
                className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none focus:border-[#BB8506] transition-colors duration-300 placeholder:text-base-content/30 resize-none"
              />
              {errors.recipe && <p className="text-red-500 text-xs">Recipe details is required</p>}
            </div>

            {/* Current Image + Upload */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                Item Image
              </label>

              {/* Current image preview */}
              <img
                src={item?.image}
                alt={item?.name}
                className="w-24 h-24 rounded-xl object-cover border border-base-300"
              />

              {/* New image upload */}
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-[#BB8506] file:text-white hover:file:bg-[#a07205] transition-all"
              />
              <p className="text-[11px] text-base-content/40">
                Leave empty to keep existing image
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-fit px-8 py-3 bg-[#BB8506] hover:bg-[#a07205] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors duration-300 flex items-center gap-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Item"}
              <MdOutlineFastfood className="text-base" />
            </button>

          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateItem;