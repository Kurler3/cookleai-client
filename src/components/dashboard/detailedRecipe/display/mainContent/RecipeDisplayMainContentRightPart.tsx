import { IRecipe } from "@/types"
import { FC } from "react";
import TimerIcon from '@mui/icons-material/Timer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RecipeDisplayInstructions from "./instructions/RecipeDisplayInstructions";

type IProps = {
    recipe?: IRecipe;
}


const RecipeDisplayMainContentRightPart: FC<IProps> = ({
    recipe,
}) => {

    return (
        <div className="flex-1 h-80 flex flex-col justify-start items-start gap-4">

            {/* TITLE */}
            <h2 className="text-2xl text-white font-medium">
                {recipe?.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="max-h-52 max-w-72 overflow-y-auto break-words">
                {
                    recipe?.description || recipe?.description !== "" ? (
                        <>
                            {recipe?.description}
                        </>
                    ) : (
                        <>No description provided!</>
                    )
                }
                
            </p>

            <div className="flex gap-4 flex-wrap">

                {/* AUTHOR */}
                <div className="flex justify-center items-center gap-2">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={recipe?.createdByUser?.avatar} />
                        </div>
                    </div>
                    <div>
                        <span className="text-white font-medium">Author: </span><span>{recipe?.createdByUser?.firstName}</span>
                    </div>
                </div>

                {/* PREP TIME */}
                <div className="flex gap-2 justify-start items-center">
                    <AccessTimeIcon className="text-[9px] text-white" />
                    <div>
                        <span className="font-medium text-white">Prep Time:</span>


                        {
                            recipe?.prepTime ? (
                                <> {recipe?.prepTime} minutes</>
                            ) : (
                                <> No prep time specified</>
                            )
                        }

                    </div>
                </div>

                {/* COOK TIME */}
                <div className="flex gap-2 justify-start items-center">
                    <TimerIcon className="text-[9px] text-white" />
                    <div>
                        <span className="font-medium text-white">Cook Time:</span>


                        {
                            recipe?.cookTime ? (
                                <> {recipe?.cookTime} minutes</>
                            ) : (
                                <> No cook time specified</>
                            )
                        }

                    </div>
                </div>

            </div>

            {/* STEPS */}
            <RecipeDisplayInstructions 
                recipe={recipe}
            />

        </div>
    )
}

export default RecipeDisplayMainContentRightPart