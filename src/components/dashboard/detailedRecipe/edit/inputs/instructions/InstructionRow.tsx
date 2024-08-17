import { FC } from "react";


type IProps = {
    instruction: string;
}


const InstructionRow: FC<IProps> = ({
    instruction,
}) => {

    return (
        <div 
            className="w-full border border-red-500 flex justify-center items-center gap-4"
        >

            {/* DRAG AND DROP ICON! */}


            {/* INSTRUCTION AREA INPUT */}
            {
                instruction
            }
        </div>
    )
};


export default InstructionRow;
