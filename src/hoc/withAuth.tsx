import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/user";
import { ComponentType } from "react";


const withAuth = <P extends object>(Component: ComponentType<P>) => {
    const WrappedComponent = (props: P) => {
      const navigate = useNavigate();
        

      const { user, isLoadingUser, error } = useGetUser();
  
      if (isLoadingUser) {
        return <div>Loading...</div>;
      }
  
      if (error || !user) {
        navigate('/login');
        return null;
      }
  
      return <Component {...props} />;
    };
  
    return WrappedComponent;
  };

export default withAuth;