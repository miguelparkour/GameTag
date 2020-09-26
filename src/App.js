import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'
import AddGame from './pages/AddGame'
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
 
function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path='/Home' component={Home} />
        <Route path='/Search/:search' component={Search} />
        <Route path='/Detail/:slug' component={Detail}/>
        <Route path='/AddGame' component={AddGame}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
    </ThemeProvider>
  )
}

export default App;
