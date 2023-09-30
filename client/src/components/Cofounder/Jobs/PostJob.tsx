import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jobCreationValidationSchema } from "../../../utils/validation";
import { JobCreationPayload } from "../../../types/PayloadInterface";
import createNewJob from "../../../features/axios/api/cofounder/createJob";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
function PostJob() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobCreationPayload>({
    resolver: yupResolver(jobCreationValidationSchema),
  });
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };
  const submitHandler = async (formData: JobCreationPayload) => {
    createNewJob(formData)
      .then((response) => {
        notify("Job created successfully", "success");
        setTimeout(() => {
          navigate("/cofounder/all-jobs");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="pl-40 pt-2">
        <Breadcrumbs className="bg-foundItBg">
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
          <a href="/cofounder/all-jobs" className="opacity-60">
            <span>Dự án</span>
          </a>
          <a href="#">Tạo dự án mới</a>
        </Breadcrumbs>
      </div>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Tạo dự án mới</h1>
        <div className="rounded border bg-white border-gray-300 p-4">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-4 flex justify-between">
              <div className="w-full mr-4">
                <label
                  htmlFor="title"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Tên dự án:
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Tên dự án"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
              {/* <div className="w-1/2 ml-2">
                <label
                  htmlFor="employmentType"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Loại công việc:
                </label>
                <select
                  id="employmentType"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Loại công việc"
                  {...register("employmentType")}
                >
                  {errors.employmentType && (
                    <p className="text-red-500 text-sm">
                      {errors.employmentType.message}
                    </p>
                  )}
                  <option value="Full-time">Toàn thời gian</option>
                  <option value="Part-time">Bán thời gian</option>
                  <option value="Contract">Online</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Thực tập</option>
                </select>
              </div> */}
            </div>
            <div className="mb-4">
              <label
                htmlFor="topic" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Dự án startup của bạn là về chủ đề gì?
              </label>
              <select
                id="topic"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Chủ đề"
                {...register("topic")}
              >
                {errors.topic && (
                  <p className="text-red-500 text-sm">{errors.topic.message}</p>
                )}
                <option value="Chọn đề tài">Chọn đề tài</option>

                <option value="Môi trường">Môi trường</option>
                <option value="Kinh tế">Kinh tế</option>

                <option value="Y tế">Y tế</option>

                <option value="Công nghệ">Công nghệ</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Mô tả dự án:
              </label>
              <textarea
                id="description"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Miêu tả dự án"
                {...register("description")}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Địa điểm
              </label>
              <select
                id="location"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Địa điểm"
                {...register("location")}
              >
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
                <option value="Chọn địa điểm">Chọn địa điểm</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="role" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Bạn muốn tuyển thành viên vào vị trí nào?
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Vị trí tuyển"
                {...register("role")}
              >
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
                <option value="Chọn vị trí">Chọn vị trí</option>

                <option value="Kỹ sư kỹ thuật">Kỹ sư kỹ thuật</option>
                <option value="Thiết kế">Thiết kế</option>
                <option value="Marketing">Marketing</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            {/* <div>
              <label
                htmlFor="experience"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Số năm kinh nghiệm yêu cầu:
              </label>
              <input
                type="number"
                id="experience"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Số năm kinh nghiệm"
                {...register("experience")}
              />
            </div> */}
            <div className="mb-4">
              <label
                htmlFor="education" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Bạn muốn tuyển thành viên có trình độ như thế nào?
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="education"
                {...register("education")}
              >
                {errors.education && (
                  <p className="text-red-500 text-sm">
                    {errors.education.message}
                  </p>
                )}
                <option value="Chọn trình độ">Chọn trình độ</option>
                <option value="Đại học">Đại học</option>
                <option value="Thạc sỹ">Thạc sỹ</option>
                <option value="Tiến sỹ">Tiên sỹ</option>
                <option value="Giáo sư">Giáo sư</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="language" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Yêu cầu biết ngôn ngữ
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="language"
                {...register("language")}
              >
                {errors.language && (
                  <p className="text-red-500 text-sm">
                    {errors.language.message}
                  </p>
                )}
                <option value="Chọn ngôn ngữ">Chọn ngôn ngữ</option>
                <option value="Anh">Anh</option>
                <option value="Việt">Việt</option>
                <option value="Trung">Trung</option>
                <option value="Nhật">Nhật</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="education" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Thời gian làm việc
              </label>
              <select
                id="timetable"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="timetable"
                {...register("timetable")}
              >
                {errors.timetable && (
                  <p className="text-red-500 text-sm">
                    {errors.timetable.message}
                  </p>
                )}
                <option value="Chọn thời gian">Chọn thời gian</option>
                <option value="Sáng">Sáng</option>
                <option value="Trưa">Trưa</option>
                <option value="Chiều">Chiều</option>
                <option value="Tối">Tối</option>
                <option value="Cả ngày">Cả ngày</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="joined" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Đã từng tham gia dự án ?
              </label>
              <select
                id="joined"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Tham gia"
                {...register("joined")}
              >
                {errors.joined && (
                  <p className="text-red-500 text-sm">
                    {errors.joined.message}
                  </p>
                )}
                <option value="Chọn">Chọn tham gia</option>
                <option value="Yes">Đã từng</option>
                <option value="No">Chưa từng</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="workplace" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Phương thức làm việc
              </label>
              <select
                id="workplace"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Tham gia"
                {...register("workplace")}
              >
                {errors.workplace && (
                  <p className="text-red-500 text-sm">
                    {errors.workplace.message}
                  </p>
                )}
                <option value="Chọn">Chọn phương thức</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>{" "}
                <option value="Cả hai">Cả hai</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Yêu cầu của công việc:
              </label>
              <textarea
                id="requirements"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Yêu cầu công việc"
                {...register("requirements")}
              ></textarea>
              {errors.requirements && (
                <p className="text-red-500 text-sm">
                  {errors.requirements.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="note" //sửa db
                className="block text-sm mb-1 font-medium text-gray-400"
              >
                Bạn có điều gì muốn chia sẻ không?:
              </label>
              <textarea
                id="note"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                required
                placeholder="Bạn có điều gì muốn chia sẻ không?"
                {...register("responsibilities")}
              ></textarea>
            </div>
            <div className="mb-4 flex justify-between">
              {/* <div>
                <label
                  htmlFor="salary"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  mức lương:
                </label>
                <input
                  type="number"
                  id="salary"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="salary"
                  {...register("salary")}
                />
              </div> */}
              <div>
                <label
                  htmlFor="openings"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Số lượng ứng tuyển:
                </label>
                <input
                  type="number"
                  id="openings"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Số lượng ứng tuyển"
                  {...register("openings")}
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm mb-1 font-medium text-gray-400"
                >
                  Số năm kinh nghiệm yêu cầu:
                </label>
                <input
                  type="number"
                  id="experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                  required
                  placeholder="Số năm kinh nghiệm"
                  {...register("experience")}
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-purple-600 rounded hover:bg-purple-500 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default PostJob;
