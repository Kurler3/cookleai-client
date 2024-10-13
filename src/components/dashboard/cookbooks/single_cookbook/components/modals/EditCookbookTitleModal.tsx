import { ICookbook } from "@/types"
import { COOKBOOK_MODAL_IDS } from "@/utils/constants"
import { FC, useState } from "react";


type IProps = {
    cookbook: ICookbook;
}

const EditCookbookTitleModal: FC<IProps> = ({
    cookbook,
}) => {

    const [cookbookTitle, setCookbookTitle] = useState(cookbook.title);

    const handleSubmit = () => {

        // If there's no change at all, return early.
        if(cookbookTitle === cookbook.title) return;

        //TODO Call the function to update the title.
        
    }


    return (
        <>  
            <input
                type="checkbox"
                id={COOKBOOK_MODAL_IDS.EDIT}
                className="modal-toggle"
            />

            <div className="modal" role="dialog">

                <div className="modal-box flex flex-col gap-2">

                    {/* CHANGE TITLE */}
                    <h1 className="text-lg font-bold text-white">Change cookbook title</h1>

                    <p>You can change the title of this cookbook at any time.</p>

                    {/* INPUT */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Cookbook title</span>
                        </div>
                        <input 
                            type="text" 
                            placeholder="Type here" 
                            className="input input-bordered w-full max-w-xs"
                            value={cookbookTitle}
                            onChange={({target: { value }}) => setCookbookTitle(value)}
                        />
                    </label>

                    {/* SAVE BUTTON */}
                    <div className="w-full flex justify-end items-center">
                        <button 
                            className={`btn ${ cookbook.title !== cookbookTitle ? 'btn-success' : 'btn-disabled'}`}
                            disabled={cookbook.title === cookbookTitle}
                        >
                            Save
                        </button>
                    </div>
                </div>

                <label className="modal-backdrop" htmlFor={COOKBOOK_MODAL_IDS.EDIT}>Close</label>

            </div>

        </>
    )
}

export default EditCookbookTitleModal