//import {createMuiTheme} from '@material-ui/core/styles';
import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#11001c',
            dark: '#8d99ae',
            contrastText: '#edf2f4',
        },
    },
});
