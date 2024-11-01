import { IRecipe } from "../../../../types";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { VirtualItem } from "@tanstack/react-virtual";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageWithLoader from "../../../utils/ImageWithLoader";

type IProps = {
    recipe: IRecipe;
    idx: number,
    lastElementRef?: (node: HTMLDivElement) => void;
    setSelectedRecipe: React.Dispatch<React.SetStateAction<IRecipe | undefined>>;
    virtualRow: VirtualItem;
}

const RecipeRow: React.FC<IProps> = ({
    recipe,
    idx,
    lastElementRef,
    // setSelectedRecipe,
    virtualRow,
}) => {

    return (
        <div
            ref={lastElementRef}
            // className="max-w-screen flex justify-between items-center h-28 gap-4 p-4 min-w-96 w-full overflow-x-auto overflow-y-hidden border border-gray-600 rounded-md shadow-md mt-4"
            className="flex justify-between items-center h-28 gap-4 p-4 w-full border border-gray-600 rounded-md shadow-md mt-4"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start + (idx * 10)}px)`,
            }}
        >

            {/* IMAGE */}
            <ImageWithLoader
                imageUrl={recipe.imageUrl ?? recipePlaceholderImg}
                altTxt={recipe.title}
                imgClassName="w-24 h-24 object-cover rounded cursor-pointer hover:bg-gray-700 transition"
                loader={

                    <div className="w-24 h-24 flex justify-center items-center">
                        <div className="w-10 h-10 loading loading-spinner">
                        </div>
                    </div>
                }
                redirectTo={`/dashboard/recipes/${recipe.id}`}
            />



            {/* TITLE */}
            {/* min-w-52 */}
            <div className="text-center flex-1 h-full flex justify-center items-center font-medium text-app-white">
                {
                    recipe.title
                }
            </div>

            {/* AUTHOR */}
            {/* min-w-44 */}
            <div className="flex justify-center items-center gap-4 flex-1 h-full text-app-white">
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src={recipe.createdByUser!.avatar} />
                    </div>
                </div>
                <div className="font-normal">
                    {recipe.createdByUser!.firstName}
                </div>
            </div>

            {/* VISIBILITY */}
            <div className="flex-1 text-center tooltip" data-tip={
                recipe.isPublic ? 'This recipe can be viewed by anyone in the world!' : 'This recipe can only be viewed by people you added'
            }>

                {
                    recipe.isPublic ? (
                        <LockOpenIcon />
                    ) : (
                        <LockIcon />
                    )
                }


            </div>

            {/* ACTIONS */}
            <Link to={`/dashboard/recipes/${recipe.id}`}>

                <button className="btn">
                    <OpenInNewIcon />
                </button>

            </Link>

            {/* <div className={`dropdown dropdown-end w-[54px]`}
            >
                <div
                    onClick={() => setSelectedRecipe(recipe)}
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer hover:bg-gray-600 hover:text-white transition rounded p-2 flex justify-center items-center"
                >
                    <MoreVertIcon />
                </div>

                <RecipeActionsDropdownMenu recipe={recipe} />

            </div> */}
        </div >
    )
};



export default RecipeRow;
