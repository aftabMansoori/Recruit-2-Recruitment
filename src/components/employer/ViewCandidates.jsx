import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firedb } from "../../firebase";

//components
import Candidates from "./Candidates";
import Navbar from "./Navbar";

export default function ViewCandidates() {
  const { currentUser } = useAuth();

  const [appliedjobList, setappliedJobList] = useState("");

  useEffect(() => {
    const appliedjobListRef = firedb.ref("Applied Job");
    appliedjobListRef.on("value", (snapshot) => {
      const appliedjobs = snapshot.val();
      const appliedjobList = [];
      for (let id in appliedjobs) {
        appliedjobList.push({ id, ...appliedjobs[id] });
      }
      setappliedJobList(appliedjobList);
    });
  }, []);

  console.log(appliedjobList);

  return (
    <>
      <Navbar />
      <div className="container p-3">
        <h3 className="mt-3 mb-2 text-center">View Candidates</h3> <br />
        <div className="row m-0">
          {appliedjobList
            ? appliedjobList.map(
                (appliedjob, index) =>
                  currentUser &&
                  (currentUser.uid !== appliedjob.uid ? (
                    <Candidates appliedjob={appliedjob} key={index} />
                  ) : (
                    ""
                  ))
              )
            : ""}
        </div>
      </div>
    </>
  );
}
