import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";

export default function Navbar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/employee-login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <div className="navbar-brand font-weight-bolder">Recruit</div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/available-jobs"
                  className="nav-link text-white mr-2 font-weight-bold small"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/view-applied-jobs"
                  className="nav-link text-white mr-2 small font-weight-bold"
                >
                  Applied Jobs
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="text-right text-muted small mt-3 ">
          Logged In as:
          <br />
          <span className="font-weight-bold">
            {currentUser ? currentUser.email : ""}
          </span>
        </div>
      </div>
    </>
  );
}
