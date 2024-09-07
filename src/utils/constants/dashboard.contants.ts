import BlenderIcon from '@mui/icons-material/Blender';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTE_PATHS } from './routing.constants';


export const DASHBOARD_DRAWER_ID = 'dashboard-drawer';


export const DASHBOARD_SIDEBAR_GROUPS = [
    {
        id: 'navigation',
        label: 'Navigation',
        items: [
            {
                id: 'recipes',
                label: 'Recipes',
                uri: ROUTE_PATHS.DASHBOARD,
                icon: BlenderIcon,
            },
            {
                id: 'cookbooks',
                label: 'Cookbooks',
                uri: '/dashboard/cookbooks',
                icon: AutoStoriesIcon,
            },
            {
                id: 'explore',
                label: 'Explore',
                uri: '/dashboard/explore',
                icon: ExploreIcon,
            },
            {
                id: 'profile',
                label: 'Profile',
                uri: '/dashboard/profile',
                icon: AccountBoxIcon,
            },
        ]
    }
]

export const DASHBOARD_SIDEBAR_PROFILE_ITEMS = [
    {
        id: 'homepage',
        label: 'Homepage',
        uri: '/',
        icon: HomeIcon,
    },
    {
        id: 'profile',
        label: 'Profile',
        uri: '/dashboard/profile',
        icon: AccountBoxIcon,
    },
    {
        id: 'settings',
        label: 'Settings',
        uri: '/dashboard/settings',
        icon: SettingsIcon,
    },
    {
        id: 'logout',
        label: 'Logout',
        uri: '/logout',
        icon: LogoutIcon,
    },
];