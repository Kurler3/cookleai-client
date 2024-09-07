



export const FRONT_END_BASE_URL = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' 
    ? process.env.REACT_APP_FRONTEND_DEV_BASE_URL : process.env.REACT_APP_FRONTEND_PROD_BASE_URL;