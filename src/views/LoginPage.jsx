import React from 'react';
import { makeStyles } from '@material-ui/core';

import { Avatar, CssBaseline, Paper, Grid, Typography } from '@material-ui/core';
import { Reddit as RedditIcon } from '@material-ui/icons';

import LoginForm from '../components/LoginForm';
import { useLogin } from '../services/useLogin';
import { useGlobalState } from '../providers/GlobalStateProvider';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
}));

const LoginPage = (props) => {
    const classes = useStyles();

    const location = useLocation();

    const { authUrl, fromCode } = useGlobalState();

    const { login, loading } = useLogin();

    const onLink = e => {
        window.location.href = authUrl;
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        if(code){
            fromCode(code);
        }
    }, [location.search, fromCode])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <RedditIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <LoginForm onSubmit={login} onLink={onLink} loading={loading} />
                </div>
            </Grid>
        </Grid>
    );
}

export default LoginPage;