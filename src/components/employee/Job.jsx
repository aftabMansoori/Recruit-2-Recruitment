import React, { useState } from "react";
import { Link } from "react-router-dom";

//material UI
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Divider } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//components
import ApplyForm from "./ApplyForm";

export default function Job({ job }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="col-12">
      <div className="m-1">
        <div className="border shadow-sm rounded-lg p-3">
          <h4 className="mb-2">{job.jobTitle}</h4>
          <div className="row m-0">
            <div className="col-6">
              <div className="mb-3 badge badge-primary">{job.jobType}</div>
            </div>
            <div className="col-6 text-right small">
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                  size="small"
                >
                  Apply JOb
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Fill the form to apply for the job.
                  </DialogTitle>
                  <DialogContent>
                    <ApplyForm jobName={job.jobTitle} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="row m-0 mb-3 small">
            <div className="col-4 p-0">
              <LocationOnIcon fontSize="small" /> {job.city}
            </div>
            <div className="col-4 p-0">
              <PersonIcon fontSize="small" /> Openings: {job.openings}
            </div>

            <div className="col-4 p-0">
              <AttachMoneyIcon fontSize="small" /> CTC: ₹{job.ctc}
            </div>
          </div>
          <div className="mb-2 small">
            <span className="font-weight-bold">Skills</span>
            <br />
            {job.skills}
          </div>
          <div className="small mb-3">{job.description}</div>
          <Divider />
          <div className="small mt-2">
            <span className="font-weight-bold">Contact:</span>{" "}
            {job.employerEmail}
          </div>
        </div>
      </div>
    </div>
  );
}
