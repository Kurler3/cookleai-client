import { Link } from "react-router-dom";
import { IRecipe } from "../../../../types";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';
import { VirtualItem } from "@tanstack/react-virtual";



type IProps = {
    recipe: IRecipe;
    lastElementRef?: (node: HTMLDivElement) => void;
    virtualRow?: VirtualItem;
    virtualColumn?: VirtualItem;
}

const RecipeCard: React.FC<IProps> = ({
    recipe,
    lastElementRef,
    virtualColumn,
    virtualRow,
}) => {

    return (
        <Link
            ref={lastElementRef as unknown as React.LegacyRef<HTMLAnchorElement>}
            to={`/dashboard/recipes/${recipe.id}`}
            style={virtualColumn && virtualRow && {
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${virtualColumn?.size}px`,
                height: `${virtualRow?.size}px`,
                transform: `translateX(${virtualColumn?.start}px) translateY(${virtualRow?.start}px)`,
            }}
            className="w-48 h-60 flex justify-start items-center flex-col gap-2 cursor-pointer hover:bg-gray-700 p-4 transition-all rounded"
        >

            <figure>
                <img src={recipe.image ?? recipePlaceholderImg} alt={recipe.title} className="h-40 w-48 rounded shadow-lg object-cover" />
            </figure>

            <div className="text-base font-bold text-white text-center">
                {recipe.title}
            </div>

        </Link>
    )
};

export default RecipeCard;