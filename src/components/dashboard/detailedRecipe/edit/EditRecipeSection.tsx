import React from "react";


type IEditRecipeSectionInput = {
    title: string;
    titleTooltipText?: string;
    inputElement: React.ReactNode;
}

type IProps = {
    title: string;
    labelText: string;
    sectionInputs: IEditRecipeSectionInput[];
}

const EditRecipeSection: React.FC<IProps> = ({
    title,
    labelText,
    sectionInputs,
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
                sectionInputs.map((sectionInput) => {
                    return (
                        <div
                            key={`recipe_edit_section_${sectionInput.title}`}
                            className="flex justify-start items-start gap-4 w-full"
                        >

                            {/* Title */}
                            <div className="w-[30%] flex justify-start items-start gap-3">

                                <p className="font-medium text-gray-200">
                                    {sectionInput.title}
                                </p>

                                {/* TOOLTIP */}
                                {
                                    sectionInput.titleTooltipText && (
                                        <div className="tooltip z-20" data-tip={sectionInput.titleTooltipText} >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                className="stroke-info h-6 w-6 shrink-0">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                    )
                                }
                            </div>

                            {/* INPUT */}
                            {sectionInput.inputElement}

                        </div>
                    )
                })
            }
        </div>
    )

}

export default EditRecipeSection;