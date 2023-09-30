import React, { useEffect, useState } from "react";
import { Breadcrumbs, Avatar } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CofounderRegisterPayload } from "../../../types/PayloadInterface";
import { CofounderData } from "../../../features/axios/api/Cofounder/CofounderDetails";
import { updateCofounder } from "../../../features/axios/api/Cofounder/CofounderDetails";

function CofounderEditProfile() {
  const navigate = useNavigate();
  const [CofounderDetails, setCofounderDetails] = useState<
    CofounderRegisterPayload | undefined
  >();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    async function getCofounderDetails() {
      const data = await CofounderData();
      setCofounderDetails(data?.CofounderData);
    }
    getCofounderDetails();
  }, []);

  const { register, handleSubmit, setValue } =
    useForm<CofounderRegisterPayload>({});

  useEffect(() => {
    if (CofounderDetails) {
      setValue("companyName", CofounderDetails?.companyName);
      setValue("email", CofounderDetails?.email);
      setValue("location", CofounderDetails?.location);
      setValue("about", CofounderDetails?.about);
      setValue("experience", CofounderDetails?.experience);
      setValue("education", CofounderDetails?.education);
      // setValue("image", CofounderDetails?.image);

      // setValue("education", CofounderDetails?.education);

      // setValue("industry", CofounderDetails?.industry);
    }
  }, [CofounderDetails]);

  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (FormData: CofounderRegisterPayload) => {
    const imageFile = FormData.image[0];
    const updatedFormData = { ...FormData, image: imageFile };
    updateCofounder(updatedFormData)
      .then(() => {
        notify("Data updated successfully", "success");
        setTimeout(() => {
          navigate("/Cofounder/profile");
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };
  return (
    <div>
      <div className="pl-1">
        <Breadcrumbs className="bg-white">
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
          <a href="/Cofounder/profile" className="opacity-60">
            <span>Hồ sơ</span>
          </a>
          <a href="#">Chỉnh sửa thông tin</a>
        </Breadcrumbs>
      </div>
      <div className=" mx-auto max-w-screen-xl p-2 mt-4 rounded lg:pl-6">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Hồ sơ
              </h2>
              <p className="mt-1 text-lg leading-6 text-gray-600">
                Thông tin này sẽ được hiển thị công khai, vì vậy hãy cẩn thận về
                những gì bạn chia sẻ.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Avatar
                      src={selectedImg || CofounderDetails?.image}
                      alt="image"
                      size="lg"
                      className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                    />
                    <label className="relative cursor-pointer bg-purple-200 hover:bg-purple-300 py-2 px-4 rounded-md shadow-sm">
                      <span className="text-black">Choose File</span>
                      <input
                        type="file"
                        id="user-profile"
                        accept=".jpg, .jpeg, .png"
                        {...register("image")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                {/* <div className="col-span-full">
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Profession
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="industry"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register("industry")}
                    />
                  </div>
                </div> */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="font-semibold capitalize text-md"
                  >
                    Tên
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="companyName"
                      required
                      {...register("companyName")}
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="font-semibold capitalize text-md"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="email"
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="location" className="font-semibold text-md">
                    Địa chỉ
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="location"
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                      {...register("location")}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="font-semibold text-md">
                    Giới thiệu bản thân
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      rows={3}
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                      {...register("about")}
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="about" className="font-semibold  text-md">
                    Kinh nghiệm
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      rows={3}
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                      {...register("experience")}
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label htmlFor="about" className="font-semibold  text-md">
                    Trình độ học vấn
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      rows={3}
                      style={{ paddingLeft: "6px" }} // Thêm padding bên trái là 2px cho placeholder
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 font-normal text-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-gray-500 focus:ring-2 focus:ring-inset  focus:ring-purple-600  sm:leading-6"
                      {...register("education")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Lưu
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default CofounderEditProfile;
