import React from "react";
import { Container, Nav, Tab } from "react-bootstrap";

function Login() {
  return (
    <div className="App">
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "White",
            width: "100%",
            margin: "40px 0 15px 0",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <p
            style={{
              fontFamily: "Work Sans, sans-serif",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#00caff",
              margin: 0,
            }}
          >
            TALK-A-TIVE
          </p>
        </div>

        <Tab.Container defaultActiveKey="login">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              backgroundColor: "White",
              width: "100%",
              margin: "0 0 15px 0",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <Nav variant="tabs" className="w-100 justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="login" className="text-center">
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup" className="text-center" disabled>
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default Login;
