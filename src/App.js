import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import {ThemeProvider} from '@material-ui/core';
import {theme} from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/Search/" component={Search} />
                    <Route path="/Detail/:name" component={Detail} />
                    <Route path="/Login/" component={Login} />
                    <Route path="/SignUp/" component={SignUp} />
                    <Route path="/" component={Search} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
