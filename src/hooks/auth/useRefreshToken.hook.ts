import { useAuth } from "./useAuth.hook";
import axios from "axios";
import { BASE_BACKEND_URL } from "../../utils/constants";


const useRefreshToken = () => {

    // Get setToken func from auth context
    const {
        setToken
    } = useAuth();

    const refresh = async () => {
         // Make call to api
         const refreshResult = await axios.get(
            BASE_BACKEND_URL + '/auth/refresh',
            {
                withCredentials: true, // Use http only cookies (the refresh token)
            }
        );

        // Set the new token
        setToken(refreshResult.data.accessToken);

        return refreshResult.data.accessToken
    }

    return refresh;
}

export default useRefreshToken;