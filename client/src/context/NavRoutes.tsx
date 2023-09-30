import {
  FaChartBar,
  FaBriefcase,
  FaEnvelope,
  FaFacebookMessenger,
  FaUser,
} from "react-icons/fa";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const NavRoutes = [
  {
    layout: "admin",
    pages: [
      // {
      //   icon: <FaChartBar {...icon} />,
      //   name: "dashboard",
      //   path: "/employer/dashboard",
      // },
      {
        icon: <FaBriefcase {...icon} />,
        name: "Dự án",
        path: "/employer/all-jobs",
      },
      {
        icon: <FaEnvelope {...icon} />,
        name: "Đơn yêu cầu",
        path: "/employer/applications",
      },
      {
        icon: <FaFacebookMessenger {...icon} />,
        name: "Tin nhắn",
        path: "/employer/messenger",
      },
      {
        icon: <FaUser {...icon} />,
        name: "Hồ sơ",
        path: "/employer/profile",
      },
    ],
  },
];
