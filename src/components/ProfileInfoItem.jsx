import React, { Fragment } from 'react';

import { ListItem, ListItemAvatar, Divider, ListItemText } from '@material-ui/core';

const ProfileInfoItem = (props) => {
    const {
        value,
        description, 
        icon, 
        hasDivider
    } = props;

    return (
        <Fragment>
            <ListItem>
                <ListItemAvatar>
                    {icon}
                </ListItemAvatar>
                <ListItemText
                    primary={value}
                    secondary={description}
                    />
            </ListItem>
            {hasDivider && <Divider />}
        </Fragment>
    );
}

export default ProfileInfoItem;