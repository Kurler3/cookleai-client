import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar'

const HomeLayout = () => {
  return (
    <div className='flex flex-col px-8 py-4 min-h-full max-w-[100vw]'>

      {/* NAVBAR */}
        <Navbar />

        {/* CHILDREN */}
        <div className='flex-1'>
          <Outlet />
        </div>
    </div>
  )
}

export default HomeLayout