import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../http/store";
import {logout} from '../http/store/reducers/auth.slice'

const TopMenu = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const {isAuthentication, balance} = auth

  return (
    <Navbar bg="dark" expand="lg" className="navTop text-light">
      <Container >
        <Navbar.Brand className={"text-light"} href="/">RICH4FUN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={"text-light"} href="/Charts">Charts </Nav.Link>
            <Nav.Link className={"text-light"} href="/history">Histories</Nav.Link>
            <Nav.Link className={"text-light"} href="/heroes">Heroes</Nav.Link>
            {/*<Nav.Link className={"text-light} href="#link">News</Nav.Link>*/}
            {/*<Nav.Link className={"text-light} href="#link">Market</Nav.Link>*/}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {
            isAuthentication ? <NavDropdown className="text-success" title={`$${Intl.NumberFormat().format(balance)}`}>
                <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch({type: logout.type})}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              : <Nav >
                <Nav.Link className={"text-light"} href="/login">Login</Nav.Link>
              </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopMenu;
