
export const BASE_BACKEND_URL = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_BACKEND_API_URL : process.env.REACT_APP_PROD_BACKEND_API_URL;