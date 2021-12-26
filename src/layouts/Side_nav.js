import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  CalendarOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;

export default function Side_nav() {
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log("click ", e);
  };
  const toggleCollapsed = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const onNavigate = () => {
    navigate("/word");
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            padding: "14px 24px 14px 24px",
          }}
        >
          <div>
            {collapse ? (
              <></>
            ) : (
              <img
                className="img-fluid"
                src={"/img/logo/medlegten_logo.svg"}
                alt="medlgeten app logo"
                width="100%"
              />
            )}
          </div>
          <Button type="primary" size="small" onClick={toggleCollapsed}>
            {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Menu.Item key="1" icon={<MailOutlined />} onClick={onNavigate}>
          {"Үгсийн сан"}
        </Menu.Item>
        <Menu.Item key="2" icon={<CalendarOutlined />}>
          {"Курс"}
        </Menu.Item>
        <SubMenu key="3" icon={<MailOutlined />} title="Coming soon">
          <Menu.ItemGroup key="3.1" title="Item 1">
            <Menu.Item key="3.1.1">{"Coming soon"}</Menu.Item>
            <Menu.Item key="3.1.2">{"Coming soon"}</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}
