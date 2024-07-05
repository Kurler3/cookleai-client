import { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useAuth.hook';
import { useUser } from '../hooks/user/useUser.hook';


const withoutAuth = <P extends object>(Component: ComponentType<P>) => {

    return (props: P) => {

        const navigate = useNavigate();

        // Check if user is logged in
        const { user, isLoadingUser, error } = useUser();

        const {
            token
        } = useAuth()

        // If no token, return component directly
        if (!token) {
            return <Component {...props} />
        }

        if (isLoadingUser) {
            return <div>Loading...</div>;
        }

        // If user exists => navigate to homepage
        if (user || error) {
            navigate('/');
            return null;
        }

        // Return component
        return <Component {...props} />
    }

}

export default withoutAuth;