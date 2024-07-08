
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.png'
import React from 'react';
import { useNavigate } from 'react-router-dom';

type NavItem = {
    label: string;
    url: string;
    color?: 'neutral-content';
    bgColor?: 'neutral' | 'ghost'
}

const navItems: NavItem[] = [
    {
        label: 'Explore',
        url: '/dashboard/explore',
        color: 'neutral-content',
        bgColor: 'ghost',
    },
    {
        label: 'About',
        url: '/about',
        bgColor: 'ghost'
    }
]


type IProps = {
    isLoggedIn: boolean;
    isLoadingUser: boolean;
}

const Navbar: React.FC<IProps> = ({ isLoggedIn, isLoadingUser }) => {

    const navigate = useNavigate();

    const handleNavigate = (uri: string) => navigate(uri);


    return (
        <div className="navbar bg-base-100">

            {/* LEFT SIDE */}
            <div className="navbar-start">

                <div className="avatar">
                    <div className="w-10 md:w-20 ">
                        <img src={logo} />
                    </div>
                </div>

                {/* IMG LOGO */}
                <button

                    className="btn btn-ghost text-main-text-green text-sm md:text-base lg:text-xl"
                    onClick={() => handleNavigate('/')}
                >
                    CookleAI
                </button>

                <ul className="menu menu-horizontal ml-4 hidden md:flex gap-4 sm:flex-row flex-nowrap">
                    {
                        navItems.map((navItem) => {
                            return (
                                <li key={`nav_item_${navItem.label}`}>
                                    <button
                                        onClick={() => handleNavigate(navItem.url)}
                                        className={`
                                            btn
                                            ${navItem.color ? `text-${navItem.color}` : ''} 
                                            ${navItem.bgColor ? `btn-${navItem.bgColor}` : ''}
                                        `}
                                    >
                                        {navItem.label}
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            {/* END */}
            <div className="navbar-end">

                <div className='hidden md:flex justify-center items-center gap-4'>

                    {
                        isLoadingUser ? (
                            <span className="loading loading-spinner text-success"></span>
                        ) :
                            isLoggedIn ? (
                                <button
                                    onClick={() => handleNavigate('/dashboard/recipes')}
                                    className='btn btn-success text-white'
                                >
                                    Go to your recipes
                                </button>
                            ) : (
                                <>
                                    {/* LOGIN */}
                                    <button
                                        onClick={() => handleNavigate('/login')}
                                        className='btn btn-ghost text-accent'
                                    >
                                        Login
                                    </button>
                                    {/* GET STARTED FOR FREE */}
                                    <button

                                        onClick={() => handleNavigate('/login')}
                                        className="btn hidden md:inline-flex btn-accent text-accent-content">
                                        Get Started For Free

                                        {/* LOGIN ICON */}
                                        <LoginIcon />

                                    </button>
                                </>
                            )
                    }


                </div>


                {
                    isLoadingUser ? (
                        <span className="md:hidden loading loading-spinner text-success"></span>
                    )
                        : (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">

                                    {
                                        navItems.map((navItem) => {
                                            return (
                                                <li key={`nav_item_small_${navItem.label}`}>
                                                    <button onClick={() => handleNavigate(navItem.url)} className='font-medium'>
                                                        {navItem.label}
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }

                                    {
                                        isLoggedIn ? (
                                            <li>
                                                <button className='btn btn-sm btn-success text-white' onClick={() => handleNavigate('/dashboard/recipes')}>
                                                    Go to your recipes
                                                </button>
                                            </li>
                                        ) : (
                                            <>
                                                {/* Login */}
                                                <li>
                                                    <button className='btn btn-sm text-left' onClick={() => handleNavigate('/login')}>
                                                        Login
                                                    </button>
                                                </li>

                                                {/* GET STARTED */}
                                                <li>
                                                    <button
                                                        onClick={() => handleNavigate('/login')}
                                                        className="btn btn-sm md:inline-flex btn-accent text-accent-content">
                                                        Get Started For Free

                                                        {/* LOGIN ICON */}
                                                        <LoginIcon />

                                                    </button>
                                                </li>

                                            </>

                                        )
                                    }

                                </ul>
                            </div>
                        )
                }

            </div >
        </div >
    )
};

export default Navbar;
