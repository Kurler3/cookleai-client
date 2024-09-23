import { IRecipe } from "@/types";
import { FC } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type IProps = {
    isEditingRecipe: boolean;
    recipe?: IRecipe;
    handleChangeRecipeVisibility: () => void;
    dropdownDirection?: 'bottom' | 'top' | 'right';
}

const EditRecipeVisibilityInput: FC<IProps> = ({
    isEditingRecipe,
    recipe,
    handleChangeRecipeVisibility,
    dropdownDirection = 'bottom'
}) => {

    return (
        <div className={`dropdown dropdown-${dropdownDirection}`}>
            <div
                tabIndex={0}
                role="button"
                className={`${isEditingRecipe && 'opacity-[0.4] cursor-not-allowed hover:border-app-green'} rounded-lg p-3 m-1 w-full border border-app-green text-white bg-base-300 flex justify-between 
                            items-center hover:border hover:border-app-green-hover`}
            >

                <div className="flex justify-start items-center gap-2">

                    {isEditingRecipe && (<span className="loading loading-spinner"></span>)}

                    {
                        recipe?.isPublic ? (
                            <>
                                <LockOpenIcon />

                                Public
                            </>
                        ) : (
                            <>
                                <LockIcon />

                                Private
                            </>
                        )
                    }
                </div>


                {/* DOWN ARROW */}
                <KeyboardArrowDownIcon />

            </div>
            {
                !isEditingRecipe && (
                    <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-[1] p-2 shadow w-full">
                        <li onClick={handleChangeRecipeVisibility}>
                            <a>

                                {
                                    recipe?.isPublic ? (
                                        <>

                                            <LockIcon /> Private

                                        </>
                                    ) : (
                                        <>

                                            <LockOpenIcon /> Public

                                        </>
                                    )
                                }

                            </a>
                        </li>
                    </ul>
                )
            }
        </div>)
}

export default EditRecipeVisibilityInput;