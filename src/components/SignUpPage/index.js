import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import AlertComponent from './AlertComponent';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
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

    let newUser = {
      fullname: this.state.fullname,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }

    Axios
      .post('http://localhost:4000/api/users/add', newUser)
      .then((result) => {
        if(result.data.error) {
          this.setState({
            fullname: '',
            email: '',
            username: '',
            password: '',
            alertDisplay: true,
            alertType: 'danger',
            alertMessage: result.data.error
          });
          console.log(result.data.error);
        }
        else {
          this.setState({
            fullname: '',
            email: '',
            username: '',
            password: '',
            alertDisplay: true,
            alertType: 'info',
            alertMessage: 'Sign up successful! You can now proceed to log in.'
          });
          console.log(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  render() {
    const { alertDisplay, alertType, alertMessage } = this.state;
    return (
      <Container>
        <p className="display-4 text-center">Create Your Account</p>
        <Row>
          <Col sm="3"></Col>
          <Col sm="6">
            {alertDisplay ? (
              <AlertComponent type={alertType} message={alertMessage}></AlertComponent>
            ) : null}
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              <FormGroup>
                <Label>Fullname:</Label>
                <Input type="text" name="fullname" onChange={this.handleChange} value={this.state.fullname} required></Input>
              </FormGroup>
              <FormGroup>
                <Label>E-mail:</Label>
                <Input type="email"  name="email" onChange={this.handleChange} value={this.state.email} required></Input>
              </FormGroup>
              <FormGroup>
                <Label>Username:</Label>
                <Input type="text"  name="username" onChange={this.handleChange} value={this.state.username} required></Input>
              </FormGroup>
              <FormGroup>
                <Label>Password:</Label>
                <Input type="password"  name="password" onChange={this.handleChange} value={this.state.password}required></Input>
              </FormGroup>
              <Button type="submit" color="primary" className="btn btn-block">Sign Up</Button>
            </Form>
            <p className="mt-3 text-center">
              Already have an account? 
              <Link className="ml-1" to="/login">Log In</Link>
            </p>
          </Col>
          <Col sm="3"></Col>
        </Row>
      </Container>
    )
  }
}

export default SignUp;