import DeleteIcon from '@mui/icons-material/Delete';
import { ICookbook } from '../../../../types';
import { FC } from 'react';
import useRemoveRecipeFromCookbook from '../../../../hooks/cookbook/useRemoveRecipeFromCookbook';

type IProps = {
    cookbook: ICookbook;
    recipeId: number;
}

const RecipeContextMenu: FC<IProps> = ({
    cookbook,
    recipeId,
}) => {

    const {
        isRemovingRecipeFromCookbook,
        removeRecipeFromCookbook
    } = useRemoveRecipeFromCookbook({
        cookbook,
    });

    const handleRemoveRecipeFromCookbook = async () => {

        if (isRemovingRecipeFromCookbook) return;

        removeRecipeFromCookbook({
            recipeId,
        });
        
    }

    return (
        <div onClick={e => {
            e.stopPropagation();
        }} tabIndex={0} className="dropdown-content menu bg-base-100 border border-green-500 rounded-box z-[100] w-60 p-2 shadow">
            <button
                onClick={handleRemoveRecipeFromCookbook}
                className='flex justify-start flex-row items-center gap-2 hover:bg-gray-700 transition p-2'
            >
                { isRemovingRecipeFromCookbook && <span className="loading loading-spinner loading-sm"></span> }
                <DeleteIcon className="text-red-600" /> 
                <p className='flex-1 w-full text-left text-white'>
                    Remove from cookbook
                </p>
            </button>
        </div>
    )
}

export default RecipeContextMenu