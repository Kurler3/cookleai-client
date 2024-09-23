import { useParams } from "react-router-dom";


const SingleCookbookPage = () => {

    const { cookbookId } = useParams();

    // Get the cookbook!

    

    return (    
        <div>
            <h1>Single Cookbook Page</h1>
        </div>
    )
}

export default SingleCookbookPage;