import Banner from "../../Components/Banner";
import Category from "../../Components/Category";
import ChefRecomended from "./ChefRecomended";
import ChefService from "./ChefService";
import PopulerItem from "./PopulerItem";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <ChefService></ChefService>
            <PopulerItem></PopulerItem>
            <ChefRecomended></ChefRecomended>
        </div>
    );
};

export default Home;