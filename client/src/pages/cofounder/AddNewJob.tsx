import PostJob from "../../components/Cofounder/Jobs/PostJob";
import React from "react";
import CofounderHeader from "../../components/Header/CofounderHeader";

function AddNewJob() {
  return (
    <div className="bg-foundItBg">
      <CofounderHeader />
      <PostJob />
    </div>
  );
}

export default AddNewJob;
