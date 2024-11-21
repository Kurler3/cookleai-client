import { FC } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

type IProps = {
  message?: string;
}

const ErrorScreen: FC<IProps> = ({
  message,
}) => {

  return (
    <div className="flex items-center justify-center h-screen bg-base-300 text-center gap-6 flex-col">

      <h1 className="text-5xl font-bold mb-4 text-red-500">Oops!</h1>
      <p className="text-xl mb-4">
        {message ?? 'Something went wrong. Please try again later.'}
      </p>
      <Link to="/" className="text-green-500 underline">
        <button className='btn btn-accent'>
          Go back to Home
        </button>
      </Link>

    </div>
  );
};

export default ErrorScreen;
