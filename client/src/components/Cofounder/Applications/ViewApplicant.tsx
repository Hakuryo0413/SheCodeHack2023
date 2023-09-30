import { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import ApplicationDetails from "../../../types/ApplicationsInterface";
import { applicationDetails } from "../../../features/axios/api/applications/applicationDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Chip, Tooltip, Typography } from "@material-tailwind/react";
import { changeApplicationStatus } from "../../../features/axios/api/applications/changeApplication";
import { createConversation } from "../../../features/axios/api/messenger/conversation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Breadcrumbs } from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { FaFacebookMessenger } from "react-icons/fa";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { fetchCofounder } from "../../../features/redux/slices/cofounder/cofounderDetailsSlice";
import { log } from "console";

function ViewApplicant() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails>();
  const [status, setStatus] = useState(true);
  const cofounderId = useSelector(
    (state: RootState) => state.cofounderDetails.cofounderDetails
  )?.cofounderData?._id;
  const resumeUrl = applicationData?.userId?.resume;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCofounder());
  }, [dispatch]);

  useEffect(() => {
    const applications = async () => {
      const data = await applicationDetails(id ?? "");
      setApplicationData(data.applicationData);
      console.log(applicationData?.userId.about);
      console.log(applicationData?.userId.email);
      console.log(applicationData?.userId.address);
      console.log(applicationData?.userId.experience);
      console.log(applicationData?.userId.education);
      console.log(applicationData?.userId.birthday);
    };
    applications();
  }, [id, status]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleStatusChange = async (status: string, applicationId: string) => {
    await changeApplicationStatus(applicationId, status)
      .then(() => {
        setStatus(!status);
        notify("Status updated successfully", "success");
      })
      .catch((err: any) => {
        notify(err.message, "error");
      });
  };

  const startConversation = async (user1: string, user2: string) => {
    const response = await createConversation(user1, user2);
    if (response) {
      navigate("/cofounder/messenger");
    }
  };

  return (
    <>
      <div className="pl-40 pt-2">
        <Breadcrumbs>
          <a href="#" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="/cofounder/applications" className="opacity-60">
            <span>Yêu cầu</span>
          </a>
          <a href="#">Thông tin ứng viên</a>
        </Breadcrumbs>
      </div>
      <div className="mx-auto max-w-screen-xl p-2 mt-4 rounded lg:pl-6">
        <div className="max-w-7xl p-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Thông tin ứng viên
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Thông tin cá nhân và đơn yêu cầu
            </p>
          </div>
          <div className="flex justify-end mb-4">
            <Menu>
              <div className="flex gap-5">
                <Tooltip content="Start conversation">
                  <button
                    className="flex justify-center items-center bg-purple-500 text-white rounded-full w-12"
                    onClick={() =>
                      startConversation(
                        cofounderId,
                        applicationData?.userId?._id
                      )
                    }
                  >
                    <FaFacebookMessenger />
                  </button>
                </Tooltip>
                <MenuHandler>
                  <button className="bg-purple-500  rounded-full w-11/12 text-white  font-normal">
                    Chuyển trạng thái
                  </button>
                </MenuHandler>
              </div>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    handleStatusChange("Đồng ý", applicationData?._id ?? "")
                  }
                >
                  Đồng ý
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleStatusChange("Từ chối", applicationData?._id ?? "")
                  }
                >
                  Từ chối
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleStatusChange("Đang chờ", applicationData?._id ?? "")
                  }
                >
                  Đang chờ
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Họ tên
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nộp vào dự án
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.jobId?.title}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Địa chỉ
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.address}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Trạng thái yêu cầu
                </dt>
                <dd className="flex mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <Chip
                    variant="ghost"
                    size="sm"
                    value={
                      applicationData?.applicationStatus === "Đồng ý"
                        ? "Đồng ý"
                        : applicationData?.applicationStatus === "Từ chối"
                        ? "Từ chối"
                        : "Đang chờ"
                    }
                    color={
                      applicationData?.applicationStatus === "Đồng ý"
                        ? "green"
                        : applicationData?.applicationStatus === "Từ chối"
                        ? "red"
                        : "orange"
                    }
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Giới thiệu bản thân
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.about}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Kinh nghiệm
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.experience}
                </dd>
                {/* <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.experience ? (
                    <div className="flex flex-col">
                      <Typography
                        variant="medium"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.position}
                      </Typography>
                      <Typography
                        variant="large"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.companyName}
                      </Typography>
                      {applicationData?.userId?.experience && (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Start Date:{" "}
                          {applicationData?.userId?.experience?.startDate}
                        </Typography>
                      )}
                      {applicationData?.userId?.experience?.endDate ===
                      "present" ? (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          End Date: present
                        </Typography>
                      ) : (
                        applicationData?.userId?.experience && (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            End Date:{" "}
                            {applicationData?.userId?.experience?.endDate}
                          </Typography>
                        )
                      )}
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      No experience available.
                    </Typography>
                  )}
                </dd> */}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Trình độ học vấn
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.education}
                </dd>
                {/* <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {applicationData?.userId?.experience ? (
                    <div className="flex flex-col">
                      <Typography
                        variant="medium"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.position}
                      </Typography>
                      <Typography
                        variant="large"
                        className="font-bold text-blue-gray-500"
                      >
                        {applicationData?.userId?.experience?.companyName}
                      </Typography>
                      {applicationData?.userId?.experience && (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          Start Date:{" "}
                          {applicationData?.userId?.experience?.startDate}
                        </Typography>
                      )}
                      {applicationData?.userId?.experience?.endDate ===
                      "present" ? (
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          End Date: present
                        </Typography>
                      ) : (
                        applicationData?.userId?.experience && (
                          <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                          >
                            End Date:{" "}
                            {applicationData?.userId?.experience?.endDate}
                          </Typography>
                        )
                      )}
                      
                    </div>
                  ) : (
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      No experience available.
                    </Typography>
                  )}
                </dd> */}
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Key Skills
                </dt>
                <dl className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* <div className="flex gap-2">
                    {applicationData?.userId?.skills &&
                      applicationData?.userId?.skills?.map((skill) => (
                        <Chip
                          key={skill}
                          variant="ghost"
                          color="teal"
                          className="rounded-full py-1.5"
                          size="sm"
                          value={skill}
                        />
                      ))}
                  </div> 
                </dl>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      {resumeUrl ? (
                        <div className="flex w-80">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {`${applicationData?.userId?.name}.pdf`}
                            </span>
                            <span className="flex-shrink-0 text-gray-400">
                              4.5mb
                            </span>
                          </div>
                          <Tooltip content="view resume">
                            <Link
                              to={resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <EyeIcon
                                className="ml-2 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                            </Link>
                          </Tooltip>
                        </div>
                      ) : null}
                    </li>
                  </ul>
                </dd>
              </div> */}
            </dl>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ViewApplicant;
