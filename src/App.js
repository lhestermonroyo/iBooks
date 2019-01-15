import React from 'react';
import Header from './layouts/Header';
import Main from './layouts/Main';
import Axios from 'axios';
// import { Provider } from 'react-redux';
// import store from './store';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn: false,
      username: null
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
        console.log(result.data.user);

        this.setState({
          loggedIn: true,
          username: result.data.user.username
        });
      }
      else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({
        loggedIn: false,
        username: null
      })
    });
  }
  render() {
    return (
      <div>
        <Header updateUser={this.updateUser} loggedIn={this.loggedIn}></Header>
        <Main></Main>
      </div>
    );
  }
}

export default App;
