import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/HomePage';
import SignUp from '../components/SignUpPage';
import LogIn from '../components/LogInPage';

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/login" component={LogIn}></Route>
      </Switch>
    )
  }
}

export default Main;