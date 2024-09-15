import { IRecipe } from "@/types"
import { FC } from "react";
import RecipeDisplayMainContentLeftPart from "./RecipeDisplayMainContentLeftPart";
import RecipeDisplayMainContentRightPart from "./RecipeDisplayMainContentRightPart";

type IProps = {
    recipe?: IRecipe;
}

const RecipeDisplayMainContent: FC<IProps> = ({
    recipe,
}) => {

    return (
        <div className="flex justify-center items-start gap-4 w-[70%] p-4 flex-wrap">

            {/* LEFT SIDE: IMAGE + INGREDIENTS */}
            <RecipeDisplayMainContentLeftPart 
                recipe={recipe}
            />

            {/* RIGTH SIDE: TITLE + DESCRIPTION + AUTHOR + PREP TIME  */}
            <RecipeDisplayMainContentRightPart 
                recipe={recipe}
            />

        </div>
    )
}

export default RecipeDisplayMainContent