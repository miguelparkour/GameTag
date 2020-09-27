import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Search from './pages/Search'
import Detail from './pages/Detail'
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
 
function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
        <Route path='/Search/' component={Search} />
        <Route path='/Detail/:name' component={Detail}/>
        <Route path='/' component={Search}/>
    </Router>
    </ThemeProvider>
  )
}

export default App;
