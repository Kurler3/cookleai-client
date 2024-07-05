import { useNavigate } from "react-router-dom";
import { ComponentType, useEffect } from "react";
import { useUser } from "../hooks/user/useUser.hook";


const withAuth = <P extends object>(Component: ComponentType<P>) => {
   
    return (props: P) => {
      const navigate = useNavigate();
        
      const { user, isLoadingUser, error } = useUser();

      useEffect(() => {
        if(error || !user) {
          navigate('/login')
        }
      }, [])

      if (isLoadingUser) {
        return <div>Loading...</div>;
      }
  
      if (error || !user) {
        return null;
      }
  
      return <Component {...props} />;
    };;
  };

export default withAuth;