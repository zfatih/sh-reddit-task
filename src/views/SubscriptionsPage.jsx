import React, { useEffect, useMemo, useState } from 'react';

import { CircularProgress, makeStyles, List } from '@material-ui/core';

import useInfiniteScroll from 'react-infinite-scroll-hook';

import SubredditCard from '../components/SubredditCard';
import NothingToShow from '../components/NothingToShow';
import SaveAsJson from '../components/SaveAsJson';

import { useSubscriptions } from '../services/useSubscriptions';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: '20px',
        width: '100%',
    },
    cardItem: {
        marginBottom: '25px',
    },
    loader: {
        alignSelf: 'center',
    },
    list: {
        maxHeight: '100%', 
        overflow: 'auto', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    saveButton: {
        position: 'absolute',
        right: 50,
        bottom: 35,
        width: '70px',
        height: '70px',
    },  
}))

const SubscriptionsPage = (props) => {
    const classes = useStyles();

    const [subscriptions, setSubscriptions] = useState();

    const [selectedIds, setSelectedIds] = useState([]);

    const { getSubscriptions, isLoading, hasNext } = useSubscriptions();

    const appendData = (dataToAppend) => {
        if(Array.isArray(subscriptions)){
            setSubscriptions([...subscriptions, ...dataToAppend]);
        } else {
            setSubscriptions(dataToAppend);
        }
    }

    const mutateSubscription = (subscription) => {
        let _subscriptions = [...subscriptions];
        let index = _subscriptions.findIndex(_subscription => _subscription.id === subscription.id);
        if(index !== -1){
            _subscriptions[index] = subscription;
        }
        setSubscriptions(_subscriptions);
    }

    const toggleSelectSubscription = (subscription) => {
        const { isSelected, id } = subscription;
        if(!isSelected){
            setSelectedIds([...selectedIds, id]);
        } else {
            let _selectedIds = [...selectedIds];
            let index = _selectedIds.findIndex(_id => _id === id);
            if (index > -1) {
                _selectedIds.splice(index, 1);
            }
            setSelectedIds(_selectedIds);
        }
        mutateSubscription({
            ...subscription,
            isSelected: !isSelected,
        })
    }

    const toggleFavoriteSubscription = (subscription) => {
        mutateSubscription({
            ...subscription,
            user_has_favorited: !subscription.user_has_favorited,
        })
    }

    const [infiniteRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage: hasNext,
        onLoadMore: () => {
            getSubscriptions({ loadNextPage: true}).then(appendData) 
        },
    });

    useEffect(() => {
        getSubscriptions().then(appendData);
    }, []);

    const saveButton = useMemo(() => {
        if(selectedIds.length === 0)return null;

        let objectToSave = [];
        selectedIds.forEach(_id => {
            objectToSave.push(subscriptions.find(_subscription => _subscription.id === _id));
        })
        return <SaveAsJson objectToSave={objectToSave} className={classes.saveButton} />
    }, [selectedIds])

    return (
        <div className={classes.root}>
            {subscriptions?.length === 0 && !isLoading && <NothingToShow />} 
            <List 
                align='stretch'
                className={classes.list}
                ref={infiniteRef}
            >
                {subscriptions?.map(_subscription => <SubredditCard 
                    subreddit={_subscription} 
                    className={classes.cardItem}
                    key={_subscription.id} 
                    toggleSelect={() => {
                        toggleSelectSubscription(_subscription)
                    }}
                    toggleFavorite={() => {
                        toggleFavoriteSubscription(_subscription)
                    }}
                />)}
                {isLoading && <CircularProgress className={classes.loader} />}
            </List>
            {saveButton}
        </div>
    );
}

export default SubscriptionsPage;