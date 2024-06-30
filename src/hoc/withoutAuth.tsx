import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { COOKLEAI_ACCESS_TOKEN } from '../utils/constants';
import { useGetUser } from '../hooks/user';
 

const withoutAuth = <P extends object>(Component: ComponentType<P>) => {

    return (props: P) => {

        const navigate = useNavigate();

        // If no token, return component directly
        if(!localStorage.getItem(COOKLEAI_ACCESS_TOKEN)) {
            return <Component {...props}/>
        }

        // Check if user is logged in
        const { user, isLoadingUser, error } = useGetUser();

        if(isLoadingUser) {
            return <div>Loading...</div>;
        }

        // If user exists => navigate to homepage
        if(user || error) {
            navigate('/');
            return null;
        }

        // Return component
        return <Component {...props} />
    }

}

export default withoutAuth;