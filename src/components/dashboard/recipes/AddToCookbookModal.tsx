import { Link } from "react-router-dom";
import useGetCookbooks from "../../../hooks/cookbook/useGetCookbooks";
import { IRecipe } from "../../../types";
import { ROUTE_PATHS } from "../../../utils/constants";
import { Add } from "@mui/icons-material";

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

            <div className="modal-box flex flex-col gap-2">
                
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
                        !isLoadingCookbooks ? cookbooks.map((cookbook) => {
                            return (
                                <div
                                    key={`add_modal_cookbook_${cookbook.id}`}
                                    className="p-2 text-white font-medium text-base rounded cursor-pointer hover:bg-app-green-hover transition w-full text-center bg-base-200"
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
            
                    

            </div>
            <label className="modal-backdrop" htmlFor="add_to_cookbook">Close</label>
        </div>
    )
}

export default AddToCookbookModal;