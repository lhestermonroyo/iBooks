import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import AlertComponent from './AlertComponent';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      username: '',
      password: '',
      redirectTo: null,
      alertDisplay: false,
      alertType: '',
      alertMessage: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    let loginUser = {
      username: this.state.username,
      password: this.state.password
    }

    Axios
      .post('http://localhost:4000/api/users/login', loginUser)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          this.props.updateUser({
            loggedIn: true,
            username: result.data.username
          });

          this.setState({
            redirectTo: '/'
          })
        }
        else {
          this.setState({
            username: '',
            password: '',
            alertDisplay: true,
            alertType: 'danger',
            alertMessage: "Incorrect username or password entry. Please try again."
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          username: '',
          password: '',
          alertDisplay: true,
          alertType: 'danger',
          alertMessage: "Error. Unable to log in."
        });
      })
  }
  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect to={{ pathname: this.state.redirectTo }}></Redirect>
      )
    }
    else {
      const { alertDisplay, alertType, alertMessage } = this.state;
      return (
        <Container>
          <p className="display-4 text-center">Log In Here</p>
          <Row>
            <Col sm="3"></Col>
            <Col sm="6">
              {alertDisplay ? (
                <AlertComponent type={alertType} message={alertMessage}></AlertComponent>
              ) : null}
              <Form onSubmit={this.handleSubmit} autoComplete="off">
                <FormGroup>
                  <Label>Username:</Label>
                  <Input type="text"  name="username" onChange={this.handleChange} value={this.state.username} required></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Password:</Label>
                  <Input type="password"  name="password" onChange={this.handleChange} value={this.state.password}required></Input>
                </FormGroup>
                <Button type="submit" color="primary" className="btn btn-block">Log In</Button>
              </Form>
              <p className="mt-3 text-center">
                Don't have an account yet? 
                <Link className="ml-1" to="/signup">Create your Account</Link>
              </p>
            </Col>
            <Col sm="3"></Col>
          </Row>
        </Container>
      )  
    }
  }
}

export default LogIn;