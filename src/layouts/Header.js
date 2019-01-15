import React from 'react';
import { Container, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="light" light expand="md" className="mb-3">
        <Container>
          <NavbarBrand href="/"><i className="fa fa-book-reader fa-fw"></i> iBooks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Link to="/" style={{textDecoration: "none"}}>
                <NavItem>
                  <NavLink>Home</NavLink>
                </NavItem>
              </Link>
              <Link to="/signup" style={{textDecoration: "none"}}>
                <NavItem>
                  <NavLink>Sign Up</NavLink>
                </NavItem>
              </Link>
              <Link to="/login" style={{textDecoration: "none"}}>
                <NavItem>
                  <NavLink>Log In</NavLink>
                </NavItem>
              </Link>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;