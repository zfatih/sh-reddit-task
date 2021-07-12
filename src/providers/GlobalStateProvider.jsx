import React, { useState, useEffect } from 'react';

import Snoowrap from 'snoowrap';

const GlobalStateContext = React.createContext();

const GlobalStateProvider = (props) => {
    const [apiWrapper, setApiWrapper] = useState(null);
    const [me, setMe] = useState(null);
    const [authUrl, setAuthUrl] = useState(null);

    useEffect(() => {
        if(me){
            localStorage.setItem('accessToken', apiWrapper?.accessToken);
        } else {
            localStorage.clear();
        }
    }, [me, apiWrapper])

    useEffect(() => {
        let authUrl = Snoowrap.getAuthUrl({
            clientId: process.env.REACT_APP_CLIENT_ID,
            scope: [
              'account', 'history', 'identity', 'mysubreddits', 'privatemessages'
            ],
            redirectUri: process.env.REACT_APP_BASE_URL,
            permanent: true,
            state: require('crypto').randomBytes(16).toString('base64'),
        })
        setAuthUrl(authUrl);

        // wrapper error
        // let accessToken = localStorage.getItem('accessToken');
        // if(accessToken){
        //     let _apiWrapper = createWrapper({accessToken});
        //     _apiWrapper.getMe()
        //         .then(user => {
        //             setMe(user);
        //             setApiWrapper(_apiWrapper);
        //         })
        //         .catch(error => {
        //             localStorage.clear();
        //         })
        // }
    }, []);

    const createWrapper = (moreOptions) => {
        let _apiWrapper = new Snoowrap({
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            ...moreOptions
        });
        return _apiWrapper;
    }

    const fromCode = (code) => {
        // const params = new URLSearchParams();
        // params.append("grant_type", "authorization_code");
        // params.append("code", code);
        // params.append("redirect_uri", process.env.REACT_APP_BASE_URL)

        // const config = {
        //     headers: {
        //         "Content-Type": "application/x-www-form-urlencoded",
        //     },
        //     auth: {
        //         username: process.env.REACT_APP_CLIENT_ID,
        //         password: process.env.REACT_APP_CLIENT_SECRET,
        //     },
        // };

        // const response = axios.post('https://www.reddit.com/api/v1/access_token', params, config).then(res=>console.log(res));

        // Snoowrap.fromAuthCode({
        //     clientId: process.env.REACT_APP_CLIENT_ID,
        //     code,
        //     redirectUri: process.env.REACT_APP_BASE_URL,
        // }).then(console.log)
    }

    return (
        <GlobalStateContext.Provider value={{
            apiWrapper, setApiWrapper,
            me, setMe,
            authUrl,
            fromCode,
            createWrapper,
        }} {...props}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = React.useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a Provider');
    }

    return context;
};

export { GlobalStateProvider, useGlobalState };
