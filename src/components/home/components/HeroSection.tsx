import { Link } from "react-router-dom";
import { useGetUser } from "../../../hooks/user";

const HeroSection = () => {

    const {
        isLoggedIn
    } = useGetUser();

    return (
      <div className="hero min-h-[600px] ">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-green-500">
              Cook Smarter with Cookle AI
            </h1>
            <p className="py-6 text-gray-300">
              Discover personalized recipes, save time, and explore global cuisines tailored just for you.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to={isLoggedIn ? '/dashboard/recipes' : '/login'}
                className="btn bg-green-500 hover:bg-green-600 text-black font-semibold">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  