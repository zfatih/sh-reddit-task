import React from 'react';

import { Avatar, Grid, makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { 
    MonetizationOn as MonetizationOnIcon,
    Stars as StarsIcon,
    People as PeopleIcon,
    Chat as ChatIcon,
} from '@material-ui/icons';
import ProfileInfoItem from './ProfileInfoItem';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: '20px',
        width: '100%',
        maxWidth: '500px',
    },
    avatar: {
        height: 70,
        width: 70,
    },
}));

const ProfileInfo = (props) => {
    const { user } = props;

    const classes = useStyles();

    const listItems = [
        {
            value: user.coins,
            description: 'Coins earned',
            icon: <MonetizationOnIcon />,
        },
        {
            value: user.gold_creddits,
            description: 'Gold creddits earned',
            icon: <StarsIcon />,
        },
        {
            value: user.num_friends,
            description: 'Number of friends',
            icon: <PeopleIcon />,
        },
        {
            value: user.inbox_count,
            description: 'Inbox messages',
            icon: <ChatIcon />,
        },
    ]

    return (
        <div className={classes.container}>
            <Grid container justifyContent={`center`}>
                <Avatar alt={`Profile Picture`} src={user.icon_img} className={classes.avatar} />
            </Grid>
            <Grid container justifyContent={`center`}>
                <Typography className={classes.text} variant={`h4`} gutterBottom>
                    {user.username}
                </Typography>
            </Grid>
            {listItems.map((listItem, index) => (
                <ProfileInfoItem key={listItem.description} {...listItem} hasDivider={index < listItems.length - 1} />
            ))}
        </div>
    );
}

export default ProfileInfo;