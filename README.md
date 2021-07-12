## App Description

This is a small web application where you can log in using reddit credentials and see data related to you such as: profile picture, number of friends etc. On subreddits page, you can see what subreddits you are subscribed to and select some in order to save them.

## Setup

You must first create the app on https://www.reddit.com/prefs/apps. Make sure type of the app is 'script' and about url and redirect uri are set to "https://localhost:3000". After creating you will see the ID and SECRET of the application.

Create .env file in root directory of the project and add lines:
REACT_APP_CLIENT_ID={ID_OF_THE_APP_YOU_CREATED}
REACT_APP_CLIENT_SECRET={SECRET_OF_THE_APP_YOU_CREATED}
REACT_APP_BASE_URL=https://localhost:3000
HTTPS=true

Or you can skip this and ask the developer to add you on existing one. Contact email: "fatih.zukorlic@gmail.com".

## Launching the app

Run commands:
npm install
npm start

You should be able to access the webpage in browser on "https://localhost:3000".