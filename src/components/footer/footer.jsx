import "./footer.css";
import React from "react";
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

function template() {
  return (
    <footer className="footer">
        <Container fluid>
          <Nav>
            {/*<NavItem>
              <NavLink href="">Contact us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Blog</NavLink>
            </NavItem>*/}
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href=""
              target="_blank"
            >
              Sayan Banerjee.
            </a>{" "}
          </div>
        </Container>
      </footer>
  );
};

export default template;
