import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  CalendarOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import HeadNav from "./Head_nav";
import SideNav from "./Side_nav";
import Footer from "./Footer";

const { SubMenu } = Menu;

export default function Index(props) {
  const [collapse, setCollapse] = useState(false);

  const handleClick = (e) => {
    console.log("click ", e);
  };
  const toggleCollapsed = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <>
      <HeadNav userData={props.userData} setUserData={props.setUserData} />
      <div style={{ display: "flex", backgroundColor: "#fafafb" }}>
        <SideNav />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
