import { Menu, Transition } from "@headlessui/react";
import { ProjectsInterface } from "../../../types/ProjectInterface";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "../Projects/ConfirmDelete";
import deleteProject from "../../../features/axios/api/Cofounder/deleteProject";
import { useDispatch } from "react-redux";
import { setCofounderProjectId } from "../../../features/redux/slices/Cofounder/CofounderProjectDetailsSlice";
import { ToastContainer } from "react-toastify";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

interface AllProjectsProps {
  Projects: ProjectsInterface;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProjectsByCofounder: React.FC<AllProjectsProps> = ({ Projects }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteButtonClick = (ProjectId: string) => {
    setSelectedProjectId(ProjectId);
    setShowDeleteConfirmation(true);
  };

  const handleViewProject = (ProjectId: string) => {
    dispatch(setCofounderProjectId(ProjectId));
    navigate("/Project/view-Project");
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4  bg-white">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
            {Projects.title}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {/* Render Project details */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {Projects.topic}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {Projects.role}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {Projects.location}
            </div>
            {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {Projects.salary}
              </div> */}
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Đăng vào {new Date(Projects.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          {/* Render action buttons */}
          <span className="hidden sm:block">
            <Link to={`/Project/edit-Project/${Projects._id}`}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PencilIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Sửa
              </button>
            </Link>
          </span>
          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => handleViewProject(Projects._id)}
            >
              <LinkIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Xem chi tiết
            </button>
          </span>
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => handleDeleteButtonClick(Projects._id)}
            >
              <TrashIcon
                className="-ml-0.5 mr-1.5 h-5 w-5"
                aria-hidden="true"
              />
              Xoá
            </button>
          </span>
          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
              More
              <ChevronDownIcon
                className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="l"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Edit
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="l"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      View
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {showDeleteConfirmation && (
        <ConfirmDelete
          isOpen={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => deleteProject(selectedProjectId)}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProjectsByCofounder;
