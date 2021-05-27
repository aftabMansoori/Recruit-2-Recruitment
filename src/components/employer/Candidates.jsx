import React from "react";

//material UI
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailIcon from "@material-ui/icons/Email";

export default function Candidates({ appliedjob }) {
  return (
    <div className="col-md-6 col-12">
      <div className="border shadow-sm rounded-lg p-3 m-1">
        <h5 className="">{appliedjob.name}</h5>
        <div className="small">Applied for: {appliedjob.jobName}</div>
        <br />
        <h6>Contact Details:</h6>
        <div>
          <EmailIcon fontSize="small" /> {appliedjob.email}
        </div>
        <div>
          <PhoneAndroidIcon fontSize="small" /> {appliedjob.phone}
        </div>
      </div>
    </div>
  );
}
