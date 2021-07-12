import React from 'react';

import { Typography } from '@material-ui/core';

const NothingToShow = (props) => {
    return (
        <Typography component='h5' variant='h5' color="textSecondary" align="center">
            {'There is nothing to show yet.'}
        </Typography>
    );
}

export default NothingToShow;