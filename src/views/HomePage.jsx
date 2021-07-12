import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useGlobalState } from '../providers/GlobalStateProvider';
import ProfileInfo from '../components/ProfileInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const HomePage = (props) => {
    const classes = useStyles();

    const { me } = useGlobalState();

    return (
        <div className={classes.root}>
            <ProfileInfo user={me} />
        </div>
    );
}

export default HomePage;