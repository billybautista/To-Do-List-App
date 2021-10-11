import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { signUp } from "../services/user";

/**
 * Este componente recibe un booleano para mostrar
 * el componente elegido
 * @param {*} { renderLogin }
 */

function Signup({ renderLogin }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = () => {
    signUp({ username, password });
  };

  useEffect(() => {
    if ((password === confirmPassword) & (username !== "")) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword]);

  return (
    <div style={styled.container}>
      <div style={{ backgroundColor: "white", padding: 30, borderRadius: 20 }}>
        <Form>
          <p>Sign up</p>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div>
            <p>
              Already a member?{" "}
              <span style={{ color: "#247DEF" }} onClick={renderLogin}>
                Login
              </span>
            </p>
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={disabled}
            onClick={() => onSubmit()}
          >
            Signup
          </Button>
        </Form>
      </div>
    </div>
  );
}

const height = window.innerHeight;
const styled = {
  container: {
    flex: 1,
    height: height,
    backgroundColor: "#247DEF",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};

export default Signup;
