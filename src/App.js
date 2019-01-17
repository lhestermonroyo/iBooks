import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './components/HomePage';
import SignUp from './components/SignUpPage';
import LogIn from './components/LogInPage';
import Axios from 'axios';
// import Main from './layouts/Main';
// import { Provider } from 'react-redux';
// import store from './store';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: null,
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  updateUser(userObject) {
    this.setState(userObject);
  }
  getUser() {
    Axios.get('http://localhost:4000/api/users/').then((result) => {
      if (result.data.user) {
        console.log('There is a user saved in the server session.');
        console.log(result.data.user.username);

        this.setState({
          loggedIn: true,
          username: result.data.user.username,
        });
      }
      else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn} username={this.state.username}></Header>
        <Switch>
          <Route exact path="/" render={() => <Home></Home>}></Route>
          <Route path="/signup" render={() => <SignUp></SignUp>}></Route>
          <Route path="/login" render={() => <LogIn updateUser={this.updateUser}></LogIn>}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
