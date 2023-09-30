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
      {
        icon: <FaChartBar {...icon} />,
        name: "dashboard",
        path: "/cofounder/dashboard",
      },
      {
        icon: <FaBriefcase {...icon} />,
        name: "Dự án",
        path: "/cofounder/all-jobs",
      },
      {
        icon: <FaEnvelope {...icon} />,
        name: "Đơn yêu cầu",
        path: "/cofounder/applications",
      },
      {
        icon: <FaFacebookMessenger {...icon} />,
        name: "Tin nhắn",
        path: "/cofounder/messenger",
      },
      {
        icon: <FaUser {...icon} />,
        name: "Hồ sơ",
        path: "/cofounder/profile",
      },
    ],
  },
];
