import MenuItem from "./MenuItem";

const MenuCategory = ({ items }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1350px] mx-auto mt-14 mb-7">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
