import { useEffect } from "react";
import { INetworkError } from "../../types";
import toast from "react-hot-toast";


type IArgs = {
    fnc?: () => void;
    errMsg?: string;
    unAuthorizedMsg?: string;
    error?: Error | null;
}

const useHandleFetchError = ({
    fnc,
    errMsg,
    unAuthorizedMsg,
    error,
}:IArgs={}) => {

    useEffect(() => {
        if (error) {
            
            let toastErrMsg: string;

            // If unauthorized
            if ((error as INetworkError).statusCode === 401 && unAuthorizedMsg) {
                toastErrMsg = unAuthorizedMsg;
            } else {
                toastErrMsg = errMsg ?? "Something went wrong!";
            }

            toast.error(toastErrMsg);

            fnc?.();

        }
    }, [errMsg, error, fnc, unAuthorizedMsg]);

}

export default useHandleFetchError;