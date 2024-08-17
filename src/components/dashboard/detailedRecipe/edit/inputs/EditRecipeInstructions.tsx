import { IRecipeEditState } from "@/types";
import { FC } from "react";


type IProps = {
    instructions?: string[];
    onChangeEditRecipeState: (
        updateStateObj: Partial<IRecipeEditState>
    ) => void;
}

const EditRecipeInstructions: FC<IProps> = ({
    instructions,
    onChangeEditRecipeState,
}) => {

    //////////////////////////////////////
    // FUNCTIONS /////////////////////////
    //////////////////////////////////////


    //TODO: Add instruction*
    const addInstruction = () => {
        const newInstruction = "";
        onChangeEditRecipeState({
            instructions: [
                newInstruction,
                ...(instructions ?? []),
            ]
        });
    }

    //TODO: Edit instruction

    //TODO: Delete instruction

    //TODO: Order instruction


    //////////////////////////////////////
    // RETURN ////////////////////////////
    //////////////////////////////////////


    return (
        <div className="flex-1 flex justify-start items-start flex-col gap-4">

            {/* ADD INSTRUCTION BUTTON */}
            <button
                className="btn common_btn"
                onClick={addInstruction}
            >
                Add Instruction
            </button>


        </div>
    )
}

export default EditRecipeInstructions