import React, { useEffect, useState } from "react";
import {
  updateUser,
  userData,
} from "../../../features/axios/api/user/userDetails";
import { UserInterface } from "../../../types/UserInterface";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { deleteResume } from "../../../features/axios/api/user/userDetails";
import ConfirmResumeDelete from "./ConfirmResumeDelete";
import AddResume from "./AddResumeModal";
import AddKeySkillsModal from "./AddKeySkills";
import {
  Card,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import {
  PencilIcon,
  PaperClipIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Label } from "@headlessui/react/dist/components/label/label";
import { boolean } from "yup";
import { useForm } from "react-hook-form";
import e from "express";

let stage = 1;

function moveToNext(): void {
  if (stage < 3) stage = stage + 1;
  showPage();
}

function moveToBack(): void {
  if (stage > 1) stage = stage - 1;
  showPage();
}

function showPage(): void {
  console.log(stage);
  let page1: HTMLElement | null = document.getElementById("page-1");
  let page2: HTMLElement | null = document.getElementById("page-2");
  let page3: HTMLElement | null = document.getElementById("page-3");

  let backButt: HTMLElement | null = document.getElementById("back-butt");
  let nextButt: HTMLElement | null = document.getElementById("next-butt");
  let submitButt: HTMLElement | null = document.getElementById("submit-butt");

  let one: HTMLElement | null = document.getElementById("one");
  let two: HTMLElement | null = document.getElementById("two");
  let three: HTMLElement | null = document.getElementById("three");

  if (
    page1 &&
    page2 &&
    page3 &&
    backButt &&
    nextButt &&
    one &&
    two &&
    three &&
    submitButt
  ) {
    if (stage == 1) {
      page1.style.display = "block";
      page2.style.display = "none";
      page3.style.display = "none";

      backButt.style.visibility = "hidden";
      nextButt.style.visibility = "visible";
      submitButt.style.visibility = "hidden";

      one.style.backgroundColor = "#7D4EF1";
      one.style.color = "white";

      two.style.backgroundColor = "#C3B1F0";
      two.style.color = "#302C42";

      three.style.backgroundColor = "#C3B1F0";
      three.style.color = "#302C42";
    } else if (stage == 2) {
      page2.style.display = "block";
      page1.style.display = "none";
      page3.style.display = "none";

      backButt.style.visibility = "visible";
      nextButt.style.visibility = "visible";
      submitButt.style.visibility = "hidden";

      two.style.backgroundColor = "#7D4EF1";
      two.style.color = "white";

      one.style.backgroundColor = "#C3B1F0";
      one.style.color = "#302C42";

      three.style.backgroundColor = "#C3B1F0";
      three.style.color = "#302C42";
    } else {
      page3.style.display = "block";
      page2.style.display = "none";
      page1.style.display = "none";

      backButt.style.visibility = "visible";
      nextButt.style.visibility = "hidden";
      submitButt.style.visibility = "visible";

      three.style.backgroundColor = "#7D4EF1";
      three.style.color = "white";

      two.style.backgroundColor = "#C3B1F0";
      two.style.color = "#302C42";

      one.style.backgroundColor = "#C3B1F0";
      one.style.color = "#302C42";
    }
  }
}

function UserProfile() {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserInterface>({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [resumeDeleted, setResumeDeleted] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showResumeUpload, setResumeUpload] = useState(false);
  const [showKeySkillUpload, setShowSkillUpload] = useState(false);



  const resumeUrl = userDetails?.resume;

  const { register, handleSubmit, setValue } = useForm<UserInterface>({});

  useEffect(() => {
    const userInfo = async () => {
      const data = await userData();
      setUserDetails(data);
    };
    userInfo();
  }, [resumeDeleted, isUploaded]);

  useEffect(() => {
    if (userDetails) {
      setValue("name", userDetails?.name);
      setValue("email", userDetails?.email);
      setValue("gender", userDetails?.gender);
      setValue("birthday", userDetails?.birthday);
      setValue("age",userDetails?.age);
      setValue("address", userDetails?.address);
      setValue("about", userDetails?.about);
      setValue("about", userDetails?.about);
      setValue("experience", userDetails?.experience);
      setValue("profession", userDetails?.profession);
      setValue("resume", userDetails?.resume);
      setValue("education", userDetails?.education);
      
      setValue("page2q1", userDetails.page2q1);
      setValue("page2q2", userDetails.page2q2);
      setValue("page2q3", userDetails.page2q3);
      setValue("page2q4", userDetails.page2q4);
      setValue("page2q5", userDetails.page2q5);

      
      setValue("page2q6", userDetails.page2q6);
      setValue("page2q7", userDetails.page2q7);
      setValue("page2q8", userDetails.page2q8);
      setValue("page2q9", userDetails.page2q9);

    
      setValue("page3q1", userDetails.page3q1);
      setValue("page3q2", userDetails.page3q2);
      setValue("page3q3", userDetails.page3q3);
      setValue("page3q4", userDetails.page3q4);
    }
  }, [setValue, userDetails]);

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

  const submitHandler = async (formData: UserInterface) => {
    const imageFile = formData.image[0];
    const updatedFormData = { ...formData};
    const num = formData.image.length.toString();
    updateUser(updatedFormData)
      .then(() => {
        notify(num, "success");
        notify("Data updated successfully", "success");
      })
      .catch((error: any) => {
        if (typeof formData.image == "object") {
          notify("Success", "success");
        } else {
          notify("Error", "error");
        }
        notify(formData.image + " ", "error");
        notify(error.message, "error");
      });
  };

  return (
    <div className="pt-10 pb-5 bg-[#302C42]">
      <Card className="relative mx-[10%] mt-16 lg:mx-[15%] shadow-lg shadow-gray-400">
        <CardBody className="p-4">
          <form onSubmit={handleSubmit(submitHandler)}>
            <button
              id="submit-butt"
              type="submit"
              className="font-bold invisible float-right w-[100px] text-center bg-[#d9d9d9] hover:bg-[#7b7b7b] text-[#302C42] hover:text-white text-sm px-4 py-2  border rounded-full"
            >
              Lưu
            </button>
            <div id="page-1" className="lg:mx-[15%]">
              <p className="text-[20px] text-center font-bold py-8">
                Thông tin cá nhân cơ bản
              </p>
              <div className="col-span-full">
                <label htmlFor="photo" className="font-bold">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Avatar
                    src={selectedImg || userDetails?.image}
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

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="name">
                  Tên
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Tên"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("name")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-row space-x-[2%] my-[10px]">
                <div className="flex flex-col space-y-2 w-[30%]">
                  <label className="font-bold" htmlFor="gender">
                    Giới tính
                  </label>
                  <select
                    id="gender"
                    className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                    {...register("gender")}
                  >
                    <option value="" selected disabled hidden>
                      Chọn giới tính
                    </option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2 w-[30%]">
                  <label className="font-bold" htmlFor="bthd">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    id="bthd"
                    className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                    {...register("birthday")}
                  />
                </div>

                <div className="flex flex-col space-y-2 w-[20%]">
                  <label className="font-bold" htmlFor="age">
                    Tuổi
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                    {...register("age")}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="address">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Địa chỉ"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("address")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="aboutme">
                  Giới thiệu về bản thân
                </label>
                <textarea
                  id="about_me"
                  placeholder="Giới thiệu về bản thân"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("about")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="exper">
                  Kinh nghiệm
                </label>
                <textarea
                  id="exper"
                  placeholder="Kinh nghiệm"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("experience")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="profile">
                  Sơ yếu lý lịch
                </label>
                <input
                  type="file"
                  id="profile"
                  accept="application/pdf"
                  {...register("resume")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="edu">
                  Trình độ học vấn
                </label>
                <select
                  id="edu"
                  placeholder="Trình độ học vấn"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("education")}
                >
                        <option value="Đại học">Đại học</option>
                        <option value="Thạc sỹ">Thạc sỹ</option>
                        <option value="Tiến sỹ">Tiến sỹ</option>
                        <option value="Dưới đại học">Dưới đại học</option>
                        <option value="Cử nhân">Cử nhân</option>
                </select>
              </div>
            </div>

            <div id="page-2" className="hidden lg:mx-[15%] mx-0">
              <p className="text-[20px] text-center font-bold py-8">
                Thông tin thêm về tôi
              </p>
              <div className="flex flex-row space-x-[2%] my-[10px]">
                <div className="flex flex-col space-y-2 w-[49%]">
                  <label className="font-bold">
                    Bạn muốn tham gia vào án trong vai trò gì?
                  </label>
                  <select
                  id="page2q1"
                  className="w-[90%] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q1")}
                  >
                        <option value="" selected disabled hidden>Chọn câu trả lời</option>
                        <option value="Kỹ thuật viên">Kỹ thuật viên</option>
                        <option value="Thiết kế">Thiết kế</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Manager">Manager</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2 w-[49%]">
                  <label className="font-bold">
                    Bạn đã có kinh nghiệm tại vị trí này?
                  </label>
                  <input
                  id="page2q2"
                  type="number"
                  placeholder="Năm"
                  className="w-[90%] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q2")}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="page2q3">
                  bạn đã từng tham gia vào dự án start-up chưa?
                </label>
                <select
                  id="page2q3"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page2q3")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="Không">
                    Tôi chưa từng tham gia vào dự án start-up nào
                  </option>
                  <option value="Có">
                    Tôi đã từng tham gia vào dự án start-up
                  </option>
                  
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn muốn tham gia vào dự án với chủ đề nào?
                </label>
                <select
                  id="page2q4"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page2q4")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                      <option value="Môi trường">Môi trường</option>
                      <option value="Kinh tế">Kinh tế</option>
                      <option value="Y tế">Y tế</option>
                      <option value="Công nghệ">Công nghệ</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn muốn tham gia start-up sử dụng ngôn ngữ?
                </label>
                <select
                  id="page2q5"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page2q5")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                      <option value="Anh">Anh</option>
                      <option value="Việt">Việt</option>
                      <option value="Trung">Trung</option>
                      <option value="Nhật">Nhật</option>
                      <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Kỳ vọng của bạn về việc chia tách vốn chủ sở hữu là gì?
                </label>
                <textarea
                  id="page2q6"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q6")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Bạn thường làm gì vào thời gian rảnh?
                </label>
                <textarea
                  id="page2q7"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q7")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Điều gì đã tạo nên bạn của hiện tại?
                </label>
                <textarea
                  id="page2q8"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q8")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Bạn có muốn chia sẻ điều gì thêm về bản thân?
                </label>
                <textarea
                  id="page2q9"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page2q9")}
                />
              </div>
            </div>

            <div id="page-3" className="hidden lg:mx-[15%] mx-0">
              <p className="text-[20px] text-center font-bold py-8">
                Thông tin về co-founder lý tưởng
              </p>
              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Bạn mong muốn gì từ một co-founder?
                </label>
                <textarea
                  id="page3q1"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("page3q1")}
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Hình thức làm việc với co-founder mà bạn muốn?
                </label>
                <select
                  id="page3q2"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page3q2")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Cả hai">Cả hai</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Co-founder bạn đang tìm kiếm phải có thời gian làm việc như
                  thế nào?
                </label>
                <select
                  id="page3q3"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page3q3")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                      <option value="Cả ngày">Cả ngày</option>
                      <option value="Sáng">Sáng</option>
                      <option value="Trưa">Trưa</option>
                      <option value="Chiều">Chiều</option>
                      <option value="Tối">Tối</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn muốn tìm kiếm co-founder ở khu vực nào?
                </label>
                <select
                  id="page3q4"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  {...register("page3q4")}
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                      <option value="An Giang">An Giang</option>
                      <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                      <option value="Bạc Liêu">Bạc Liêu</option>
                      <option value="Bắc Kạn">Bắc Kạn</option>
                      <option value="Bắc Giang">Bắc Giang</option>
                      <option value="Bắc Ninh">Bắc Ninh</option>
                      <option value="Bến Tre">Bến Tre</option>
                      <option value="Bình Dương">Bình Dương</option>
                      <option value="Bình Định">Bình Định</option>
                      <option value="Bình Phước">Bình Phước</option>
                      <option value="Bình Thuận">Bình Thuận</option>
                      <option value="Cà Mau">Cà Mau</option>
                      <option value="Cao Bằng">Cao Bằng</option>
                      <option value="Đắk Lắk">Đắk Lắk</option>
                      <option value="Đắk Nông">Đắk Nông</option>
                      <option value="Điện Biên">Điện Biên</option>
                      <option value="Đồng Nai">Đồng Nai</option>
                      <option value="Đồng Tháp">Đồng Tháp</option>
                      <option value="Gia Lai">Gia Lai</option>
                      <option value="Hà Giang">Hà Giang</option>
                      <option value="Hà Nam">Hà Nam</option>
                      <option value="Hà Nội (Thủ đô)">Hà Nội (Thủ đô)</option>
                      <option value="Hà Tĩnh">Hà Tĩnh</option>
                      <option value="Hải Dương">Hải Dương</option>
                      <option value="Hải Phòng">Hải Phòng</option>
                      <option value="Hậu Giang">Hậu Giang</option>
                      <option value="Hòa Bình">Hòa Bình</option>
                      <option value="Hưng Yên">Hưng Yên</option>
                      <option value="Khánh Hòa">Khánh Hòa</option>
                      <option value="Kiên Giang">Kiên Giang</option>
                      <option value="Kon Tum">Kon Tum</option>
                      <option value="Lai Châu">Lai Châu</option>
                      <option value="Lâm Đồng">Lâm Đồng</option>
                      <option value="Lạng Sơn">Lạng Sơn</option>
                      <option value="Lào Cai">Lào Cai</option>
                      <option value="Long An">Long An</option>
                      <option value="Nam Định">Nam Định</option>
                      <option value="Nghệ An">Nghệ An</option>
                      <option value="Ninh Bình">Ninh Bình</option>
                      <option value="Ninh Thuận">Ninh Thuận</option>
                      <option value="Phú Thọ">Phú Thọ</option>
                      <option value="Phú Yên">Phú Yên</option>
                      <option value="Quảng Bình">Quảng Bình</option>
                      <option value="Quảng Nam">Quảng Nam</option>
                      <option value="Quảng Ngãi">Quảng Ngãi</option>
                      <option value="Quảng Ninh">Quảng Ninh</option>
                      <option value="Quảng Trị">Quảng Trị</option>
                      <option value="Sóc Trăng">Sóc Trăng</option>
                      <option value="Sơn La">Sơn La</option>
                      <option value="Tây Ninh">Tây Ninh</option>
                      <option value="Thái Bình">Thái Bình</option>
                      <option value="Thái Nguyên">Thái Nguyên</option>
                      <option value="Thanh Hóa">Thanh Hóa</option>
                      <option value="Thừa Thiên - Huế">Thừa Thiên - Huế</option>
                      <option value="Tiền Giang">Tiền Giang</option>
                      <option value="Trà Vinh">Trà Vinh</option>
                      <option value="Tuyên Quang">Tuyên Quang</option>
                      <option value="Vĩnh Long">Vĩnh Long</option>
                      <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                      <option value="Yên Bái">Yên Bái</option>
                      <option value="Phú Quốc (Tỉnh Kiên Giang)">Phú Quốc (Tỉnh Kiên Giang)</option>
                      <option value="Bạc Liêu (Thành phố)">Bạc Liêu (Thành phố)</option>
                      <option value="Cần Thơ (Thành phố)">Cần Thơ (Thành phố)</option>
                      <option value="nước ngoài">nước ngoài</option>
                </select>
              </div>
            </div>

            <div id="butt-nav" className="mt-16 font-bold">
              <a
                id="back-butt"
                role="button"
                className="invisible float-left w-[100px] text-center bg-[#d9d9d9] hover:bg-[#7b7b7b] text-[#302C42] hover:text-white text-sm px-4 py-2  border rounded-full"
                onClick={() => moveToBack()}
              >
                Trở lại
              </a>
              <a
                id="next-butt"
                role="button"
                className="float-right w-[100px] text-center bg-[#d9d9d9] hover:bg-[#7b7b7b] text-[#302C42] hover:text-white text-sm px-4 py-2  border rounded-full"
                onClick={() => moveToNext()}
              >
                Tiếp theo
              </a>

              <div className="flex items-center justify-center">
                <a
                  id="one"
                  role="button"
                  className="text-c bg-[#7D4EF1] text-white text-sm h-[40px] w-[40px] flex items-center justify-center border rounded-full m-[5px]"
                >
                  1
                </a>

                <a
                  id="two"
                  role="button"
                  className="text-c bg-[#C3B1F0] text-[#302C42] text-sm h-[40px] w-[40px] flex items-center justify-center border rounded-full m-[5px]"
                >
                  2
                </a>

                <a
                  id="three"
                  role="button"
                  className="text-c bg-[#C3B1F0] text-[#302C42] text-sm h-[40px] w-[40px] flex items-center justify-center border rounded-full m-[5px]"
                >
                  3
                </a>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {showDeleteConfirmation && (
        <ConfirmResumeDelete
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => deleteResume()}
          isDeleted={() => setResumeDeleted(!resumeDeleted)}
        />
      )}
      <div className="z-10">
        {showResumeUpload && (
          <AddResume
            isOpen={showResumeUpload}
            onClose={() => setResumeUpload(false)}
            setIsUploaded={() => setIsUploaded(!isUploaded)}
          />
        )}
      </div>

      <div>
        <AddKeySkillsModal
          isOpen={showKeySkillUpload}
          onClose={() => setShowSkillUpload(false)}
          setIsUploaded={() => setIsUploaded(!isUploaded)}
        />
      </div>
      <ToastContainer className="z-50" />
    </div>
  );
}

export default UserProfile;
