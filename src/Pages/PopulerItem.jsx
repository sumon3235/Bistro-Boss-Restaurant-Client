import MenuItem from "./MenuItem";
import useMenu from "../hooks/useMenu";
import SectionTile from "../Components/Shared/SectionTitle";

const PopulerItem = () => {

  const [menu] = useMenu();
  const popular = menu.filter(item => item.category === 'popular')

  return (
    <section className="max-w-[1350px] mx-auto my-16">
      <SectionTile
        subHeading={"---Check it out---"}
        heading={"FROM OUR MENU"}
      ></SectionTile>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1350px] mx-auto">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>

      {/* btn */}
      <div className="flex justify-center mt-10">
        <button className="btn bg-orange-500 hover:bg-orange-600">
          View Full Menu
        </button>
      </div>
    </section>
  );
};

export default PopulerItem;
