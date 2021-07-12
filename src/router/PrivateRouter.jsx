import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container } from "@material-ui/core";

import AppBar from "../components/AppBar";
import Drawer from "../components/Drawer";
import { routes } from "./helper";
import { useLogout } from "../services/useLogout";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));


const PrivateRouter = () => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const { logout } = useLogout();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Router>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar open={open} handleDrawerOpen={handleDrawerOpen} onLogout={logout} />
                <Drawer open={open} handleDrawerClose={handleDrawerClose} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            {routes.map(({to, title, component, exact}) => 
                                <Route path={to} key={title} exact={exact}>
                                    {component}
                                </Route>
                            )}
                        </Switch>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

export default PrivateRouter;