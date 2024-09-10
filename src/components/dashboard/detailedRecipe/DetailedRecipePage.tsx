import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { RECIPE_ACTION_MODAL_IDS, ROUTE_PATHS } from "@/utils/constants";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteRecipeModal from "../recipes/modal/DeleteRecipeModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRecipeButton from "../recipes/utilities/DeleteRecipeButton";

const DetailedRecipePage = () => {

  const navigate = useNavigate();
  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);

  return (
    <div className="flex justify-start items-center flex-col gap-4 h-full w-full overflow-auto px-2 border">

      {/* HEADER */}
      <div className="flex justify-center items-center gap-4 w-full">

        {/* EDIT */}
        <Link to={`/dashboard/recipes/${recipeId}/edit`}>
          <button className="btn text-white bg-gray-600 hover:bg-gray-700">
            <EditIcon />
            Edit
          </button>
        </Link>

        {/* //TODO: SHARE */}
        <button>

        </button>

        {/* DELETE */}
        <DeleteRecipeButton 
          recipe={recipe!}
        />
        
      </div>

      {/* //TODO: MAIN CONTENT */}
      {/* LEFT SIDE: IMAGE + INGREDIENTS */}

      {/* RIGTH SIDE: TITLE + DESCRIPTION + AUTHOR + PREP TIME  */}
      {/* COOK TIME */}
      {/* INSTRUCTIONS (can be clicked to say that they are done) */}


    </div>
  )
}

export default DetailedRecipePage