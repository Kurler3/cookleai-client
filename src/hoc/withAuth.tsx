import { useNavigate } from "react-router-dom";
import { ComponentType, useEffect } from "react";
import { useGetUser } from "../hooks/user";


const withAuth = <P extends object>(Component: ComponentType<P>) => {
   
    return (props: P) => {
      
      const navigate = useNavigate();
        
      const { user, isLoadingUser, error } = useGetUser();

      console.log({
        user,
        isLoadingUser
      })

      useEffect(() => {
        if((error || !user) && !isLoadingUser) {
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