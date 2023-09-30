import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import ShimmerprojectDetails from "../../shimmer/ShimmerprojectDetails";
import { applyForproject } from "../../../features/axios/api/user/applyForproject";
import { isApplied } from "../../../features/axios/api/user/applyForproject";
import { userData } from "../../../features/axios/api/user/userDetails";
import { UserDataPayload } from "../../../types/PayloadInterface";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchprojectDetails,
  clearprojectDetails,
  clearprojectId,
} from "../../../features/redux/slices/user/projectDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

function projectDetails() {
  const dispatch = useDispatch();
  const projectId: string =
    useSelector((state: RootState) => state.projectDetails.projectId) ?? "";
  const projectDetails = useSelector(
    (state: RootState) => state.projectDetails.projectDetails
  );

  const [applied, setApplied] = useState("Apply");
  const [user, setUser] = useState<UserDataPayload>();

  useEffect(() => {
    dispatch(fetchprojectDetails(projectId));

    return () => {
      dispatch(clearprojectDetails());
      dispatch(clearprojectId());
    };
  }, [dispatch, projectId]);

  useEffect(() => {
    async function userInfo() {
      const data: UserDataPayload = await userData();
      setUser(data);
    }
    userInfo();
  }, []);

  useEffect(() => {
    async function applied() {
      const status = await isApplied(projectDetails?._id, user?._id);
      setApplied(status?.status);
    }
    applied();
  }, [projectDetails?._id, user?._id]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const projectApplyHandler = async (projectID: string, empID: string) => {
    await applyForproject(projectID, empID)
      .then((application) => {
        notify("project applied successfully", "success");
        setApplied("Applied");
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div className={`max-w-md mx-auto transition-opacity duration-500`}>
      {projectDetails ? (
        <div className="max-w-md mx-auto">
          <div className="p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <BriefcaseIcon className="w-6 h-6 mr-2 text-purple-500" />
              <div className="text-lg font-semibold text-gray-900">
                {projectDetails?.title}
              </div>
            </div>
            <div className="flex items-center mb-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <MapPinIcon className="w-4 h-4 mr-1 text-gray-600" />
                <span>{projectDetails?.location}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1 text-purple-600" />
                <span>
                  Đăng vào{" "}
                  {new Date(projectDetails?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Chủ đề của dự án
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.topic}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Chủ đề của dự án
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.topic}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Mô tả dự án
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.description}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Địa điểm
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.location}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Vị trí tuyển
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.role}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Yêu cầu công việc
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul className="list-disc list-inside">
                      {projectDetails.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Ghi chú{" "}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails?.responsibilities}
                  </dd>
                </div>

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Số lượng ứng tuyển
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {projectDetails.openings}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Người tuyển
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <BriefcaseIcon className="w-4 h-4 mr-1 text-purple-600" />
                        <span>{projectDetails?.Cofounder?.companyName}</span>
                      </div>
                      <div className="flex items-center">
                        <LinkIcon className="w-4 h-4 mr-1 text-purple-600" />
                        <span>{projectDetails?.Cofounder?.email}</span>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded hover:bg-purple-500"
                disabled={applied === "Applied"}
                onClick={() =>
                  projectApplyHandler(
                    projectDetails._id,
                    projectDetails?.Cofounder?._id
                  )
                }
              >
                {applied}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ShimmerprojectDetails />
      )}
      <ToastContainer />
    </div>
  );
}

export default projectDetails;
