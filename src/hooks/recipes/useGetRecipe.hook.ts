import { useQuery } from "react-query";
import useAxios from "../axios/useAxios.hook";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/utils/constants";
import toast from "react-hot-toast";
import { INetworkError } from "@/types";
import { getMinutesInMs } from "@/utils/functions";

const useGetRecipe = (recipeId?: string) => {
    const navigate = useNavigate();
    const axios = useAxios();

    const {
        isLoading,
        isFetching,
        error: errorWhileGettingRecipe,
        data: recipe,
    } = useQuery({

        // Set the query key
        queryKey: ["recipe", recipeId],

        // Set the query function
        queryFn: async () => {
            const { data } = await axios.get(`/recipes/${recipeId}`);
            return data;
        },
        // Only launch request if there is a recipeId
        enabled: !!recipeId,

        // When an error occurs, display a toast, and redirect the user back to his recipes.
        onError: (error: INetworkError) => {

            let toastErrMsg: string;

            // If unauthorized
            if(error.statusCode === 401) {
                toastErrMsg = "You are not authorized to view this recipe";
            } else {
                toastErrMsg = "An error occurred while getting the recipe";
            }

            toast.error(toastErrMsg);

            navigate(ROUTE_PATHS.RECIPES);
        },
        retry: false,
        
        // Refetch the data in the background
        refetchIntervalInBackground: true,
        refetchInterval: getMinutesInMs(3),
        staleTime: getMinutesInMs(3),
    });

    return {
        isLoadingRecipe: isLoading || isFetching,
        errorWhileGettingRecipe,
        recipe,
    };
};

export default useGetRecipe;
