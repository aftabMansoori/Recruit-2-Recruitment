import React, { useState, useEffect } from "react";
import { firedb } from "../../firebase";

//material UI
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

export default function JobApplied({ appliedJob }) {
  const [jobList, setJobList] = useState();

  useEffect(() => {
    const jobListRef = firedb.ref("Posted Job");
    jobListRef.on("value", (snapshot) => {
      const jobs = snapshot.val();
      const jobList = [];
      for (let id in jobs) {
        jobList.push({ id, ...jobs[id] });
      }
      setJobList(jobList);
    });
  }, []);

  return (
    <div className="col-12">
      {jobList
        ? jobList.map((job) =>
            job.jobTitle === appliedJob.jobName ? (
              <div className="border shadow-sm rounded-lg m-2 p-3">
                <h4 className="mb-2">{job.jobTitle}</h4>
                <div className="mb-3 badge badge-primary">{job.jobType}</div>
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
                <div className="small">{job.description}</div>
              </div>
            ) : (
              ""
            )
          )
        : ""}
    </div>
  );
}
