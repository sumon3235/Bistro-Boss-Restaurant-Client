import { useForm } from "react-hook-form";
import { MdOutlineFastfood } from "react-icons/md";
import SectionTile from "../Components/Shared/SectionTitle";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// Imgbbb hoisting api
const imageHoistingKey = import.meta.env.VITE_IMAGE_HOISTING_KEY;
const imageApi = `https://api.imgbb.com/1/upload?key=${imageHoistingKey}`;

const AddItem = () => {
  const axiosPublic = useAxiosPublic();
  const  axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
        const res = await axiosPublic.post(imageApi, formData, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url,
            };

            const menuRes = await axiosSecure.post('/menu', menuItem);
            
            if (menuRes.data.insertedId) {

                reset();
                Swal.fire({
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    } catch (error) {
        console.error("Error adding menu item:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
};

  return (
    <div>
      <SectionTile subHeading={"---What's new?---"} heading={"ADD AN ITEM"} />

      <section className="max-w-3xl mx-auto">
        <div className="border border-base-300 rounded-2xl p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
              {errors.name && (
                <p className="text-red-500 text-xs">Recipe name is required</p>
              )}
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category */}
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
                {errors.category && (
                  <p className="text-red-500 text-xs">Category is required</p>
                )}
              </div>

              {/* Price */}
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
                {errors.price && (
                  <p className="text-red-500 text-xs">Price is required</p>
                )}
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
              {errors.recipe && (
                <p className="text-red-500 text-xs">
                  Recipe details is required
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-base-content/60">
                Item Image*
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full bg-base-200 text-base-content text-sm px-4 py-3 rounded-lg border border-base-300 outline-none file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-[#BB8506] file:text-white hover:file:bg-[#a07205] transition-all"
              />
              {errors.image && (
                <p className="text-red-500 text-xs">Image is required</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-fit px-8 py-3 bg-[#BB8506] hover:bg-[#a07205] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors duration-300 flex items-center gap-2 active:scale-95"
            >
              Add Item
              <MdOutlineFastfood className="text-base" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddItem;
