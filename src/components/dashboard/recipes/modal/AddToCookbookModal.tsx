import { Link } from "react-router-dom";
import useGetCookbooks from "@/hooks/cookbook/useGetCookbooks";
import { IRecipe } from "@/types";
import { ROUTE_PATHS } from "@/utils/constants";
import { Add } from "@mui/icons-material";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants";
import ClearIcon from '@mui/icons-material/Clear';
import useAddRecipeToCookbook from "@/hooks/cookbook/useAddRecipeToCookbook";
import { useCallback } from "react";

type IProps = {
    recipe?: IRecipe;
}

const AddToCookbookModal: React.FC<IProps> = ({
    recipe,
}) => {

    /////////////////////////////////
    // GET COOKBOOKS ////////////////
    /////////////////////////////////

    const getCookbookQueryParams = {
        selection: 'title',
        excludedRecipeId: recipe?.id,
        pageSize: 15,
        search: undefined,
    }

    const {
        cookbooks,
        isLoadingCookbooks,
        lastElementRef,
        errorWhileGettingCookbooks,
        refetchUserCookbooks,
    } = useGetCookbooks(getCookbookQueryParams);

    const {
        addRecipeToCookbook,
        isAddingRecipeToCookbook,
    } = useAddRecipeToCookbook(getCookbookQueryParams)


    /////////////////////////////////
    // FUNCTIONS ////////////////////
    /////////////////////////////////

    // Add recipe to cookbook func.
    const handleAddRecipeToCookbook = useCallback((cookbookId: number) => {
        if (isAddingRecipeToCookbook) return;
        addRecipeToCookbook({
            recipeId: recipe?.id!,
            cookbookId,
        });
    }, []);

    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////

    return (
        <div className="modal" role="dialog">

            <div className="modal-box flex flex-col gap-2">

                {
                    errorWhileGettingCookbooks ? (
                        <div className="flexCenterCenter m-auto gap-3 flex-col">

                            <div className="text-base font-bold">

                                <ClearIcon className='text-red-600 text-lg' />


                                Something went wrong...
                            </div>

                            <button className="common_btn" onClick={() => refetchUserCookbooks()}>Try again</button>

                        </div>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-center text-white">Add this recipe to a cookbook</h3>

                            {/* CREATE COOKBOOK BTN */}
                            <Link
                                to={ROUTE_PATHS.COOKBOOKS}
                                className="w-full"
                            >
                                <button className="w-full btn flex justify-center items-center common_btn">

                                    <Add />

                                    Create a cookbook

                                </button>
                            </Link>


                            <div
                                className="flex justify-start items-center flex-col  p-4 gap-3 h-60 overflow-y-auto overflow-x-hidden w-full"
                            >
                                {
                                    !isLoadingCookbooks ? cookbooks?.map((cookbook, idx) => {
                                        return (
                                            <div
                                                ref={idx === cookbooks.length - 1 ? lastElementRef : undefined}
                                                key={`add_modal_cookbook_${cookbook.id}`}
                                                className="p-2 text-white font-medium text-base rounded cursor-pointer hover:bg-app-green-hover transition w-full text-center bg-base-200"
                                                onClick={() => handleAddRecipeToCookbook(cookbook.id)}
                                            >
                                                {
                                                    cookbook.title
                                                }
                                            </div>
                                        )
                                    }) : (
                                        <div className="flexCenterCenter m-auto gap-2">
                                            <span className="loading loading-spinner text-success"></span>

                                            <div className="text-base font-bold">
                                                Getting your cookbooks...
                                            </div>

                                        </div>
                                    )
                                }

                            </div>

                        </>
                    )
                }



            </div>
            <label className="modal-backdrop" htmlFor={RECIPE_ACTION_MODAL_IDS.ADD_TO_ADD_COOKBOOK}>Close</label>
        </div>
    )
}

export default AddToCookbookModal;