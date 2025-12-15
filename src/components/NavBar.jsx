import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar
        expand="sm"
        sticky="top"
        style={{  
            width: "100%",
            display:"flex", 
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#a51616ff",
            padding: "12px 20px",
            boxSizing: "border-box",
        }}
      >
        <Navbar.Brand as={Link} to="/.." style={{ marginLeft: "20px", display: "flex", alignItems: "center"  }}>
          <h3 style={{marginLeft:"20px", color:"#c0b3b3ff"}}>Wheel Of Fortune</h3>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginRight: "20px"}}>
            <Navbar.Brand as={Link} to="/wheel" style={{ marginLeft: "20px", color:"#333" }}>
              Wheel Of Fortune
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;