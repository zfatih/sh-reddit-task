import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalState } from "../providers/GlobalStateProvider"

export const useLogin = () => {
    const { createWrapper, setApiWrapper, setMe } = useGlobalState();

    const [loading, setLoading] = useState(false);
    
    const login = ({username, password}) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            let wrapper = createWrapper({username, password});
            wrapper.getMe()
                .then(user => {
                    setMe({
                        ...user,
                        username
                    });
                    setApiWrapper(wrapper);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    toast.error("Incorrect email or password!");
                })
        });
    };
    
    return {
        login,
        loading
    };
}