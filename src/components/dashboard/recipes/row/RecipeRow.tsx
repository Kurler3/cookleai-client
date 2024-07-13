import { IRecipe } from "../../../../types";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RecipeActionsDropdownMenu from "../RecipeActionsDropdownMenu";


type IProps = {
    recipe: IRecipe;
}

const RecipeRow: React.FC<IProps> = ({
    recipe,
}) => {
    return (
        <tr
            // className="max-w-screen flex justify-between items-center h-28 gap-4 p-4 min-w-96 w-full overflow-x-auto overflow-y-hidden border border-gray-600 rounded-md shadow-md mt-4"
            className="flex justify-between items-center h-28 gap-4 p-4 w-full border border-gray-600 rounded-md shadow-md mt-4"
        >

            {/* IMAGE */}
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-24 h-24 object-cover rounded"
            />

            {/* TITLE */}
            <div className="text-center flex-1 h-full flex justify-center items-center font-medium text-app-white min-w-52">
                {
                    recipe.title
                }
            </div>

            {/* AUTHOR */}
            <div className="flex justify-center items-center gap-4 flex-1 h-full text-app-white min-w-44">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={recipe.createdByUser!.avatar} />
                    </div>
                </div>
                <div className="font-normal">
                    {recipe.createdByUser!.firstName}
                </div>
            </div>

            {/* ACTIONS */}
            <div className="dropdown dropdown-bottom dropdown-end">
                <div role="button" tabIndex={0} className="cursor-pointer hover:bg-gray-600 hover:text-white transition rounded p-2"> <MoreVertIcon /></div>

                <RecipeActionsDropdownMenu recipe={recipe}/>
            </div>

        </tr>
    )
};


export default RecipeRow;