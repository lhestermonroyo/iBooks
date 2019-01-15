import React from 'react';
import { Container } from 'reactstrap';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1 className="display-4">Welcome to iBooks</h1>
        <p>Your online book reading website.</p>
      </Container>
    )
  }
}

export default Home;