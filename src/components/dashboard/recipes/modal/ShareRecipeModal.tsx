import { IRecipe } from "@/types";
import { RECIPE_ACTION_MODAL_IDS } from "@/utils/constants/recipes.constants"
import React, { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FRONT_END_BASE_URL } from "@/utils/constants";
import useEditRecipe from "@/hooks/recipes/useEditRecipe.hook";


type IProps = {
    recipe: IRecipe;
}

const ShareRecipeModal: React.FC<IProps> = ({ recipe }) => {


    const {
        editRecipe,
        isEditingRecipe,
        editRecipeError,
    } = useEditRecipe();

    const recipeUrl = `${FRONT_END_BASE_URL}/dashboard/recipes/${recipe.id}`

    const [
        copiedLink,
        setCopiedLink,
    ] = useState(false);

    const handleChangeRecipeVisibility = useCallback(() => {

        editRecipe({
            id: recipe.id,
            isPublic: !recipe.isPublic,
        })

    }, [])
 
    // Copy link
    const copyLink = useCallback(() => {

        if (copiedLink) return;


        // Copy to clipboard
        navigator.clipboard.writeText(recipeUrl)

        // Update state
        setCopiedLink(true);
    }, [])

    useEffect(() => {


        // as soon as the link is copied, reset the button after 2 secs
        if (copiedLink) {
            setInterval(() => {
                setCopiedLink(false);
            }, 2000)
        }

    }, [copiedLink])

    return (
        <div className="modal" role="dialog">

            <div className="modal-box flex flex-col gap-4 h-fit" style={{ maxHeight: '100%' }}>

                {/* TITLE */}
                <div className="text-xl font-bold text-left text-white">
                    Share Recipe
                </div>

                <p>
                    Share this recipe with your friends and family,
                    post it on social media,
                    or do whatever you want with it.
                </p>

                {/* QR CODE */}
                <div
                    className="border-2 shadow-lg p-4 bg-white   border-app-green m-auto rounded-[10px]"
                >
                    <QRCode
                        value={recipeUrl}
                        style={{
                            borderRadius: '10px'
                        }}
                        size={150}
                    />
                </div>

                {/* ALERT */}
                {
                    !recipe.isPublic && (
                        <div role="alert" className="alert alert-warning">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8  shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>

                            <div className="flex justify-start items-start flex-col">
                                <div className="text-lg font-medium">
                                    This recipe is not public.
                                </div>

                                <span>Only users from your shared cookbooks can view this recipe when it is added to a shared cookbook.</span>
                            </div>

                        </div>
                    )
                }

                {/* //TODO: SWITCH TO PRIVATE/PUBLIC */}
                <div className="dropdown dropdown-bottom">
                    <div
                        tabIndex={0}
                        role="button"
                        className={`${isEditingRecipe && 'opacity-[0.4] cursor-not-allowed hover:border-app-green'} rounded-lg p-3 m-1 w-full border border-app-green text-white bg-base-300 flex justify-between 
                            items-center hover:border hover:border-app-green-hover`}
                    >

                        <div className="flex justify-start items-center gap-2">

                            {isEditingRecipe && (<span className="loading loading-spinner"></span>)}

                            {
                                recipe.isPublic ? (
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
                                    recipe.isPublic ? (
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
                    
                </div>


                <p className="text-base font-medium">
                    Link
                </p>

                {/* //TODO: COPY LINK */}
                <div className="cursor-not-allowed w-full text-center p-2 bg-base-200 rounded-lg  border-2 border-app-green">
                    {
                        recipeUrl
                    }
                </div>

                {/* COPY LINK BTN */}
                <button className="btn w-fit ml-auto" onClick={copyLink}>
                    {
                        !copiedLink ? (
                            <>
                                <InsertLinkIcon /> Copy Link
                            </>
                        ) : (
                            <>
                                <CheckIcon />
                                Link copied
                            </>
                        )

                    }

                </button>

            </div>

            <label
                className="modal-backdrop"
                htmlFor={RECIPE_ACTION_MODAL_IDS.SHARE_RECIPE}
            >
                Close
            </label>
        </div>
    )
}

export default ShareRecipeModal