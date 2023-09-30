import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllprojects } from "../../../features/redux/slices/user/getAllprojectsSlice";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { projectsInterface } from "../../../types/projectInterface";
import { Navbar, Button, Input } from "@material-tailwind/react";
import projectList from "./projectList";
import projectDetails from "./projectDetails";
import UserSideprojectListingShimmer from "../../shimmer/UserSideprojectListingShimmer";
import { isApplied } from "../../../features/axios/api/user/applyForproject";
import {
  distinct,
  filterprojects,
} from "../../../features/axios/api/user/projectDetails";

function Displayprojects(this: any) {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.allprojects.projects
  );
  const status = useSelector((state: RootState) => state.allprojects.status);
  const error = useSelector((state: RootState) => state.allprojects.error);
  const user = useSelector((state: RootState) => state.userDetails.userDetails);

  const [projectsList, setprojectsList] = useState<any>([]);
  // variable for project selection ring
  const [selected, setSelected] = useState("");
  // variables for search searching
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [locations, setLocations] = useState([]);
  const [wokingTimes, setWorkingTimes] = useState([]);
  const [roles, setRoles] = useState([]);
  const [salaries, setSalaries] = useState([]);
  // variables for filtering
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkingTime, setWorkingTime] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  const [filtered, setFiltered] = useState<any>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // for the scroll behavior of nav
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      setVisible(prevScrollPos > currentScrollPos);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    dispatch(fetchAllprojects());
  }, [dispatch]);

  useEffect(() => {
    distinct("location", setLocations);
    distinct("role", setRoles);
    distinct("topic", setTopics);
  }, []);

  useEffect(() => {
    let filterproject = projects?.filter(
      (project: projectsInterface) =>
        project?.topic?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        project?.location?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        project?.role?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setprojectsList(filterproject);
  }, [projects, searchQuery]);

  const handleFilter = async () => {
    const filteredprojects = await filterprojects(
      selectedTopic,
      //selectedWorkingTime,
      selectedRole,
      selectedLocation
      //selectedSalary
    );
    setFiltered(filteredprojects);
    setIsFiltered(true);
  };

  // for filtering out the applied projects
  useEffect(() => {
    const fetchFilteredprojects = async () => {
      let filteredprojects = [];
      if (isFiltered) {
        filteredprojects = await Promise.all(
          (filtered ?? [])?.map(async (project: projectsInterface) => {
            const projectStatus = await isApplied(project?._id, user?._id);
            if (projectStatus?.status !== "Applied") {
              return project;
            }
            return null;
          })
        );
      } else {
        filteredprojects = await Promise.all(
          (projectsList ?? [])?.map(async (project: projectsInterface) => {
            const projectStatus = await isApplied(project?._id, user?._id);
            if (projectStatus?.status !== "Applied") {
              return project;
            }
            return null;
          })
        );
      }
      setFiltered(filteredprojects?.filter(Boolean));
    };

    fetchFilteredprojects();
  }, [projects]);

  if (status === "loading") {
    return (
      <div className="p-20">
        <UserSideprojectListingShimmer />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full pt-16 z-30 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar className="mx-auto max-w-screen-2xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-y-4 text-blue-gray-900">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                label="Search here..."
                color="purple"
                className="pr-20"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Chọn chủ đề</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Chọn địa điểm</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-1">
              <select
                className="focus:ring-2 focus:ring-purple-600 border-2 rounded-lg py-2 px-4 text-gray-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Chọn vai trò</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <Button
              size="sm"
              className="!absolute right-1 rounded"
              color="purple"
              onClick={() => handleFilter()}
            >
              Filter
            </Button>
            <div className="w-20"></div>
          </div>
        </Navbar>
      </div>

      <div className="p-28 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-wrap min-h-screen">
        <div className="w-full sm:w-2/4 p-4 sm:p-6">
          <div
            className="overflow-y-auto p-6"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            {isFiltered
              ? filtered.map((project: projectsInterface) => (
                  <projectList
                    key={project._id}
                    projects={project}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))
              : projectsList?.map((project: projectsInterface) => (
                  <projectList
                    key={project._id}
                    projects={project}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
          </div>
        </div>
        <div className="w-full sm:w-2/4 p-4 sm:p-6 bg-white">
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }}
          >
            <projectDetails />
          </div>
        </div>
      </div>
    </>
  );
}

export default Displayprojects;
