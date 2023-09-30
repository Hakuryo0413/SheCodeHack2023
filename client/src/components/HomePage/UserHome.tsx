import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";
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

function UserHome() {
  const user = useSelector((state: RootState) => state.userDetails.userDetails);

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32 ">
      <div className="max-w-8xl px-6 lg:px-8 ">
        <div className="flex items-center" style={{ marginTop: -20 }}>
          <div className="" style={{ marginLeft: 90 }}>
            <h2 className="text-3xl font-black font-mono  sm:text-7xl">
              Find the right<br></br>
              <p>
                startup{" "}
                <span style={{ color: "#7339AB", display: "inline" }}>
                  Cofounders
                </span>
              </p>
            </h2>
            <p className="mt-6 text-xl leading-8 text-h6 font-semibold   ">
              Gặp gỡ các nhà đồng sáng lập, bạn sẽ nhanh chóng tìm thấy<br></br>
              các thành viên phù hợp cho đội ngũ startup của mình hoặc các{" "}
              <br></br> dự án thú vị để tham gia. Đây là nơi dành cho các
              startup tài năng.
            </p>
          </div>
          <img
            src="https://res.cloudinary.com/dkglfu0md/image/upload/v1695456140/homepage_h1nvin.png"
            alt="Img"
            style={{ marginLeft: 250, maxWidth: 450, maxHeight: 450 }}
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold text-xl leading-7 text-black sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-black">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-black">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
