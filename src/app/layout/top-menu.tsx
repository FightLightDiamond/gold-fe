import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../http/store";
import {logout} from '../http/store/reducers/auth.slice'

const TopMenu = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const {isAuthentication, user} = auth

  console.log({user})

  return (
    <Navbar bg="dark" expand="lg" style={{color: "#fff", zIndex: 1}} className="navTop">
      <Container >
        <Navbar.Brand style={{color: "#fff"}} href="#home">HEROX</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={{color: "#fff"}} href="/">Bet</Nav.Link>
            <Nav.Link style={{color: "#fff"}} href="/heroes">Heroes</Nav.Link>
            <Nav.Link style={{color: "#fff"}} href="#link">Charts</Nav.Link>
            <Nav.Link style={{color: "#fff"}} href="#link">News</Nav.Link>
            <Nav.Link style={{color: "#fff"}} href="#link">Market</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {
            isAuthentication ? <NavDropdown className="text-warning" title={`$${Intl.NumberFormat().format(user.balance)}`}>
                <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch({type: logout.type})}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              : <Nav >
                <Nav.Link style={{color: "#fff"}} href="/login">Login</Nav.Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopMenu;
