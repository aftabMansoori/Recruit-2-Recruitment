import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firedb } from "../../firebase";

//components
import Navbar from "./Navbar";
import JobApplied from "./JobApplied";

export default function ViewAppliedJob() {
  //states
  const [appliedJobList, setAppliedJobList] = useState();

  const { currentUser } = useAuth();

  useEffect(() => {
    const appliedJobListRef = firedb.ref("Applied Job");
    appliedJobListRef.on("value", (snapshot) => {
      const appliedJobs = snapshot.val();
      const appliedJobList = [];
      for (let id in appliedJobs) {
        appliedJobList.push({ id, ...appliedJobs[id] });
      }
      setAppliedJobList(appliedJobList);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container pt-4 pb-4">
        <div className="mt-3 mb-3">
          <h3 className="text-center">Applied Jobs</h3> <br />
          <div className="row m-0">
            {appliedJobList
              ? appliedJobList.map(
                  (appliedJob, index) =>
                    currentUser &&
                    (currentUser.uid === appliedJob.uid ? (
                      <JobApplied appliedJob={appliedJob} key={index} />
                    ) : (
                      ""
                    ))
                )
              : ""}
          </div>
        </div>
      </div>
    </>
  );
}
