import React from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";

function Topbar(props) {
  if (props.loggedIn) {
    const {cart} = props.currUser;

    return (
      <Navbar sticky="top" bg="light" expand="lg" className="mb-2">
        <Navbar.Brand href="#"><Image alt="" src="./img/common/logo.png" className="logo" />{' '}Harry the Handyman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav cust-navbar" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="menu-cust">
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#items">Items</Nav.Link>
            <Nav.Link href="#cart">Cart {(cart.length > 0) ? `(${cart.length})`: ''}</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <NavDropdown title={
                    <div className="avatar-drop-down flex align-items-center">
                        <Image className="avatar mx-2" src={`https://robohash.org/set_set5/${props.currUser.fullName}.png`} alt="user pic" roundedCircle />
                        <div className="avatar-name">{props.currUser.fullName && props.currUser.fullName.split(' ').shift()}</div>
                    </div>
                }  id="basic-nav-dropdown">
              <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
              {props.currUser.isAdmin && <NavDropdown.Item href="#mngusers">Manage Users</NavDropdown.Item>}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={()=> {props.onSignOut()}}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar sticky="top" bg="light" expand="lg" className="mb-2">
        <Navbar.Brand href="#"><Image alt="" src="./img/common/logo.png" className="logo" />{' '}Harry the Handyman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav cust-navbar" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="">
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Topbar;
