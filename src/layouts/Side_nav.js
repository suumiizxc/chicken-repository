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
import Footer from "./Footer";

const { SubMenu } = Menu;

export default function Side_nav() {
  const [collapse, setCollapse] = useState(false);

  const handleClick = (e) => {
    console.log("click ", e);
  };
  const toggleCollapsed = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <div style={{ width: !collapse ? "18%" : "auto" }}>
      <Menu
        onClick={handleClick}
        style={{ height: "100vh" }}
        defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapse}
      >
        <Button
          type="primary"
          size="small"
          onClick={toggleCollapsed}
          style={{ margin: 16 }}
        >
          {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu.Item key="1" icon={<MailOutlined />}>
          {"Үгсийн сан"}
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          {"Курс"}
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="Coming soon">
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">{"Coming soon"}</Menu.Item>
            <Menu.Item key="2">{"Coming soon"}</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">{"Coming soon"}</Menu.Item>
            <Menu.Item key="4">{"Coming soon"}</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title={"Coming soon"}>
          <Menu.Item key="5">{"Coming soon"}</Menu.Item>
          <Menu.Item key="6">{"Coming soon"}</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">{"Coming soon"}</Menu.Item>
            <Menu.Item key="8">{"Coming soon"}</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
  );
}
