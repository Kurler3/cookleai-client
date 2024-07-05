import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar'
import { useUser } from '../../hooks/user/useUser.hook';

const HomeLayout = () => {

  const {isLoggedIn} = useUser();

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