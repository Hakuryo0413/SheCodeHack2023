import React, { useEffect, useState } from "react";
import { EmployerRegisterPayload } from "../../../types/PayloadInterface";
import { Link } from "react-router-dom";
import { employerData } from "../../../features/axios/api/employer/employerDetails";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

function EmployerProfile() {
  const [employerDetails, setEmployerDetails] =
    useState<EmployerRegisterPayload>();
  useEffect(() => {
    const employerDetails = async () => {
      const data = await employerData();
      setEmployerDetails(data?.employerData);
    };
    employerDetails();
  }, []);

  return (
    <div className="pl-16 pr-16 ">
      {/* <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-purple-500/50" />
      </div> */}
      <div className="text-center">
        {" "}
        <span className="text-headline text-center items-center  font-secondary justify-center text-3xl">
          Bạn trông như thế nào?
        </span>
      </div>

      <Card className="mx-3 mt-12 mb-6 xl:mx-40 shadow-lg shadow-gray-400">
        <div className="mb-4 flex items-center gap-6  bg-headline rounded-2xl ">
          <div className="flex  items-center gap-6 ">
            <div className="mt-8 ml-8 mb-16 grid justify-items-start">
              <Typography variant="h2" color="white" className="mb-1">
                {employerDetails?.companyName ?? ""}
              </Typography>
              <Typography variant="h5" className="font-normal text-white">
                {employerDetails?.location ?? ""}
              </Typography>
              <Typography variant="h6" className="font-normal text-white">
                {employerDetails?.about ?? ""}
              </Typography>
              {/* <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {employerDetails?.industry ?? ""}
                </Typography> */}
            </div>
            {/* <Avatar
              src={employerDetails?.image ?? ""}
              alt="img"
              size="xl"
              className="rounded-lg shadow-lg shadow-blue-gray-500/40"
            /> */}

            {/* <img
              src="https://i.pinimg.com/736x/bc/3a/bf/bc3abf803c4ec29dd8e3caa18a1572be.jpg"
              alt="Img"
              style={{
                // marginLeft: 450,
                maxWidth: 120,
                maxHeight: 120,
                borderRadius: 50,
                // justifySelf: "end",
              }}
            /> */}
          </div>
        </div>
        <CardBody className="p-4">
          <div className="gird-cols-1 mb-12 grid gap-4 px-4 lg:grid-cols-2 xl:grid-cols-1">
            <Typography variant="h5" color="blue-gray" className="mb-3">
              <div className="flex gap-x-3">
                Thông tin cá nhân
                <Link to={"/employer/edit-profile"}>
                  <Tooltip content="Edit Profile">
                    <PencilSquareIcon className="h-6 w-6 cursor-pointer text-blue-700" />
                  </Tooltip>
                </Link>
              </div>
            </Typography>
            <hr className="my-1 border-blue-gray-50" />
            <div>
              <CardBody className="p-0">
                <ul className="flex flex-col gap-4 p-0">
                  <li className="flex items-center gap-4">
                    <Typography
                      // variant="base"
                      color="blue-gray"
                      className="font-semibold  text-lg"
                    >
                      Tên
                    </Typography>

                    <Typography className="font-normal text-lg text-blue-gray-500">
                      {employerDetails?.companyName ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex items-center gap-4">
                    <Typography
                      color="blue-gray"
                      className="font-semibold  text-lg"
                    >
                      Email
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-lg text-blue-gray-500"
                    >
                      {employerDetails?.email ?? ""}
                    </Typography>
                  </li>
                  {/* <hr className="my-1 border-blue-gray-50" /> */}
                  {/* <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Địa chỉ
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.location ?? ""}
                    </Typography>
                  </li> */}
                  {/* <hr className="my-1 border-blue-gray-50" /> */}
                  {/* <li className="flex items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                    >
                      Giới thiệu về bản thân
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {employerDetails?.about ?? ""}
                    </Typography>
                  </li> */}
                  <hr className="my-1 border-blue-gray-50" />
                  <li className="flex:1 items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold  text-lg"
                    >
                      Kinh nghiệm
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-lg text-blue-gray-500"
                    >
                      {employerDetails?.experience ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                  {/* <div className="flex flex-col space-y-2 my-[10px]">
                    <label className="font-bold" htmlFor="profile">
                      Sơ yếu lý lịch
                    </label>
                    <input
                      type="file"
                      id="profile"
                      accept="application/pdf"
                      name="Chọn file"
                    />
                  </div>
                  <hr className="my-1 border-blue-gray-50" /> */}
                  <li className="flex:1 items-center gap-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold  text-lg"
                    >
                      Trình độ học vấn
                    </Typography>

                    <Typography
                      variant="small"
                      className="font-normal text-lg text-blue-gray-500"
                    >
                      {employerDetails?.education ?? ""}
                    </Typography>
                  </li>
                  <hr className="my-1 border-blue-gray-50" />
                </ul>
              </CardBody>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmployerProfile;
