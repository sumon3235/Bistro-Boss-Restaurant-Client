import { useEffect, useState } from "react";
import SectionTile from "../../Components/Shared/SectionTile";
import MenuItem from "./MenuItem";

const PopulerItem = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const populerItems = data.filter((item) => item.category === "popular");
        setMenu(populerItems);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto">
      <SectionTile
        subHeading={"---Check it out---"}
        heading={"FROM OUR MENU"}
      ></SectionTile>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {menu.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </section>
  );
};

export default PopulerItem;
