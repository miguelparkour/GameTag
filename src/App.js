import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/Search/" component={Search} />
                    <Route path="/Detail/:id" component={Detail} />
                    <Route path="/" component={Search} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
