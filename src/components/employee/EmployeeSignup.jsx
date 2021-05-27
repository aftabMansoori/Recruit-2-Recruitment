import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";

//material UI
import { TextField, Button, Divider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function EmployeeSignup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      history.push("/employee-login");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Parent>
        <div className="row">
          <div className="col-md-6">
            <FormStyle>
              {error ? <Alert severity="error">{error}</Alert> : ""}
              <h3 className="mb-4 mt-2">Employee Sign Up</h3>
              <div className="mb-3 mt-3">
                <TextField
                  type="text"
                  id="email"
                  label="Enter Email"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3 mb-3">
                <TextField
                  type="password"
                  id="password"
                  label="Enter Password"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3 mb-3">
                <TextField
                  type="password"
                  id="confpassword"
                  label="Confirm Password"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="small"
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
              <Button
                className="mb-3 mt-3"
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Divider light />

              <div className="small text-muted mt-2 mb-2">
                Already have an account?{" "}
                <Link to="/employee-login" className="font-weight-bold">
                  Log In
                </Link>
              </div>
              <div className="small text-muted">
                SignUp as{" "}
                <Link to="/employer-signup" className="font-weight-bold">
                  Employer
                </Link>
              </div>
              {/* <form onSubmit={handleSubmit}>
            <input type="text" placeholder="email" ref={emailRef} id="email" />
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              id="password"
            />
            <input
              type="password"
              placeholder="confirm password"
              ref={passwordConfirmRef}
              id="password-confirm"
            />
            <button disabled={loading}>Sign Up</button>
          </form> */}
            </FormStyle>
          </div>
          <div className="col-md-6 overflow-hidden">
            <img className="img-fluid " src="/images/employee.svg" alt="" />
          </div>
        </div>
      </Parent>
    </>
  );
}

const Parent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormStyle = styled.div`
  max-width: 500px;
  /* background-color: aqua; */
  padding: 1rem;
`;
