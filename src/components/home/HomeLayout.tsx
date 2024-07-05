import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar'
import { useGetUser } from '../../hooks/user';

const HomeLayout = () => {

  const {isLoggedIn} = useGetUser();

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