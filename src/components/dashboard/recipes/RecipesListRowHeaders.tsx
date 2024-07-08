



const RecipesListRowHeaders = () => {
    return (
        <div className="w-full flex justify-between items-center gap-4 px-4 min-w-96 overflow-x-auto overflow-y-hidden border h-12 rounded border-gray-600 text-app-white">

            {/* IMAGE */}
            <div className="w-24 text-app-white font-medium">
                Image
            </div>

            {/* TITLE */}
            <div className="text-center flex-1 h-full flex justify-center items-center font-medium text-app-white min-w-52">
                Title
            </div>

            {/* AUTHOR */}
            <div className="flex justify-center items-center flex-1 h-full text-app-white min-w-44 font-medium">
                Author
            </div>

            {/* ACTIONS */}
            <div className="text-app-white font-medium">
                Actions
            </div>

        </div>
    )
};

export default RecipesListRowHeaders;