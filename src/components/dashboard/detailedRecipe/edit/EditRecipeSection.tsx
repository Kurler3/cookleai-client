import { ReactNode } from "react";



type IProps = {
    title: string;
    labelText: string;
    children: ReactNode;
}

const EditRecipeSection: React.FC<IProps> = ({
    title,
    labelText,
    children,
}) => {

    return (
        <div className="bg-base-100 border-2 border-gray-600 flex justify-start items-start flex-col p-4 gap-4 w-full rounded-lg">
            
            <div>
                    <h3 className="text-white font-medium text-lg">{title}</h3>

                    <p className="text-base-content text-sm">
                        {labelText}
                    </p>
            </div>

            {
                children
            }
        </div>
    )

}

export default EditRecipeSection;