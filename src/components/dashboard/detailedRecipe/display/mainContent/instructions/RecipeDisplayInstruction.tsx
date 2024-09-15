import { FC, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

type IProps = {
    instruction: string;
    index: number
}
const RecipeDisplayInstruction: FC<IProps> = ({
    instruction,
    index,
}) => {

    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);

    return (
        <div
            className={`
                w-full p-4 flex flex-col justify-start items-start hover:cursor-pointer hover:bg-base-300 rounded transition
                ${isDone ? "bg-base-300 hover:bg-base-300" : ""}
            `}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => setIsDone(!isDone)}
        >
            <div 
                className={`font-bold text-white text-lg flex justify-start items-center gap-2 ${isDone && "text-gray-500"}`}
            >
                Step {index + 1}

                <CheckIcon className={`opacity-0 transition-all text-gray-500 h-6 ${(isDone || isHovering) && "opacity-100"} `} />
            </div>

            <div className={`text-base text-gray-300 ${isDone && "text-gray-500"}`}>
                {instruction}
            </div>

        </div>
    )
}

export default RecipeDisplayInstruction