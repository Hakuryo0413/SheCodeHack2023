import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
import { useDispatch } from "react-redux";
import { setJobId } from "../../features/redux/slices/user/jobDetailsSlice";
import { JobsInterface } from "../../types/JobInterface";
import {
  BriefcaseIcon,
  CalendarIcon,
  ChevronDownIcon,
  CurrencyRupeeIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

const links = [
  { name: "Phù hợp cho tất cả giai đoạn phát triển", href: "#" },
  { name: "Dự án đa dạng", href: "#" },
  { name: "Tự mình khám phá và trải nghiệm", href: "#" },
];
const stats = [
  { name: "Dự án", value: "1000+" },
  { name: "Nhà sáng lập", value: "100+" },
  { name: "Miễn phí", value: "Không giới hạn" },
];
const products = [
  {
    id: 1,
    name: "Project1",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];
interface AllJobsProps {
  jobs: JobsInterface;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Recommend: React.FC<AllJobsProps> = ({ jobs, selected, setSelected }) => {
  const dispatch = useDispatch();

  const handleViewJob = (jobId: string) => {
    dispatch(setJobId(jobId));
    setSelected(jobId);
  };

  return (
    <>
      <div
        className={`border border-gray-300 rounded-md p-4 mb-4 bg-white ${
          selected === jobs._id
            ? "ring-2 ring-purple-500 transition-all duration-500"
            : ""
        }`}
      >
        <div className=" lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
              {jobs.title}
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              {/* Render job details */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-600"
                  aria-hidden="true"
                />
                {jobs.topic}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BriefcaseIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-600"
                  aria-hidden="true"
                />
                {jobs.role}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPinIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                  aria-hidden="true"
                />
                {jobs.location}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-purple-400"
                  aria-hidden="true"
                />
                Đăng vào {new Date(jobs.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            {/* Render action buttons */}
            <span className="ml-3 hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => handleViewJob(jobs._id)}
              >
                <LinkIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Xem chi tiết
              </button>
            </span>
            {/* Dropdown */}
            {/* <Menu as="div" className="relative ml-3 sm:hidden">
              <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDownIcon
                  className="-mr-1 ml-1.5 h-5 w-5 text-purple-400"
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
                          "block px-4 py-2 text-sm text-black"
                        )}
                      >
                        Sửa
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="l"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-black"
                        )}
                      >
                        Xem chi tiết
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu> */}
          </div>
        </div>
      </div>
    </>
  );
};
// function UserHome() {
//   const user = useSelector((state: RootState) => state.userDetails.userDetails);

//   return (
//     <div className="relative isolate overflow-hidden py-24 sm:py-32 ">
//       <div className="max-w-8xl px-6 lg:px-8 ">
//         <div className="flex items-center" style={{ marginTop: -20 }}>
//           {/* <div className="" style={{ marginLeft: 90 }}>
//             <h2 className="text-3xl font-black font-mono  sm:text-7xl">
//               Find the right<br></br>
//               <p>
//                 startup{" "}
//                 <span style={{ color: "#7339AB", display: "inline" }}>
//                   Cofounders
//                 </span>
//               </p>
//             </h2>
//             <p className="mt-6 text-xl leading-8 text-h6 font-semibold   ">
//               Gặp gỡ các nhà đồng sáng lập, bạn sẽ nhanh chóng tìm thấy<br></br>
//               các thành viên phù hợp cho đội ngũ startup của mình hoặc các{" "}
//               <br></br> dự án thú vị để tham gia. Đây là nơi dành cho các
//               startup tài năng.
//             </p>
//           </div> */}
//           {/* <img
//             src="https://res.cloudinary.com/dkglfu0md/image/upload/v1695456140/homepage_h1nvin.png"
//             alt="Img"
//             style={{ marginLeft: 250, maxWidth: 450, maxHeight: 450 }}
//           /> */}
//         </div>
//         <div className="bg-white">
//           <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//             <h2 className="text-2xl font-bold tracking-tight text-gray-900">
//               Đề xuất dự án{" "}
//             </h2>

//             <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//               {products.map((product) => (
//                 <div key={product.id} className="group relative">
//                   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                     <img
//                       src={product.imageSrc}
//                       alt={product.imageAlt}
//                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     />
//                   </div>
//                   <div className="mt-4 flex justify-between">
//                     <div>
//                       <h3 className="text-sm text-gray-700">
//                         <a href={product.href}>
//                           <span
//                             aria-hidden="true"
//                             className="absolute inset-0"
//                           />
//                           {product.name}
//                         </a>
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         {product.color}
//                       </p>
//                     </div>
//                     <p className="text-sm font-medium text-gray-900">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Recommend;
