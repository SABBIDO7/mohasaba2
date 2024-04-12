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
          <div>
            <div className=" w-screen absolute text-center font-bold text-2xl h-14 justify-center flex flex-col text-BgTextColor">
              <div>{props.compname.toUpperCase()}</div>
            </div>

            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 max-h-14">
              <div className="relative flex h-14 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white hover:text-BgTextColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-BgTextColor">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex  sm:space-x-1 md:space-x-1 lg:space-x-4 xl:space-x-5">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          id={item.name}
                          aria-hidden="true"
                          className={({ isActive }) => {
                            return (
                              "px-3 py-2 rounded-md text-sm font-bold no-underline " +
                              (isActive
                                ? "bg-BgTextColor text-third"
                                : "text-BgTextColor font-bold hover:bg-BgTextColor hover:text-third")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 not-italic text-BgTextColor font-bold">
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title={props.name}
                    menuVariant="BgTextColor"
                  >
                    <NavDropdown.Item
                      className=" items-center "
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Main Menu
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className=" items-center "
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
                        "block px-3 py-2 rounded-md text-base font-bold no-underline " +
                        (isActive
                          ? "bg-BgTextColor text-third"
                          : "text-BgTextColor font-bold hover:bg-BgTextColor hover:text-third")
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
