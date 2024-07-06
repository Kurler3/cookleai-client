import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-base-300 text-center gap-6 flex-col">

            <h1 className="text-5xl font-bold mb-4 text-red-500">404</h1>
            <p className="text-xl mb-4">Page not found</p>
            <Link to="/" className="text-green-500 underline">
            <button className='btn btn-accent'>
            Go back to Home
            </button>
        </Link>
        </div>
    );
}

export default NotFound