import useGetCookbooks from "../../../hooks/cookbook/useGetCookbooks";
import { IRecipe } from "../../../types";

type IProps = {
    recipe: IRecipe;
}

const AddToCookbookModal: React.FC<IProps> = ({
    recipe,
}) => {

    /////////////////////////////////
    // GET COOKBOOKS ////////////////
    /////////////////////////////////

    const {
        cookbooks,
        isLoadingCookbooks,
    } = useGetCookbooks();


    /////////////////////////////////
    // RENDER ///////////////////////
    /////////////////////////////////

    return (
        <div className="modal" role="dialog">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-center">Add this recipe to a cookbook</h3>

                <div
                    className="join join-vertical border-red-600 border p-4 gap-2 max-h-40 overflow-y-auto overflow-x-hidden w-full scroll"
                >

                    {
                        cookbooks.map((cookbook) => {
                            return (
                                <div
                                    key={`add_modal_cookbook_${cookbook.id}`}
                                    className="p-2 text-white font-medium text-base rounded cursor-pointer hover:bg-app-green-hover transition w-full text-center"
                                >
                                    {
                                        cookbook.title
                                    }
                                </div>
                            )
                        })
                    }

                </div> 
                
                {/* CREATE COOKBOOK BTN */}
                    

            </div>
            <label className="modal-backdrop" htmlFor="add_to_cookbook">Close</label>
        </div>
    )
}

export default AddToCookbookModal;