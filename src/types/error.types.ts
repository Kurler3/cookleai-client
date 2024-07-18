import { AxiosError } from "axios";

export type INetworkError = Error & {
    statusCode: number;
};

export type IAxiosNetworkError = AxiosError & {
    response: {
        data: {
            message: string;
            statusCode: number;
        };
    };
};
