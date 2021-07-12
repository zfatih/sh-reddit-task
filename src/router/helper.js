import HomePage from "../views/HomePage";
import SubscriptionsPage from "../views/SubscriptionsPage";

import { Home as HomeIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';

export const routes = [
    {
        to: '/',
        title: 'Home',
        component: <HomePage />,
        icon: <HomeIcon />,
        exact: true,
    },
    {
        to: '/subscriptions',
        title: 'Subscriptions',
        component: <SubscriptionsPage />,
        icon: <BookmarkIcon />
    }
]

export const drawerWidth = 240;