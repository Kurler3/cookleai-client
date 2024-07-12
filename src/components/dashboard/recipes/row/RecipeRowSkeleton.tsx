


const RecipeRowSkeleton = () => {


    return (
        <div className="flex justify-between items-center h-28 gap-4 p-4 w-full  rounded-md  mt-4">
            
            {/* IMG */}
            <div className="skeleton w-24 h-24"></div>

            {/* TITLE */}
            <div className="skeleton flex-1 h-full min-w-52"></div>

            {/* AUTHOR */}
            <div className="skeleton min-w-44 h-full"></div>

            {/* ACTIONS */}
            <div className="skeleton"></div>
        </div>
    )
}

export default RecipeRowSkeleton;