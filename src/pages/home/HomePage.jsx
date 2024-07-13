import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import Track from "../../components/track/Track";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/>
            <Category/>
            <Track/>
        </Layout>
    );
}

export default HomePage;
