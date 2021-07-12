import React from 'react';
import { GlobalStateProvider } from './GlobalStateProvider';
import ThemeProvider from './ThemeProvider';

const Providers = ({ children }) => {
    return (
        <ThemeProvider>
            <GlobalStateProvider>
                {children}
            </GlobalStateProvider>
        </ThemeProvider>
    );
};

export default Providers;
