import React , { component } from 'react'
import Register from './auth/register'
import Login from './auth/login'
import Home from './auth/home'
import ProtectedRoute from './auth/prot'
import {Switch,Route} from "react-router-dom";

const App = () => {
  return (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/home" component={Home} />
    </Switch>
  );
}

export default App;
