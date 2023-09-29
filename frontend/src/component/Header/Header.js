import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/NavDropdown';
import FormControl from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userActions';

const Header=()=>{
  const history=useNavigate();
  const dispatch=useDispatch();
  const userLogin=useSelector((state)=>state.userLogin);
  const {userInfo}=userLogin;
  const logoutHandler=()=>{
    dispatch(logout());
    history("/",{ replace: true });
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{backgroundColor:"black"}} variant='dark'>
      <Container>
        <Navbar.Brand href="#home">
        <Link  to="/">React-Bootstrap</Link>
 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
              <Form inline>

                <FormControl
                type="text" 
                placeholder="Search" 
                    className='mr-sm-2'
                />
              </Form>
          </Nav>


          <Nav>
            <Nav.Link href="/mynotes"><Link to="/mynotes">MyNotes</Link></Nav.Link>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;