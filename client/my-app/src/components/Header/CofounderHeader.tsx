import React, { useState } from "react";

// import { Navbar } from "@material-tailwind/react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  // Cog6ToothIcon,
  InboxArrowDownIcon,
  // LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { CofounderLogout } from "../../features/redux/slices/Cofounder/CofounderDetailsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface ProfileMenuItem {
  label: string;
  icon: React.ElementType;
}

const profileMenuItems: ProfileMenuItem[] = [
  // {
  //   label: "Hồ sơ",
  //   icon: UserCircleIcon,
  // },
  // {
  //   label: "Edit Profile",
  //   icon: Cog6ToothIcon,
  // },
  // {
  //   label: "Inboxe",
  //   icon: InboxArrowDownIcon,
  // },
  // {
  //   label: "Help",
  //   icon: LifebuoyIcon,
  // },
  {
    label: "Đăng xuất",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogout = () => {
    dispatch(CofounderLogout());
    navigate("/");
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://avatars.githubusercontent.com/u/113935267?v=4"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={
                label === "Đăng xuất"
                  ? () => {
                      handleLogout();
                    }
                  : closeMenu
              }
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function CofounderHeader() {
  return (
    <nav className="block w-full rounded-xl shadow-md backdrop-saturate-200 backdrop-blur-2xl border border-white/80 text-white mx-auto max-w-screen-xl p-2 lg:pl-6 bg-background">
      <div className="relative mx-auto flex items-center text-blue-gray-900 bg-background">
        <nav className="flex items-center justify-between text-black ">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dde8ngtcq/image/upload/f_auto,q_auto/tzegfan56pvydnwmbn6y?fbclid=IwAR2USAjHOentofOEgIQq4xWN5I-8iSA332KshJLU-BVbMMU958ETv2iS0Bo"
              alt="Logo"
              className="w-auto h-10 mr-2"
            />
          </div>
        </nav>
        <ProfileMenu />
      </div>
    </nav>
  );
}

export default CofounderHeader;
function clearCofounderToken(): any {
  throw new Error("Function not implemented.");
}
