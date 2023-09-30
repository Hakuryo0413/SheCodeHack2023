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
  Input,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Chip,
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
      setValue("address", userDetails?.address);
      setValue("about", userDetails?.about);
      setValue("about", userDetails?.about);
      setValue("experience", userDetails?.experience);
      setValue("profession", userDetails?.profession);
      setValue("resume", userDetails?.resume);
      setValue("education", userDetails?.education);
      console.log(userDetails.address);
      console.log(userDetails.education);

      if (userDetails.page2) {
        setValue("page2.page2q1", userDetails.page2.page2q1);
        setValue("page2.page2q2", userDetails.page2.page2q2);
        setValue("page2.page2q3", userDetails.page2.page2q3);
        setValue("page2.page2q4", userDetails.page2.page2q4);
        setValue("page2.page2q5", userDetails.page2.page2q5);
        setValue("page2.page2q6", userDetails.page2.page2q6);
        setValue("page2.page2q7", userDetails.page2.page2q7);
        setValue("page2.page2q8", userDetails.page2.page2q8);
        setValue("page2.page2q9", userDetails.page2.page2q9);
      }

      if (userDetails.page3) {
        setValue("page3.page3q1", userDetails.page3.page3q1);
        setValue("page3.page3q2", userDetails.page3.page3q2);
        setValue("page3.page3q3", userDetails.page3.page3q3);
        setValue("page3.page3q4", userDetails.page3.page3q4);
      }
    }
  });

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
    const updatedFormData = { ...formData, image: imageFile };
    updateUser(updatedFormData)
      .then(() => {
        notify("Data updated successfully", "success");
        // setTimeout(() => {
        //   navigate("/user/profile");
        // }, 2000);
      })
      .catch((error: any) => {
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
                <div className="flex flex-col space-y-2 w-[49%]">
                  <label className="font-bold" htmlFor="gender">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                  >
                    <option value="" selected disabled hidden>
                      Chọn giới tính
                    </option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-2 w-[49%]">
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
                <input
                  type="text"
                  id="edu"
                  placeholder="Trình độ học vấn"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  {...register("education")}
                />
              </div>
            </div>

            <div id="page-2" className="hidden lg:mx-[15%] mx-0">
              <p className="text-[20px] text-center font-bold py-8">
                Thông tin thêm về tôi
              </p>
              <div className="flex flex-row space-x-[2%] my-[10px]">
                <div className="flex flex-col space-y-2 w-[49%]">
                  <label className="font-bold">
                    Bạn đã có chuyên môn kỹ thuật chưa?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="question1"
                        value="yes"
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="question1"
                        value="no"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 w-[49%]">
                  <label className="font-bold">
                    Bạn đã từng tham gia vào dự án startup chưa?
                  </label>
                  <div className="space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="question2"
                        value="yes"
                      />
                      <span className="ml-2">Yes</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="question2"
                        value="no"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn dự định làm việc full-time tại startup vào lúc nào?
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="male">
                    Tôi có thể làm full-time luôn khi tìm được co-founder
                  </option>
                  <option value="female">
                    Tôi dự tính bắt đầu làm full time từ năm sau
                  </option>
                  <option value="male">Tôi vẫn chưa có kế hoạch cụ thể</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn tham gia vào lĩnh vực nào của dự án startup
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="male">Kĩ sư lập trình</option>
                  <option value="female">Thiết kế</option>
                  <option value="male">Sale và marketing</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn có hứng thú với chủ đề startup nào
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="male"></option>
                  <option value="female"></option>
                  <option value="male"></option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Kỳ vọng của bạn về việc chia tách vốn chủ sở hữu là gì?
                </label>
                <textarea
                  id="exper"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Bạn thường làm gì vào thời gian rảnh?
                </label>
                <textarea
                  id="exper"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Điều gì đã tạo nên bạn của hiện tại?
                </label>
                <textarea
                  id="exper"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold">
                  Bạn có muốn chia sẻ điều gì thêm về bản thân?
                </label>
                <textarea
                  id="exper"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
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
                  id="exper"
                  placeholder="Viết câu trả lời"
                  className="min-h-[100px] border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn đang tìm kiếm một co-founder như thế nào?
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="">Co-founder đã có ý tưởng</option>
                  <option value="">Co-founder chưa có ý tưởng cụ thể</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Co-founder bạn đang tìm kiếm phải có thời gian làm việc như
                  thế nào?
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="">
                    Thời gian làm việc khớp với thời gian biểu của tôi
                  </option>
                  <option value="">
                    Không bắt buộc phải có thời gian làm việc khớp với thời gian
                    biểu của tôi
                  </option>
                </select>
              </div>

              <div className="flex flex-col space-y-2 my-[10px]">
                <label className="font-bold" htmlFor="gender">
                  Bạn muốn tìm kiếm co-founder ở khu vực nào?
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="border border-gray-300 p-2 rounded-md focus:border-blue-500"
                >
                  <option value="" selected disabled hidden>
                    Lựa chọn câu trả lời
                  </option>
                  <option value="">Gần nơi ở của tôi</option>
                  <option value="">Trong thành phố của tôi</option>
                  <option value="">Trong đất nước của tôi</option>
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
