import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function TopMenu() {
  return (
    <Navbar bg="dark" expand="lg" style={{color: "#fff123"}} className="navTop">
      <Container >
        <Navbar.Brand style={{color: "#fff123"}} href="#home">Bet HeroX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color: "#fff123"}} href="/">Bet</Nav.Link>
            <Nav.Link style={{color: "#fff123"}} href="/heroes">Heroes</Nav.Link>
            <Nav.Link style={{color: "#fff123"}} href="#link">Charts</Nav.Link>
            <Nav.Link style={{color: "#fff123"}} href="#link">News</Nav.Link>
            <Nav.Link style={{color: "#fff123"}} href="#link">Market</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopMenu;
