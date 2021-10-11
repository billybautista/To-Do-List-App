import React from "react";
import Logout from "./Logout";
import { Navbar, Container, Button } from "react-bootstrap";

function Nav() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>To Do List App</Navbar.Brand>
        <Button variant="secondary">
          <Logout />
        </Button>
      </Container>
    </Navbar>
  );
}

export default Nav;
