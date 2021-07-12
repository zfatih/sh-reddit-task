import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF5700',
        },
        secondary: {
            main: '#ff9100'
        },
    },
});

const ThemeProvider = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
}

export default ThemeProvider;