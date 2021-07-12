import React from 'react';

import { makeStyles, alpha } from '@material-ui/core/styles';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';

import clsx from 'clsx';

import { Star as StarIcon, StarBorder as StarBorderIcon } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    depositContext: {
        flex: 1,
    },
    cardRoot: {
        transition: theme.transitions.create(['background-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    cardSelected: {
        backgroundColor: alpha(theme.palette.info.light, 0.2),
    },
    cardTitle: {
        position: 'relative',
    },
    starIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));

const SubredditCard = (props) => {
    const { 
        subreddit, 
        className,
        toggleFavorite,
        toggleSelect
    } = props;
 
    const classes = useStyles();

    const handleStarClick = (e) => {
        toggleFavorite();
        e.stopPropagation();
    }

    const handleItemClick = (e) => {
        toggleSelect();
    }

    return (
        <Card 
            className={clsx({
                [className]: true,
                [classes.cardRoot]: true,
                [classes.cardSelected]: subreddit.isSelected,
            })}>
            <CardActionArea component='div' onClick={handleItemClick}>
                <CardHeader
                    avatar={
                        <Avatar src={subreddit.icon_img} className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    title={
                        <Typography 
                            component='h4' 
                            variant='h4'
                            className={classes.cardTitle}
                        >
                            {subreddit.title}
                            <IconButton 
                                color="primary" 
                                aria-label="star" 
                                disabled={subreddit.isSelected}
                                className={classes.starIcon} 
                                onClick={handleStarClick}
                            >
                                {subreddit.user_has_favorited ? 
                                    <StarIcon fontSize='large' /> : 
                                    <StarBorderIcon fontSize='large' /> 
                                }
                            </IconButton>
                        </Typography>
                    }
                    subheader={`${subreddit.subscribers} subscribed members`}
                />
                {subreddit.public_description && <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {subreddit.public_description}
                    </Typography>
                </CardContent>
                }
            </CardActionArea>
        </Card>
    );
}

export default SubredditCard;