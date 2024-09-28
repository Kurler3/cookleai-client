import AddIcon from '@mui/icons-material/Add';
import { COOKBOOK_MODAL_IDS } from '../../../../utils/constants';
import CreateCookbookModal from './CreateCookbookModal';


const CreateCookbookButton = () => {

    return (
        <>

            <label 
                htmlFor={COOKBOOK_MODAL_IDS.CREATE}
                className="common_btn"
            >
                {/* ADD ICON */}
                <AddIcon />
                Create cookbook
            </label>

            <input 
                type="checkbox"
                id={COOKBOOK_MODAL_IDS.CREATE}
                className='modal-toggle' 
            />


            <CreateCookbookModal />
        </>
    )
};

export default CreateCookbookButton;