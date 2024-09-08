import axios from "axios";
import { BASE_BACKEND_URL } from "./utils/constants";

export default axios.create({
    baseURL: BASE_BACKEND_URL, 
});
