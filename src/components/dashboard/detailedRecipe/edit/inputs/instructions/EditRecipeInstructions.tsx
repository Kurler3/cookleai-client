import { IRecipeEditState } from "@/types";
import { FC } from "react";
import InstructionRow from "./InstructionRow";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";



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

    // Add instruction*
    const addInstruction = () => {
        const newInstruction = "";
        onChangeEditRecipeState({
            instructions: [
                newInstruction,
                ...(instructions ?? []),
            ]
        });
    }

    // Edit instruction
    const editInstruction = (
        instructionIdx: number,
        newInstruction: string,
    ) => {

        const newInstructions = [...instructions!];

        newInstructions[instructionIdx] = newInstruction;

        onChangeEditRecipeState({ instructions: newInstructions });
    }

    // Delete instruction
    const deleteInstruction = (
        instructionIdx: number,
    ) => {

        const newInstructions = [...instructions!];

        newInstructions.splice(instructionIdx, 1);

        onChangeEditRecipeState({ instructions: newInstructions });
    }

    //TODO: Order instruction
    const onDragInstructionEnd = (result: DropResult) => {

        // {
        //     "draggableId": "1",
        //     "type": "DEFAULT",
        //     "source": {
        //         "index": 1,
        //         "droppableId": "droppable"
        //     },
        //     "reason": "DROP",
        //     "mode": "FLUID",
        //     "destination": {
        //         "droppableId": "droppable",
        //         "index": 0
        //     },
        //     "combine": null
        // }

        // If the destination is invalid => skip func
        if(!result.destination) return;

        // Reorder instructions
        const newInstructions = [...instructions!];

        const sourceIdx = result.source.index;
        const destinationIdx = result.destination.index;

        [newInstructions[sourceIdx], newInstructions[destinationIdx]] = [newInstructions[destinationIdx], newInstructions[sourceIdx]]; 

        onChangeEditRecipeState({ instructions: newInstructions });
    }


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

            {/* INSTRUCTIONS LIST */}
            <DragDropContext onDragEnd={onDragInstructionEnd}>
                <Droppable
                    droppableId="droppable"
                >

                    {(provided, _snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="w-full flex flex-col justify-start items-center gap-2"
                            //   style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {instructions?.map((instruction, index) => (
                                <InstructionRow
                                    key={`recipe_instruction_row_${index}`}
                                    instruction={instruction}
                                    instructionIdx={index}
                                    editInstruction={editInstruction}
                                    deleteInstruction={deleteInstruction}
                                />

                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </DragDropContext>


        </div>
    )
}

export default EditRecipeInstructions