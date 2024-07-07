import { Link } from "react-router-dom";
import { IRecipe } from "../../../types/recipe.types";



type IProps = {
    recipe: IRecipe;
}

const RecipeCard: React.FC<IProps> = ({
    recipe,
}) => {

    return (
        <Link 
            to={`/dashboard/recipes/${recipe.id}`} 
            className="borde w-48 h-60 flex justify-start items-center flex-col gap-2 cursor-pointer hover:bg-gray-700 p-4 transition rounded"
        >
            
            <figure>
                <img src={recipe.image} alt={recipe.title} className="h-40 w-48 rounded shadow-lg object-cover"/>
            </figure>

            <div className="text-base font-bold text-white text-center">
                {recipe.title}
            </div>
            
        </Link>
    )
};

export default RecipeCard;