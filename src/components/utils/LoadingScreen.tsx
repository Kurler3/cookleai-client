import { motion } from 'framer-motion';
import logo from '../../assets/images/logo.png'; // Adjust the path to your logo
import { FC } from 'react';

type IProps = {
  message?: string;
}

const LoadingScreen:FC<IProps> = ({
  message,
}) => {

  return (
    <div className="flex items-center justify-center h-screen bg-base-300 gap-4">
      <div className="flex flex-col items-center">
        <motion.div
          className="avatar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="w-60 h-60 rounded-full ring-offset-base-100 ring-offset-2">
            <img src={logo} alt="avatar" />
          </div>
        </motion.div>
        <div className="flex items-center mt-10 space-x-2 flex-col gap-4">
          <motion.img
            className="w-20 h-20"
            src="https://www.svgrepo.com/show/70469/loading.svg"
            alt="Loading icon"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
          <motion.div
            className="text-lg font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {message ?? "Loading..."}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
