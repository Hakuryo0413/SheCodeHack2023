import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import {
  fetchCofounder,
  clearCofounderDetails,
} from "../../features/redux/slices/cofounder/cofounderDetailsSlice";

function CofounderHome() {
  const dispatch = useDispatch();

  const status = useSelector(
    (state: RootState) => state.cofounderDetails.status
  );
  const error = useSelector((state: RootState) => state.cofounderDetails.error);

  useEffect(() => {
    dispatch(fetchCofounder());
    return () => {
      dispatch(clearCofounderDetails());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-screen">
      <ToastContainer />
    </div>
  );
}

export default CofounderHome;
