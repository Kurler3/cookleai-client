
const RecipeCardSkeleton = () => {
    return (
        <div
            className=" w-48 h-60 flex justify-start items-center flex-col gap-2 p-4 rounded"
        >

            {/* IMG */}
            <div className="skeleton h-40 w-48 rounded"></div>

            {/* TITLE */}
            <div className="skeleton w-full h-12"></div>
        </div>
    )
}

export default RecipeCardSkeleton