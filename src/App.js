import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Footer from 'components/Footer';
import {theme} from 'theme';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path="/Search/" component={Search} />
                        <Route path="/Detail/:id" component={Detail} />
                        <Route path="/" component={Search} />
                    </Switch>
                    <Footer />
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
