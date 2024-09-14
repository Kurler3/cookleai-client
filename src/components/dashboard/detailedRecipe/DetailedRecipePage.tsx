import useGetRecipe from "@/hooks/recipes/useGetRecipe.hook";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteRecipeButton from "../recipes/utilities/DeleteRecipeButton";
import ShareRecipeButton from "../recipes/utilities/ShareRecipeButton";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import useCanEditRecipe from "@/hooks/recipes/useCanEditRecipe.hook";

const DetailedRecipePage = () => {

  const navigate = useNavigate();
  const { recipeId } = useParams();

  const {
    isLoadingRecipe,
    errorWhileGettingRecipe,
    recipe,
  } = useGetRecipe(recipeId);

  const canEditRecipe = useCanEditRecipe(recipe);

  /////////////////////////////////////
  // RETURN ///////////////////////////
  /////////////////////////////////////

  //TODO: Handle
  if (isLoadingRecipe) {
    return <div>Loading...</div>
  }

  //TODO: Handle
  if (errorWhileGettingRecipe) {
    return <div>Error while getting recipe</div>
  }

  return (
    <div className="flex justify-start items-center flex-col gap-4 h-full w-full overflow-auto px-2">

      {/* HEADER */}
      {
        canEditRecipe && (
          <div className="flex justify-center items-center gap-4 w-full">

            {/* EDIT */}
            <Link to={`/dashboard/recipes/${recipeId}/edit`}>
              <button className="btn text-white border border-gray-400 hover:border-gray-400">
                <EditIcon />
                Edit
              </button>
            </Link>

            {/* SHARE */}
            <ShareRecipeButton
              recipe={recipe}
              buttonClassName="btn border border-gray-400 hover:border-gray-400 text-white"
            />

            {/* DELETE */}
            <DeleteRecipeButton
              recipe={recipe!}
            />

          </div>
        )
      }


      {/* //TODO: MAIN CONTENT */}
      <div className="flex justify-center items-start gap-4 w-[70%] p-4">

        {/* LEFT SIDE: IMAGE + INGREDIENTS */}
        <div className="flex flex-1 flex-col justify-start items-center gap-4">

          {/* IMAGE */}
          <div className="w-full border flex justify-center items-center rounded border-gray-600">
            <img
              src={recipe?.image ?? recipePlaceholderImg}
              alt={recipe?.title}
              className="w-80 h-80 object-cover rounded"
            />
          </div>


          {/* INGREDIENTS */}
          <div className="flex justify-start items-start flex-col gap-4 w-full p-4">

            {/* TITLE */}
            <h3 className="text-white text-xl font-medium">
              Ingredients
            </h3>

            {/* SERVINGS */}
            <div className="text-base">
              <span className="text-white">Servings:</span> {recipe?.servings ? `${recipe?.servings} servings` : 'No servings specified'}
            </div>

            {/* LIST OF INGREDIENTS */}
            {
              recipe?.ingredients && recipe?.ingredients.length ? (
                recipe?.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex justify-start items-center gap-2 text-white font-medium">
                    <input type="checkbox" className="checkbox checkbox-success" />
                    <span className="text-sm">{ingredient.name}</span>
                  </div>
                ))
              ) : (
                <div>
                  No ingredients found!
                </div>
              )

            }

          </div>

        </div>

        {/* RIGTH SIDE: TITLE + DESCRIPTION + AUTHOR + PREP TIME  */}
        <div className="flex-1 h-80 border border-green-600 flex flex-col justify-start items-start gap-4">

          {/* TITLE */}
          <h2 className="text-2xl text-white font-medium">
            {recipe?.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="min-h-52 bg-red-600">
            {recipe?.description}
          </p>

          <div className="flex gap-4">

            {/* AUTHOR */}
            <div className="flex justify-center items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={recipe?.createdByUser?.avatar} />
                </div>
              </div>
              <div>
                Author: <span className="font-medium">{recipe?.createdByUser?.firstName}</span>
              </div>
            </div>

            {/* PREP TIME */}
            

            {/* COOK TIME */}


          </div>



        </div>

      </div>

    </div>
  )
}

export default DetailedRecipePage