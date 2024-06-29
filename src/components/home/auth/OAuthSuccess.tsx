import { useSearchParams } from "react-router-dom";


const OAuthSuccess = () => {

    const [ searchParams ] = useSearchParams();

    console.log("Search params: ", searchParams.get('token'))

    return (
        <div>
            {searchParams.get('token')}
        </div>
    )
};

export default OAuthSuccess;