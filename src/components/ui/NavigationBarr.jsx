import Link from "next/link";
import React from "react";
import Logo from "./svgs/WTAcut.svg";

const navEnum = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Preferences",
    url: "/preferences"
  },
  {
    name: "Maps",
    url: "/mapss"
  }
];

const NavigationBar = () => {
  const mapElements = navEnum.map((item, index) => ({
    label: <Link href={item.url}>{item.name}</Link>
    key: index
  }
  ));

  return (
    <div className="navbar bg-base-100">
      <div className="flex navbar-start">
        <div className="text-xl normal-case w-28 btn btn-ghost">
          {/* <Logo className="w-full h-full" /> */}
        </div>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">{mapElements}</ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="absolute z-50 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {mapElements}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
