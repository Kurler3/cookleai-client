import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IRecipe } from '../../../types';
import AddToCookbookModal from './AddToCookbookModal';


type IProps = {
    recipe: IRecipe;
}

const RecipeActionsDropdownMenu: React.FC<IProps> = ({
    recipe
}) => {

    //////////////////////////////////
    // GET COOKBOOKS /////////////////
    //////////////////////////////////



    //////////////////////////////////
    // FUNCTIONS /////////////////////
    //////////////////////////////////

    

    //////////////////////////////////
    // RENDER ////////////////////////
    //////////////////////////////////

    return (
        <>

            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow gap-2 p-4 font-medium text-white">

                {/* TITLE */}
                <li className="font-bold">Actions</li>

                {/* ADD TO COOKBOOK */}
                <label htmlFor="add_to_cookbook" className='menuActionClass'>
                    <AddIcon style={{ height: '20px' }} />
                    Add to cookbook
                </label>

                
                {/* EDIT */}
                <div className='menuActionClass'>
                    <EditIcon style={{ height: '20px' }} />
                    Edit
                </div>

                {/* SHARE */}
                <div className='menuActionClass'>
                    <ShareIcon style={{ height: '20px' }} />
                    Share
                </div>

                <div className="divider h-2 my-1"></div>

                {/* DELETE */}
                <div className='menuActionClass text-red-600 hover:bg-red-500 hover:text-white'>
                    <DeleteIcon style={{ height: '20px' }} />
                    Delete
                </div>
            </ul>


            {/* ADD TO COOKBOOK MODAL */}
            <input type="checkbox" id="add_to_cookbook" className="modal-toggle" />
            <AddToCookbookModal recipe={recipe}/>

            {/* DELETE RECIPE MODAL */}


        </>

    )
};

export default RecipeActionsDropdownMenu;