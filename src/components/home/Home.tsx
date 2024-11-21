import Features from "./components/Features";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

//TODO
const Home = () => {

    return (
        <div className="bg-base-100 text-white">
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <Features />

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home;