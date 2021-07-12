import React from "react";

import { useGlobalState } from "../providers/GlobalStateProvider";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const BaseRouter = () => {
    const { apiWrapper } = useGlobalState();

    return (
        apiWrapper ? 
            <PrivateRouter /> :
            <PublicRouter />
    );
}

export default BaseRouter;