import React from "react";
import { Layout, Menu } from "antd";
import Logo from "./svgs/LogoV3.svg";
import NavBarIcon from "./svgs/WTAcut.svg";
import Link from "next/link";

const { Header } = Layout;
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
    name: "Departures",
    url: "/departures"
  }
];

const NavigationBar = () => {
  const items = navEnum.map((item, index) => ({
    label: <Link href={item.url}>{item.name}</Link>,
    key: index
  }));

  return (
    <Header className="flex items-center justify-between p-0 bg-white">
      <div className="h-full py-2 mx-4 w-min-content header-logo">
        <Logo className="w-full h-full" />
      </div>
      <Menu
        className="justify-end flex-auto min-w-0"
        items={items}
        mode="horizontal"
        expandIcon={<NavBarIcon />}
      />
    </Header>
  );
};

export default NavigationBar;
