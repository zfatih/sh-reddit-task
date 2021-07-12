import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from "../views/LoginPage";

const PublicRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default PublicRouter;