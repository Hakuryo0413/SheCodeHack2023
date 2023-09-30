import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userLoginValidationSchema } from "../../../utils/validation";
import { cofounderLogin } from "../../../features/axios/api/cofounder/cofounderAuthentication";
import { LoginPayload } from "../../../types/PayloadInterface";
import { setCofounderToken } from "../../../features/redux/slices/cofounder/cofounderTokenSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { cofounderLoginSuccess } from "../../../features/redux/slices/cofounder/cofounderDetailsSlice";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { FaFileExcel } from "react-icons/fa";

function CofounderLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cofounderToken = localStorage.getItem("CofounderToken");
  const isLoggedIn = useSelector(
    (state: RootState) => state.cofounderDetails.isLoggedIn
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(userLoginValidationSchema),
  });

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  useEffect(() => {
    if (cofounderToken) {
      dispatch(cofounderLoginSuccess());
    }
    if (isLoggedIn === true) {
      navigate("/cofounder/all-jobs");
    }
  });

  const submitHandler = async (formData: LoginPayload) => {
    cofounderLogin(formData)
      .then((response) => {
        const token = response.token;

        notify("Login success", "success");
        setTimeout(() => {
          dispatch(setCofounderToken(token));
          dispatch(cofounderLoginSuccess());
          navigate("/cofounder/all-jobs");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
    <div
      className={"flex h-screen bg-background"}
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {/* <div className="ml-60 flex justify-center items-center  ">
        <img
          src="https://img.freepik.com/premium-vector/woman-working-laptop_478440-278.jpg?w=1060"
          alt="Img"
          style ={{ maxWidth:450, maxHeight:450}}
        />
      </div> */}
      <div
        style={{
          padding: 24,
          borderRadius: 12,
          backgroundColor: "white",
          flex: 1 / 4,
          alignItems: "center",
        }}
      >
        <h2 className="text-4xl font-bold mb-4">Đăng nhập </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500  "
            />
            {errors.email && (
              <p className="text-red-500 text-md">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-md" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 "
            />
            {errors.password && (
              <p className="text-red-500 text-md">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-md  bg-activeButton text-white rounded hover:bg-buttonPurple flex justify-center items-center "
            style={{ marginTop: 24 }}
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to={"/cofounder/register/form"}>
            <span className="text-gray-500  ">
              Chưa có tài khoản?{" "}
              <p className="text-loginText underline">Đăng ký</p>
            </span>
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default CofounderLogin;
