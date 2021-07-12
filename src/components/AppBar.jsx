import React, { useState, useRef } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar as AppBarMUI, Toolbar, IconButton, Popover, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { 
    Menu as MenuIcon, 
    AccountCircle as AccountCircleIcon,
    ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
}));
  

const AppBar = (props) => {
    const classes = useStyles();

    const { open, handleDrawerOpen, onLogout } = props;

    const buttonRef = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(buttonRef.current);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBarMUI position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Reddit Helper
                </Typography>
                <IconButton color="inherit" onClick={handleClick} ref={buttonRef}>
                    <AccountCircleIcon />
                </IconButton>
                <Popover
                    open={popoverOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <List>
                        <ListItem button onClick={onLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary='Log out' />
                        </ListItem>
                    </List>
                </Popover>
            </Toolbar>
        </AppBarMUI>
    );
}

export default AppBar;