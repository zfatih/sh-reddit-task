import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalState } from "../providers/GlobalStateProvider"

const objectsPerPage = 5;

export const useSubscriptions = () => {
    const { apiWrapper } = useGlobalState();

    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    
    const getSubscriptions = (params = {}) => {
        const { loadNextPage = false } = params;
        
        let oldSubscriptions = [];
        let after = null;
        if(loadNextPage){
            oldSubscriptions = [...subscriptions];
            after = 't5_' + subscriptions[subscriptions.length - 1].id;
        }
        
        return new Promise((resolve, reject) => {
            setLoading(true);
            apiWrapper.getSubscriptions({
                limit: objectsPerPage,
                after,
            })
                .then(_subscriptions => {
                    setLoading(false);
                    let _arraySubscriptions = Array.from(_subscriptions);
                    if(_subscriptions._query.after === null){
                        setHasNext(false);
                    } else {
                        setSubscriptions([...oldSubscriptions, ..._arraySubscriptions]);
                        setHasNext(true);
                        setCurrentPage(currentPage + 1)
                    }
                    resolve(_arraySubscriptions);
                })
                .catch(error => {
                    setLoading(false);
                    console.log(error)
                    toast.error("Something failed!");
                })
        });
    };
    
    return {
        getSubscriptions,
        data: subscriptions,
        isLoading: loading,
        currentPage,
        hasNext,
    };
}