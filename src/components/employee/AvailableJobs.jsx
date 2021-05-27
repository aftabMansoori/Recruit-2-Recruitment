import React, { useState, useEffect } from "react";
import { firedb } from "../../firebase";

//components
import Navbar from "./Navbar";
import Job from "./Job";

export default function AvailableJobs() {
  const [jobList, setJobList] = useState();
  const [loading, setLoading] = useState(false);

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
    <div>
      <Navbar />
      <div className="container p-3">
        <h3 className="mt-3 mb-4 text-center">Jobs Available</h3>
        <div className="row m-0">
          {jobList
            ? jobList.map((job, index) => <Job job={job} key={index} />)
            : ""}
        </div>
      </div>
    </div>
  );
}
