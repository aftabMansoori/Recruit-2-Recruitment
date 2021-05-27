import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firedb, storage } from "../../firebase";

//material UI
import { TextField, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function ApplyForm({ jobName }) {
  const { currentUser } = useAuth();

  const initFieldValues = {
    name: "",
    phone: "",
    email: "",
    uid: currentUser ? currentUser.uid : "",
    employeeEmail: currentUser ? currentUser.email : "",
    jobName: jobName ? jobName : "",
  };

  //states
  const [values, setValues] = useState(initFieldValues);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      firedb.ref("Applied Job").push(values, (err) => {
        if (err) console.log(err);
      });
      history.push("/view-applied-jobs");
    } catch {
      setError("Failed to Apply");
    }
    setLoading(false);
  };

  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : ""}
      <div className="mb-3 mt-3">
        <TextField
          type="text"
          id="name"
          label="Name"
          variant="outlined"
          color="primary"
          size="small"
          name="name"
          value={values.name}
          onChange={handleInputChange}
          fullWidth
          required
        />
      </div>
      <div className="mb-3 mt-3">
        <TextField
          type="text"
          id="phone"
          label="Phone"
          variant="outlined"
          color="primary"
          size="small"
          name="phone"
          fullWidth
          value={values.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3 mt-3">
        <TextField
          type="text"
          id="email"
          label="Email"
          variant="outlined"
          color="primary"
          size="small"
          name="email"
          value={values.email}
          fullWidth
          onChange={handleInputChange}
          required
        />
      </div>
      <Button
        className="mb-3 mt-3"
        disabled={loading}
        variant="contained"
        color="primary"
        onClick={handleApplySubmit}
      >
        Apply
      </Button>
    </>
  );
}
