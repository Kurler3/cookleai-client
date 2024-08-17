import { IIngredient, IIngredientKeys } from "@/types";
import { INGREDIENT_KEYS } from "@/utils/constants";
import { FC, ChangeEvent, useMemo } from "react";


type IProps = {
    ingredient: IIngredient;
    editIngredient: (ingredientIndex: number, key: keyof IIngredient, value: string | number) => void;
    ingredientIndex: number;
    removeIngredient: (idx: number) => void;
}

const IngredientRow: FC<IProps> = ({
    ingredient,
    ingredientIndex,
    editIngredient,
    removeIngredient,
}) => {


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        editIngredient(
            ingredientIndex,
            (e.target.name as keyof IIngredient),
            e.target.value,
        )

    }

    const incompleteKeys = useMemo(() => {

        let incompleteKeys = [] as IIngredientKeys

        INGREDIENT_KEYS.forEach((key) => {
            if (!ingredient[key]) incompleteKeys.push(key);
        })

        return incompleteKeys;

    }, [ingredient]);

    return (
        <div className={` 
            flex gap-4 p-4 rounded-lg items-center flex-wrap border-gray-600 border-2
            ${incompleteKeys.length > 0 ? 'border-amber-500' : ''}
        `}>

            {/* IF ANY ATTRIBUTES MISSING */}
            {
                incompleteKeys.length > 0 && (
                    <div className="tooltip" data-tip={
                        incompleteKeys.reduce((pv, cu, index) => {
                            return pv + (index > 0 ? ', ' : '') + cu;
                        }, 'Missing: ')

                    }>
                        <svg width="30px" height="30px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f59e0b">

                            <g id="SVGRepo_bgCarrier" stroke-width="0" />

                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                            <g id="SVGRepo_iconCarrier"> <path d="M10.8809 16.15C10.8809 16.0021 10.9101 15.8556 10.967 15.7191C11.024 15.5825 11.1073 15.4586 11.2124 15.3545C11.3175 15.2504 11.4422 15.1681 11.5792 15.1124C11.7163 15.0567 11.8629 15.0287 12.0109 15.03C12.2291 15.034 12.4413 15.1021 12.621 15.226C12.8006 15.3499 12.9399 15.5241 13.0211 15.7266C13.1024 15.9292 13.122 16.1512 13.0778 16.3649C13.0335 16.5786 12.9272 16.7745 12.7722 16.9282C12.6172 17.0818 12.4204 17.1863 12.2063 17.2287C11.9922 17.2711 11.7703 17.2494 11.5685 17.1663C11.3666 17.0833 11.1938 16.9426 11.0715 16.7618C10.9492 16.5811 10.8829 16.3683 10.8809 16.15ZM11.2408 13.42L11.1008 8.20001C11.0875 8.07453 11.1008 7.94766 11.1398 7.82764C11.1787 7.70761 11.2424 7.5971 11.3268 7.5033C11.4112 7.40949 11.5144 7.33449 11.6296 7.28314C11.7449 7.2318 11.8697 7.20526 11.9958 7.20526C12.122 7.20526 12.2468 7.2318 12.3621 7.28314C12.4773 7.33449 12.5805 7.40949 12.6649 7.5033C12.7493 7.5971 12.813 7.70761 12.8519 7.82764C12.8909 7.94766 12.9042 8.07453 12.8909 8.20001L12.7609 13.42C12.7609 13.6215 12.6809 13.8149 12.5383 13.9574C12.3958 14.0999 12.2024 14.18 12.0009 14.18C11.7993 14.18 11.606 14.0999 11.4635 13.9574C11.321 13.8149 11.2408 13.6215 11.2408 13.42Z" fill="#f59e0b" /> <path d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </g>

                        </svg>

                    </div>
                )
            }

            {/* NAME */}
            <label className="form-control flex-1">
                <div className="label">
                    <span className="label-text">Name</span>
                </div>
                <input
                    type="text"
                    className="input p-2 bg-base-300 focus:outline-app-green h-10"
                    placeholder="Name"
                    value={ingredient.name}
                    onChange={handleChange}
                    name='name'
                />

            </label>

            {/* QUANTITY */}
            <label className="form-control flex-1">
                <div className="label">
                    <span className="label-text">Quantity</span>
                </div>
                <input
                    type="number"
                    className="input  bg-base-300 focus:outline-app-green h-10"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={handleChange}
                    name='quantity'
                />

            </label>


            {/* UNIT */}
            <label className="form-control flex-1">
                <div className="label">
                    <span className="label-text">Unit</span>
                </div>
                <input
                    type="text"
                    className="input p-2 bg-base-300 focus:outline-app-green h-10"
                    placeholder="Unit"
                    value={ingredient.unit}
                    onChange={handleChange}
                    name='unit'
                />
            </label>


            {/* REMOVE BUTTON */}
            <button className="btn btn-error" onClick={() => removeIngredient(ingredientIndex)}>
                Remove
            </button>

        </div>
    )

}

export default IngredientRow;