import Banner from "../../Components/Banner";
import Category from "../../Components/Category";
import ChefService from "./ChefService";
import PopulerItem from "./PopulerItem";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <ChefService></ChefService>
            <PopulerItem></PopulerItem>
        </div>
    );
};

export default Home;