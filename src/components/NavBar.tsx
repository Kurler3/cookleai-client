
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/images/logo.png'

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


const Navbar = () => {
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
                <a 
                    href='/' 
                    className="btn btn-ghost text-main-text-green text-sm md:text-base lg:text-xl"
                >
                    CookleAI
                </a>

                <ul className="menu menu-horizontal ml-4 hidden md:flex gap-4">
                    {
                        navItems.map((navItem) => {
                            return (
                                <li key={`nav_item_${navItem.label}`}>
                                    <a
                                        href={navItem.url}
                                        className={`
                                            btn
                                            ${navItem.color ? `text-${navItem.color}` : ''} 
                                            ${navItem.bgColor ? `btn-${navItem.bgColor}` : ''}
                                        `}
                                    >
                                        {navItem.label}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            {/* END */}
            <div className="navbar-end">

                <div className='hidden md:flex justify-center items-center gap-4'>
                    {/* LOGIN */}
                    <a
                        href='/login'
                        className='btn btn-ghost text-accent'
                    >
                        Login
                    </a>
                    {/* GET STARTED FOR FREE */}
                    <a
                        href='/login'
                        className="btn hidden md:inline-flex btn-accent text-accent-content">
                        Get Started For Free

                        {/* LOGIN ICON */}
                        <LoginIcon />

                    </a>
                </div>


                <div className="dropdown">
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Explore</a></li>
                        <li><a>About</a></li>
                        <li><a>Login</a></li>
                        {/* SIGN UP BTN */}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default Navbar;
