import { Route, Routes } from "react-router-dom";
import AddNewJob from "../../pages/cofounder/AddNewJob";
import EditJobPage from "../../pages/cofounder/EditJobPage";
import DisplayJobPage from "../../pages/user/UserSideDisplayJobPage";
import ViewJobPage from "../../pages/cofounder/ViewJobPage";

const JobRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/create-job" element={<AddNewJob />} />
        <Route path="/edit-job/:id" element={<EditJobPage />} />
        <Route path="/all-jobs" element={<DisplayJobPage />} />
        <Route path="/view-job" element={<ViewJobPage />} />
      </Routes>
    </div>
  );
};

export default JobRouter;
