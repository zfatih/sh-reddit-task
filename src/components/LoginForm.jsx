import React, { useState } from 'react';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';

import { Button, TextField, FormControlLabel, Checkbox, Link, Box, Grid } from '@material-ui/core';

import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    or: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    linkButton: {
        marginBottom: '20px',
    },
}));

const LoginForm = (props) => {
    const { onSubmit, onLink, loading } = props;

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form 
            className={classes.form} 
            noValidate 
            onSubmit={e => {
                onSubmit({username, password})
                e.preventDefault();
            }}
        >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign In
                {loading && <CircularProgress color='secondary' size={20} /> }
            </Button>
            <Typography className={classes.or}>
                or
            </Typography>
            <Button 
                color='primary' 
                fullWidth
                variant='contained' 
                className={classes.linkButton}
                disabled // disabled for CORS reasons
                onClick={onLink}
            >
                Link reddit account
            </Button>
            <Grid container>
                <Grid item xs>
                    {'Forgot '}
                    <Link href="https://www.reddit.com/username?experiment_d2x_2020ify_buttons=enabled" variant="body2">
                        username
                    </Link>
                    {' or '} 
                    <Link href="https://www.reddit.com/username?experiment_d2x_2020ify_buttons=enabled" variant="body2">
                        password
                    </Link>
                    ?
                </Grid>
                <Grid item>
                    <Link href="https://www.reddit.com/register/" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
                <Copyright />
            </Box>
        </form>
    );
}

export default LoginForm;