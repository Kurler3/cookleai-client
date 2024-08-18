import { ChangeEvent, FC } from "react";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable } from "react-beautiful-dnd";

type IProps = {
    instruction: string;
    editInstruction: (index: number, value: string) => void;
    deleteInstruction: (index: number) => void;
    instructionIdx: number;
}


const InstructionRow: FC<IProps> = ({
    instruction,
    editInstruction,
    deleteInstruction,
    instructionIdx
}) => {


    const handleChangeInstruction = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        editInstruction(instructionIdx, e.target.value);
    }


    return (
        <Draggable
            draggableId={instructionIdx.toString()}
            index={instructionIdx}
        >
            {(provided, _snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //     //   style={getItemStyle(
                    //     //     snapshot.isDragging,
                    //     //     provided.draggableProps.style
                    //     //   )}
                    className="w-full border-gray-600 border-2 rounded p-2 flex justify-center items-center gap-4"
                >

                    {/* DRAG AND DROP ICON! */}
                    <DragIndicatorIcon />

                    {/* INSTRUCTION AREA INPUT */}
                    <textarea
                        placeholder="Instruction"
                        value={instruction}
                        onChange={handleChangeInstruction}
                        className="textarea textarea-md  min-h-[100px] w-full  bg-base-300">
                    </textarea>

                    {/* REMOVE BUTTON */}
                    <button
                        className="btn btn-error"
                        onClick={() => deleteInstruction(instructionIdx)}
                    >
                        Remove
                    </button>
                </div>
            )}

        </Draggable>
    )
};


export default InstructionRow;
