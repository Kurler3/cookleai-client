import { Link } from "react-router-dom";
import { COOKBOOK_ROLES, ICookbook, IRecipe } from "../../../../types";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import { VirtualItem } from "@tanstack/react-virtual";
import getVirtualizedGridItemStyles from "@/utils/functions/getVirtualizedGridItemStyles";
import ImageWithLoader from "../../../utils/ImageWithLoader";
import useContextMenu from "../../../../hooks/common/useContextMenu";
import RecipeContextMenu from "../utilities/RecipeContextMenu";


type IProps = {
    recipe: IRecipe;
    lastElementRef?: (node: HTMLDivElement) => void;
    virtualRow?: VirtualItem;
    virtualColumn?: VirtualItem;
    cookbook?: ICookbook;
}

const RecipeCard: React.FC<IProps> = ({
    recipe,
    lastElementRef,
    virtualColumn,
    virtualRow,
    cookbook,
}) => {

    const {
        isContextMenuOpen,
        handleContextMenu,
        closeMenu,
    } = useContextMenu();

    //////////////////////////////
    // RETURN ////////////////////
    //////////////////////////////

    return (
        <div 
            onContextMenu={handleContextMenu} className={`dropdown ${isContextMenuOpen && 'dropdown-open'}`}
            style={
                virtualColumn &&
                virtualRow &&
                getVirtualizedGridItemStyles({
                    virtualColumn,
                    virtualRow
                })
            }
            onBlur={closeMenu}
        >

            <Link
                ref={lastElementRef as unknown as React.LegacyRef<HTMLAnchorElement>}
                to={`/dashboard/recipes/${recipe.id}`}
                className={`
                w-48 h-60 min-h-60 flex justify-start items-center flex-col gap-2 cursor-pointer hover:bg-gray-700 p-4 transition-all rounded
            `}
            >

                <figure>
                    <ImageWithLoader
                        imageUrl={recipe.imageUrl ?? recipePlaceholderImg}
                        altTxt={recipe.title}
                        imgClassName="h-40 w-48 rounded shadow-lg object-cover"
                        loader={
                            <div className="h-48 w-48 flex justify-center items-center">
                                <div className="loading loading-spinner"></div>
                            </div>
                        }
                    />
                </figure>

                <div className="text-base font-bold text-white text-center">
                    {recipe.title}
                </div>
                
            </Link>

            {
                cookbook && cookbook.role !== COOKBOOK_ROLES.VIEWER && (
                    <RecipeContextMenu
                        cookbook={cookbook}
                        recipeId={recipe.id}
                    />
                )
            }

        </div>

    )
};

export default RecipeCard;