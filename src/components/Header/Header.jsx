import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useCookies } from "react-cookie";

const navigation = [
    { name: "Accounting", href: "/Accounting" },
    { name: "Inventory", href: "/Inventory" },
    { name: "Invoice", href: "/Invoice" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
    const [cookies, setCookie] = useCookies(["token"]);

    return (
        <>
            <Disclosure as="nav" className="bg-slate-700 navBar ease-linear">
                {({ open }) => (
                    <>
                        <div className=" w-screen absolute text-center font-semibold text-2xl h-14 justify-center flex flex-col text-black">
                            <div>{props.compname.toUpperCase()}</div>
                        </div>

                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 max-h-14">
                            <div className="relative flex h-14 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    id={item.name}
                                                    aria-hidden="true"
                                                    className={({ isActive }) => {
                                                        return (
                                                            "px-3 py-2 rounded-md text-sm font-medium no-underline " +
                                                            (isActive
                                                                ? "bg-gray-900 text-white"
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white")
                                                        );
                                                    }}>
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 not-italic text-white ">
                                    <NavDropdown
                                        id="nav-dropdown-dark-example"
                                        title={props.name}
                                        menuVariant="dark">
                                        <NavDropdown.Item
                                            className=" items-center "
                                            onClick={() => {
                                                window.location.href = props.url;
                                            }}>
                                            Main Menu
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            className=" items-center "
                                            onClick={() => {
                                                setCookie("token", "", {
                                                    path: "/",
                                                });
                                                             localStorage.removeItem("username");
          localStorage.removeItem("token");
localStorage.removeItem("password");                                             localStorage.removeItem("compname");
                                                window.location.href = props.url;
                                            }}>
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
                                                "block px-3 py-2 rounded-md text-base font-medium no-underline " +
                                                (isActive
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white")
                                            );
                                        }}>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <div>{props.children}</div>
        </>
    );
}
