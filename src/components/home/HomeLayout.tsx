import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar'
import { useAuth } from '../../hooks/auth/useAuth.hook';

const HomeLayout = () => {

  const {isLoggedIn} = useAuth();


  return (
    <div className='flex flex-col px-8 py-4 min-h-full max-w-[100vw]'>

      {/* NAVBAR */}
        <Navbar isLoggedIn={isLoggedIn}/>

        {/* CHILDREN */}
        <div className='flex-1'>
          <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout