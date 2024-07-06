import BlenderIcon from '@mui/icons-material/Blender';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ExploreIcon from '@mui/icons-material/Explore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export const DASHBOARD_DRAWER_ID = 'dashboard-drawer';


export const DASHBOARD_SIDEBAR_GROUPS = [
    {
        id: 'navigation',
        label: 'Navigation',
        items: [
            {
                id: 'recipes',
                label: 'Recipes',
                uri: '/dashboard/recipes',
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