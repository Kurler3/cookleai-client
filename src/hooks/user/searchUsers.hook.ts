import { useQuery } from "@tanstack/react-query";
import useAxios from "../axios/useAxios.hook";
import { useEffect, useState } from "react";
import { getMinutesInMs } from "../../utils/functions";
import toast from "react-hot-toast";
import { IUser } from "../../types";


type ISearchUsersHookArgs = {
    searchValue: string;
    debounceDelay?: number;
}

const useSearchUsers = ({
    searchValue,
    debounceDelay=500,
}: ISearchUsersHookArgs) => {

    const axios = useAxios();

    const [debouncedValue, setDebouncedValue] = useState(searchValue);

    useEffect(() => {

        const t = setTimeout(() => {

            setDebouncedValue(searchValue)

        }, debounceDelay);

        return () => {
            clearTimeout(t);
        }

    }, [debounceDelay, searchValue]);

    const {
        data,
        error,
        refetch,
        isLoading,
        isFetching,
    } = useQuery({
        enabled: debouncedValue.length > 0,
        queryKey: ['search.users', debouncedValue],
        queryFn: async () => {

            const usersRes = await axios.get('/users/search', {
                params: {
                    search: debouncedValue,
                }    
            });

            return usersRes.data as IUser[];
        },
        staleTime: getMinutesInMs(3),
    })

    useEffect(() => {
        if(error) {
            toast.error("Something wrong happened while searching for users...");
        }
    }, [error])

    return {
        foundUsers: data,
        error,
        refetch,
        isSearchingUsers: isFetching || isLoading,
    }

}

export default useSearchUsers;