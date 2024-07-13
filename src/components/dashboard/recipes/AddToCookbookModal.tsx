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
                    className="flex justify-center items-center flex-col"
                >

                    {
                        cookbooks.map((cookbook) => {
                            return (
                                <div
                                    key={`add_modal_cookbook_${cookbook.id}`}
                                >
                                    {
                                        cookbook.title
                                    }
                                </div>
                            )
                        })
                    }

                </div> 


            </div>
            <label className="modal-backdrop" htmlFor="add_to_cookbook">Close</label>
        </div>
    )
}

export default AddToCookbookModal;