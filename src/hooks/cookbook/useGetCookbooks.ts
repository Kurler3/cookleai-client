import { mockCookbooks } from "../../utils/constants";



const useGetCookbooks = () => {

    //TODO Fetch from backend

    return {
        cookbooks: mockCookbooks,
        isLoadingCookbooks: false,
    }
};

export default useGetCookbooks;