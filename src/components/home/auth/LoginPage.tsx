

import { motion } from 'framer-motion';
import Logo from '../../utils/Image';
import Image from '../../utils/Image';


const LoginPage = () => {


  /////////////////////////
  // FUNCTIONS ////////////
  /////////////////////////

  const redirectToLogin = () => {
      window.location.href = 'http://localhost:3000/auth/google';
  }

  /////////////////////////
  // RETURN ///////////////
  /////////////////////////

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-white relative">

      {/* BACKGROUND */}
      <Image
        image='background'
        className='absolute top-0 left-0 w-screen h-screen overflow-clip object-cover bg-cover'
      />

      {/* CARD WITH LOGIN DETAILS */}
      <div 
        className="card justify-start items-center shadow-lg bg-base-100 w-80 p-6 relative gap-6"
      >

        <Logo 
          image='logo'
          className='w-20 absolute top-[-40px] m-auto border border-accent rounded-full bg-accent-content'
        />

        <h3 className="text-[#F4F4F4] text-3xl font-bold mt-4">
          Log In
        </h3>

        <p className="text-[#dfdfdf] text-base">
          Happy to see you!
        </p>

        {/* GOOGLE LOGIN BTN */}
        <motion.button
          onClick={redirectToLogin}
          whileTap={{ scale: 0.9 }}      // Scale button down on tap
          transition={{ duration: 0.2 }} // Duration of the animations
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 bg-card font-bold'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className="mr-2 size-5"><title>Google Logo</title><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>

          Log in with Google
        </motion.button>

      </div>
     
    </div>
  )
}

export default LoginPage