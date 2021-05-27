import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firedb } from "../../firebase";

//component
import Job from "./Job";
import Navbar from "./Navbar";

//material UI

export default function ViewPostedJob() {
  //states
  const [jobList, setJobList] = useState();

  const { currentUser } = useAuth();

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
        <h3 className="mt-3 text-center">View Posted Job</h3> <br />
        <div className="row m-0">
          {jobList
            ? jobList.map(
                (job, index) =>
                  currentUser &&
                  (currentUser.uid === job.uid ? (
                    <Job job={job} key={index} />
                  ) : (
                    ""
                  ))
              )
            : ""}
        </div>
      </div>
    </div>
  );
}
