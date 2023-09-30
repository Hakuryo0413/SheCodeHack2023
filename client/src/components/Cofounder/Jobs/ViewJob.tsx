import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import ShimmerJobDetails from "../../shimmer/ShimmerJobDetails";
import {
  fetchCofounderJobDetails,
  clearCofounderJobDetails,
  clearCofounderJobId,
} from "../../../features/redux/slices/cofounder/cofounderJobDetailsSlice";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Breadcrumbs } from "@material-tailwind/react";

function CofounderViewJob() {
  const dispatch = useDispatch();
  const jobId: string =
    useSelector((state: RootState) => state.cofounderJobDetails.jobId) ?? "";

  const jobDetails = useSelector(
    (state: RootState) => state.cofounderJobDetails.jobDetails
  );
  const status = useSelector(
    (state: RootState) => state.cofounderJobDetails.status
  );
  const error = useSelector(
    (state: RootState) => state.cofounderJobDetails.error
  );

  useEffect(() => {
    dispatch(fetchCofounderJobDetails(jobId));

    return () => {
      dispatch(clearCofounderJobDetails());
      dispatch(clearCofounderJobId());
    };
  }, [dispatch, jobId]);

  if (status === "loading") {
    return <ShimmerJobDetails />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div className="pl-40 pt-2">
        <Breadcrumbs className="bg-white">
          <a href="/cofounder/all-jobs" className="opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </a>
          <a href="/cofounder/all-jobs" className="opacity-60">
            <span>Dự án</span>
          </a>
          <a href="#">Chi tiết</a>
        </Breadcrumbs>
      </div>
      <div className="max-w-md mx-auto">
        <div className="p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BriefcaseIcon className="w-6 h-6 mr-2 text-purple-500" />
            <div className="text-lg font-semibold text-gray-900">
              {jobDetails?.title}
            </div>
          </div>
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <div className="flex items-center mr-4">
              <MapPinIcon className="w-4 h-4 mr-1 text-gray-600" />
              <span>{jobDetails?.location}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1 text-purple-600" />
              <span>
                Đã đăng{" "}
                {new Date(jobDetails?.createdAt ?? "")?.toLocaleDateString()}
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
                  {jobDetails?.topic}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Miêu tả dự án
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.description}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Vị trí tuyển:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.role}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Trình độ yêu cầu
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.education}
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Số năm kinh nghiệm yêu cầu
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.experience}
                </dd>
              </div> */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ngôn ngữ yêu cầu
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.language}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Thời gian làm việc
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.timetable}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Phương thức làm việc
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.workplace}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Đã từng tham gia dự án
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.joined}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Địa chỉ
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.location}
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Employment Type
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.employmentType}
                </dd>
              </div> */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Yêu cầu công việc
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside">
                    {jobDetails?.requirements?.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                {/* <dt className="text-sm font-medium leading-6 text-gray-900">
                  Responsibilities
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul className="list-disc list-inside">
                    {jobDetails?.responsibilities?.map(
                      (responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      )
                    )}
                  </ul>
                </dd> */}
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Ghi chú
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.responsibilities}
                </dd>
              </div>
              {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Salary/month
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div className="flex items-center">
                    <CurrencyRupeeIcon className="w-4 h-4 mr-1 text-purple-600" />
                    <span>{jobDetails?.salary}</span>
                  </div>
                </dd>
              </div> */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Số lượng ứng tuyển
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.openings}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Số năm kinh nghiệm yêu cầu
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {jobDetails?.experience}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CofounderViewJob;
