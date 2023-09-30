import React from "react";
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Nhà sáng lập", href: "coFounderer/login", current: false },
  { name: "Đăng ký", href: "user/register", current: false },
  { name: "Đăng nhập", href: "user/login", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CommonHeader() {
  return (
    <div className="fixed top-0 w-full bg-foundItBg z-50">
      <Disclosure as="nav" className="bg-background">
        {({ open }) => (
          <>
            <div className="mx-auto  px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-14 w-auto lg:hidden"
                      src="https://res.cloudinary.com/dde8ngtcq/image/upload/v1695356446/iu7lh1c5dxivfoekjjwj.png"
                      alt="My Company"
                    />
                    <Link to={"/"}>
                      <img
                        className="hidden h-14 w-auto lg:block"
                        src="https://res.cloudinary.com/dde8ngtcq/image/upload/v1695356446/iu7lh1c5dxivfoekjjwj.png"
                        alt="My Company"
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-buttonPurple text-white"
                            : "text-black hover:bg-buttonPurple hover:text-white",
                          "rounded-xl  px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default CommonHeader;
