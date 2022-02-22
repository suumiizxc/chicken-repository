import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  BankOutlined,
  BarsOutlined,
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
    if (e.key === "3.1") {
      navigate("/course/intro-video");
    } else if (e.key === "3.2") {
      navigate("/course/mixed-video");
    } else if (e.key === "2.1") {
      navigate("/content/grammer");
    } else if (e.key === "2.2") {
      navigate("/content/writing");
    } 
    else if (e.key === "2.3") {
      navigate("/content/listening");
    }
  };
  const toggleCollapsed = () => {
    collapse ? setCollapse(false) : setCollapse(true);
  };

  const onNavigate = (a) => {
    console.log("navigate a ", a);
    navigate("/word");
  };

  return (
    <div style={{ width: !collapse ? "18%" : "auto" }}>
      <Menu
        onClick={handleClick}
        style={{ height: "100%" }}
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
        <Menu.Item key="1" icon={<BarsOutlined />} onClick={onNavigate}>
          {"Үгсийн сан"}
        </Menu.Item>
        <SubMenu key="2" icon={<BankOutlined />} title="Контент">
          <Menu.Item key="2.1">{"Дүрэм"}</Menu.Item>
          <Menu.Item key="2.2">{"Writing"}</Menu.Item>
          <Menu.Item key="2.3">{"Listening"}</Menu.Item>
        </SubMenu>
        <SubMenu key="3" icon={<MailOutlined />} title="Курс">
          {/* <Menu.ItemGroup key="3.1" title="Курс"> */}
          <Menu.Item key="3.1">{"Интро видео"}</Menu.Item>
          <Menu.Item key="3.2">{"Mixed видео"}</Menu.Item>
          {/* </Menu.ItemGroup> */}
        </SubMenu>
        <SubMenu key="4" icon={<MailOutlined />} title="Coming soon">
          <Menu.ItemGroup key="4.1" title="Item 1">
            <Menu.Item key="4.1.1">{"Coming soon"}</Menu.Item>
            <Menu.Item key="4.1.2">{"Coming soon"}</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}
