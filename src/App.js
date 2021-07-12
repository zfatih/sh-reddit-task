import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Providers from './providers';
import BaseRouter from './router/BaseRouter';

const App = () => {
    return (
        <Providers>
            <ToastContainer />
            <BaseRouter />
        </Providers>
    );
}

export default App;
