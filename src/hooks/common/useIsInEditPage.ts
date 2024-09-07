import { useLocation } from "react-router-dom";





const useIsInEditPage = () => {

    const location = useLocation();
    // Get the pathname from the location
    const pathname = location.pathname;

    // Split the pathname into parts based on the '/' delimiter
    const pathParts = pathname.split("/");

    // Extract the last part
    const lastPart = pathParts[pathParts.length - 1];

    return lastPart === 'edit';
}

export default useIsInEditPage;