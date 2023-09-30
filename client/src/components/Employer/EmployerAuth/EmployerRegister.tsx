import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { employerRegisterValidationSchema } from "../../../utils/validation";
import { registerEmployer } from "../../../features/axios/api/employer/employerAuthentication";
import { EmployerRegisterPayload } from "../../../types/PayloadInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";

function EmployerRegister() {
  const navigate = useNavigate();
  const employerEmail = useSelector(
    (state: RootState) => state.employerDetails.employerEmail
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerRegisterPayload>({
    resolver: yupResolver(employerRegisterValidationSchema),
  });

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const submitHandler = async (formData: EmployerRegisterPayload) => {
    registerEmployer(formData)
      .then((response) => {
        notify("Registration success", "success");
        setTimeout(() => {
          navigate("/employer/login");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <>
      <div className="flex min-h-full justify-center px-6 py-12 lg:px-8 bg-background">
        <div
          style={{
            padding: 40,
            paddingLeft: 50,
            paddingRight: 50,
            borderRadius: 12,
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <img
            className="mx-auto h-14 w-auto"
            // đay là ảnh thoi
            src="https://res.cloudinary.com/dde8ngtcq/image/upload/v1695356808/ark28gvznuaozpxel4ku.png"
            alt="Your Company"
          />
          <h2 className="text-4xl font-bold mb-4 mt-4"> Đăng ký tài khoản </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              {/* <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div> */}

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Tên
                </label>
                <div className="mt-2">
                  <input
                    id="companyName"
                    type="text"
                    placeholder="Tên"
                    {...register("companyName")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-20 focus:outline-none focus:border-purple-500  "
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
              </div>
              {/* <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Industry
              </label>
              <div className="mt-2">
                <input
                  id="industry"
                  type="text"
                  placeholder="Industry Name"
                  {...register("industry")}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                />
                {errors.industry && (
                  <p className="text-red-500 text-sm">
                    {errors.industry.message}
                  </p>
                )}
              </div>
            </div> */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    // type="hidden"
                    id="email"
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                    defaultValue={employerEmail ?? ""}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-md font-medium leading-6 text-gray-900"
                >
                  Địa chỉ
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    type="text"
                    placeholder="Địa chỉ"
                    {...register("location")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
             
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  {/* <div className="text-sm">
                  <a
                    href="s"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    {...register("password")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Nhập lại mật khẩu
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...register("confirmPassword")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-row space-x-[2%] my-[10px]">
              <div className="flex flex-col space-y-2 w-[49%]">
                <label className="font-bold" htmlFor="gender">Giới tính</label>
                <select name="gender" id="gender" className="border border-gray-300 p-2 rounded-md focus:border-blue-500">
                  <option value="" selected disabled hidden>Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="male">Khác</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 w-[49%]">
                <label className="font-bold" htmlFor="bthd">Ngày sinh</label>
                <input type="date" id="bthd" className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"/>
              </div>
            </div>
             
              <div>
                <button
                  type="submit"
                  className="w-full px-3 py-2 text-md  bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center "
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* <p className="mt-10 text-center text-sm text-gray-500">
              Đã có tài khoản ?{" "}
              <Link to={"/employer/login"}>
                <span className="text-loginText underline">

                  Đăng nhập
                </span>
              </Link>
            </p> */}
            <div className="mt-4 text-center">
            <Link to={"/employer/login"}>
                <span className="text-gray-500  ">
                  Đã có tài khoản ?{" "}
                  <p className="text-loginText underline">Đăng nhập</p>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default EmployerRegister;
