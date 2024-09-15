import { IIngredient } from "@/types";
import { FC } from "react";



type IProps = {
    ingredient: IIngredient;
}

const IngredientDisplayRow: FC<IProps> = ({
    ingredient,
}) => {

    return (
        <div
            className="flex justify-start items-center gap-2 text-white font-medium"
        >
            <input type="checkbox" className="checkbox checkbox-success" />
            <span className="text-sm flex gap-1">

                <span>{ingredient.quantity}</span>

                {
                    ingredient.unit !== 'item' && (
                        <span>
                            {ingredient.unit}
                        </span>
                    )
                }
                
                <span>{ingredient.name?.toLocaleLowerCase()}</span>

            </span>
        </div>
    )
};

export default IngredientDisplayRow;