import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//components
//employer
import EmployerSignup from "../components/employer/EmployerSignup";
import EmployerLogin from "../components/employer/EmployerLogin";
import PostJob from "../components/employer/PostJob";
import ViewPostedJob from "../components/employer/ViewPostedJob";
import ViewCandidates from "../components/employer/ViewCandidates";
//employee
import EmployeeSignup from "../components/employee/EmployeeSignup";
import EmployeeLogin from "../components/employee/EmployeeLogin";
import AvailableJobs from "../components/employee/AvailableJobs";
import ApplyForm from "../components/employee/ApplyForm";
import ViewAppliedJob from "../components/employee/ViewAppliedJob";

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={["/employer-signup", "/"]}>
            <EmployerSignup />
          </Route>
          <Route exact path="/employer-login">
            <EmployerLogin />
          </Route>
          <Route exact path="/post-job">
            <PostJob />
          </Route>
          <Route exact path="/view-posted-jobs">
            <ViewPostedJob />
          </Route>
          <Route exact path="/view-candidates">
            <ViewCandidates />
          </Route>

          <Route exact path="/employee-login">
            <EmployeeLogin />
          </Route>
          <Route exact path="/employee-signup">
            <EmployeeSignup />
          </Route>
          <Route exact path="/available-jobs">
            <AvailableJobs />
          </Route>
          <Route exact path="/job-apply">
            <ApplyForm />
          </Route>
          <Route exact path="/view-applied-jobs">
            <ViewAppliedJob />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
