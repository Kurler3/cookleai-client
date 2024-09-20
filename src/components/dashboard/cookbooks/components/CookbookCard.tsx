import { ICookbook } from "@/types";
import { FC, useMemo } from "react";
import recipePlaceholderImg from '@/assets/images/recipe_placeholder.png';



type IProps = {
    cookbook: ICookbook;
    lastElementRef?: (node: HTMLDivElement) => void
}

const CookbookCard: FC<IProps> = ({
    cookbook,
    lastElementRef,
}) => {

    // Get first recipe of a cookbook.
    const img = useMemo(() => {
        if (cookbook.recipes && cookbook.recipes.length > 0) {
            return cookbook.recipes[0].image ?? recipePlaceholderImg
        }
        return recipePlaceholderImg;
    }, [cookbook.recipes]);

    return (
        <div
            className="w-48 h-48 max-w-48 p-1 border rounded-md flex justify-center items-center flex-col"
            ref={lastElementRef}
        >

            {/* FIRST RECIPE IMAGE */}
            <figure>
                <img src={img} alt={cookbook.title} className="h-28 w-28 rounded object-cover" />
            </figure>


            {/* COOKBOOK TITLE */}
            <p className="truncate">
                {
                    cookbook.title
                }
            </p>

        </div>
    )
};

export default CookbookCard;