import { useNavigate } from "react-router-dom";
// import { useGetUser } from "../hooks/user";
import { ComponentType, useEffect } from "react";
import { useAuth } from "../hooks/auth/useAuth.hook";


const withAuth = <P extends object>(Component: ComponentType<P>) => {
   
    return (props: P) => {
      const navigate = useNavigate();
        
      const { user, isLoadingUser, error } = useAuth();
      
      console.log({
        user, isLoadingUser, error
      })

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