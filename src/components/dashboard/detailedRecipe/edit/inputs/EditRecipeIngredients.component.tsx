import { IIngredient } from "@/types";
import React from "react";


type IProps = {
    ingredients: IIngredient[];
    setIngredients: () => {};
}

const EditRecipeIngredients: React.FC<IProps> = ({
    ingredients,
}) => {

  return (
    <div className="flex-1 flex justify-col">

        {/* ADD INGREDIENT BUTTON */}
        <button className="btn commob_btn">
            Add ingredient
        </button>  


        {/* INGREDIENTS */}
        {
            
        }

    </div>
  )
}

export default EditRecipeIngredients;