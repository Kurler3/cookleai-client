import { IAxiosNetworkError } from "@/types";
import toast from "react-hot-toast";



const axiosNetworkErrorHandler = (customMsg?: string) => (error: IAxiosNetworkError) => {
    
    const msg = error.response?.data?.message || customMsg || 'An error occurred';

    toast.error(msg);
};

export default axiosNetworkErrorHandler;