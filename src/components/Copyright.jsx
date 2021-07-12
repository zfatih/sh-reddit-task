import React from 'react';

import { Typography, Link } from '@material-ui/core';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://reddit.com/">
                reddit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;