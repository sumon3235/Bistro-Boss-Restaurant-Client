import { useEffect, useState } from "react";
import SectionTile from "../../Components/Shared/SectionTile";
import ChefMenuItem from "./ChefMenuItem";


const ChefRecomended = () => {

    const [menu, setMenu] = useState([]);
    useEffect( () => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const OfferedItem = data.slice(0, 3);
            setMenu(OfferedItem);
        })
    },[])
    console.log(menu)

    return (
        <section>
            {/* Title Section */}
            <SectionTile subHeading={"---Should Try---"} heading={'CHEF RECOMMENDS'}/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto px-2 md:px-3.5">
                {
                    menu.map(item => <ChefMenuItem key={item._id} item={item}></ChefMenuItem>)
                }
            </div>
        </section>
    );
};

export default ChefRecomended;