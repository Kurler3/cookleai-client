import { IRecipe } from "@/types"
import { FC } from "react";
import RecipeDisplayInstruction from "./RecipeDisplayInstruction";

type IProps = {
  recipe?: IRecipe;
}

const RecipeDisplayInstructions: FC<IProps> = ({
  recipe,
}) => {

  return (
    <div className="flex flex-col gap-2 justify-start items-center">

      {
        !recipe?.instructions || recipe?.instructions?.length === 0
          ? <p className="text-center">No instructions provided</p>
          : (
            recipe?.instructions.map((instruction, index) => {

              return (
                <RecipeDisplayInstruction
                  key={`recipe_${recipe?.id}_instruction_${index}`}
                  instruction={instruction}
                  index={index}
                />
              )
            })
          )
      }

    </div>
  )
}

export default RecipeDisplayInstructions