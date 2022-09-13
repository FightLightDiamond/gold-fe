import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../http/store";
import {
  MDBCollapse,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import {useState} from "react";
import {logout} from '../http/store/reducers/auth.slice'

const TopMenu = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch()
  const {isAuthentication, balance} = auth
  const [showBasic, setShowBasic] = useState(false);
  return (
    <MDBNavbar expand='sm' fixed='top' dark bgColor='dark'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>I'M RICH</MDBNavbarBrand>
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas/>
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink aria-current='page' href='/heroes'>
                Hero
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/history'>Histories</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/elo-match'>Elo</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/charts'>Charts</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          {
            !isAuthentication ?
              <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                <MDBNavbarItem className='me-3 me-lg-0'>
                  <MDBNavbarLink href="/login">
                    <MDBIcon fas icon="sign-in-alt"/>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem className='me-3 me-lg-0'>
                  <MDBNavbarLink href='#'>
                    <MDBIcon fas icon="user-plus"/>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
              : <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'><MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag='a' className='nav-link text-warning'>
                    {`$${Intl.NumberFormat().format(balance)}`}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Profile</MDBDropdownItem>
                    <MDBDropdownItem link onClick={() => dispatch({type: logout.type})}>Logout</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              </MDBNavbarNav>
          }
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default TopMenu;
