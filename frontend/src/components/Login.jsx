import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { logIn } from "../services/user";

/**
 * Este componente recibe un booleano para mostrar
 * el componente elegido
 * @param {*} { renderSignup }
 */

function Login({ renderSignup }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = () => {
    logIn({ username, password }).then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/home";
      }
    });
  };

  useEffect(() => {
    if (username && password != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  return (
    <div style={styled.container}>
      <div style={{ backgroundColor: "white", padding: 30, borderRadius: 20 }}>
        <Form>
          <h3>Login</h3>
          <div style={{ height: 10 }} />
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
          <div>
            <p>
              No account?{" "}
              <span style={{ color: "#247DEF" }} onClick={renderSignup}>
                Signup
              </span>
            </p>
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={disabled}
            onClick={() => onSubmit()}
          >
            Login
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

export default Login;
