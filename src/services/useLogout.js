import { useGlobalState } from "../providers/GlobalStateProvider"

export const useLogout = () => {
    const { setApiWrapper, setMe } = useGlobalState();

    const logout = () => {
        return new Promise((resolve, reject) => {
            setApiWrapper();
            setMe();
        });
    };
    
    return {
        logout,
    };
}