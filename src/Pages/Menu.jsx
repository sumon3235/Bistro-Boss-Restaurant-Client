import { Helmet } from "react-helmet-async";
import Cover from "../Components/Shared/Cover";
import bgImg from '../assets/home/banner.jpg'

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
     

     <Cover img={bgImg} title={"OUR MENU"} subTitle={"Would You Like To Try This"}></Cover>
    </div>
  );
};

export default Menu;
