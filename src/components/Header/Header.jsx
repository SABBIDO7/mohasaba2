import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCookies } from "react-cookie";
import { Location } from "react-router-dom";

const navigation = [
  { name: "Accounting", href: "/Accounting" },
  { name: "Inventory", href: "/Inventory" },
  { name: "Transactions", href: "/Invoice" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const [cookies, setCookie] = useCookies(["token"]);
  const location = useLocation();
  return (
    <>
      <Disclosure as="nav" className="bg-slate-700 navBar ease-linear">
        {({ open }) => (
          <div class="navDiv">
            <div className=" flex h-14 items-center justify-start  w-[47%] ">
              <div className=" flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white hover:text-BgTextColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-BgTextColor">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex  items-center justify-start sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-1 sm:block">
                  <div className="flex  sm:space-x-1 md:space-x-1 lg:space-x-4 xl:space-x-5">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        id={item.name}
                        aria-hidden="true"
                        className={({ isActive }) => {
                          return (
                            "px-3 py-2 rounded-md text-sm  no-underline " +
                            (isActive
                              ? "bg-BgTextColor text-third  hover:text-third"
                              : "text-BgTextColor hover:bg-BgTextColor hover:text-third")
                          );
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="navCompCombo">
              <div className="  text-center font-bold text-2xl flex  justify-start  items-center w-1/2  text-BgTextColor  compnameStyle">
                <div>{props.compname.toUpperCase()}</div>
              </div>
              <div className=" flex flex-end items-center justify-end w-1/2 mr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 not-italic text-BgTextColor ">
                <NavDropdown
                  id="MainNav-dropdown"
                  title={props.name}
                  menuVariant="BgTextColor"
                >
                  <NavDropdown.Item
                    className=" navbarContent"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Main Menu
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className=" navbarContent "
                    onClick={() => {
                      setCookie("token", "", {
                        path: "/",
                      });
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  >
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-hidden="true"
                    onClick={() => {
                      document
                        .getElementById("headlessui-disclosure-button-:r0:")
                        .click();
                    }}
                    /*className={classNames(
                  item.current
                    ? "no-underline "
                    : "no-underline ",
                  "px-3 py-2 rounded-md text-sm font-medium"
                )}*/
                    className={({ isActive }) => {
                      return (
                        "block px-3 py-2 rounded-md text-base no-underline" +
                        (isActive
                          ? "bg-BgTextColor text-third hover:text-third"
                          : "text-BgTextColor hover:bg-BgTextColor hover:text-third")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <div>{props.children}</div>
    </>
  );
}
