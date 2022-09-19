import React, { useState } from "react";
import { Button, Menu } from "antd";
import {
  BankOutlined,
  BarsOutlined,
  BookOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SoundOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";

const { SubMenu } = Menu;

export default function Side_nav() {
  const [collapse, setCollapse] = useState(true);
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.key === "3.1") {
      navigate("/course/intro-video");
    } else if (e.key === "3.2") {
      navigate("/course/mixed-video");
    } else if (e.key === "2.1") {
      navigate("/content/grammer");
    } else if (e.key === "2.2") {
      navigate("/content/writing");
    } else if (e.key === "2.3") {
      navigate("/content/listening");
    } else if (e.key === "2.4") {
      navigate("/content/reading");
    } else if (e.key === "2.5") {
      navigate("/ppv/content");
    }
    else if (e.key === "2.6") {
      navigate("/conversation");
    }
    else if (e.key === "2.7") {
      navigate("/article")
    }
    else if(e.key === "4"){
      navigate("/users")
    }
    else if(e.key === "5.1"){
      navigate("/hw_listening")
    }
    else if(e.key === "5.2"){
      navigate("/hw_listening_character")
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
          <Menu.Item key="2.4">{"Reading"}</Menu.Item>
          <Menu.Item key="2.5">{"PPV"}</Menu.Item>
          <Menu.Item key="2.6">{"Conversation"}</Menu.Item>
          <Menu.Item key="2.7">{"Article"}</Menu.Item>
        </SubMenu>
        <SubMenu key="3" icon={<MailOutlined />} title="Курс">
          {/* <Menu.ItemGroup key="3.1" title="Курс"> */}
          <Menu.Item key="3.1">{"Интро видео"}</Menu.Item>
          <Menu.Item key="3.2">{"Mixed видео"}</Menu.Item>
          {/* </Menu.ItemGroup> */}
        </SubMenu>
        <MenuItem key="4" icon={<UserOutlined/>} title="Хэрэглэгчид">
          {"Хэрэглэгчид"}
        </MenuItem>
        <SubMenu key="5" icon={<BookOutlined/>} title="Сонсгол шалгах">
        <MenuItem key="5.1" icon={<SoundOutlined/>} title="Сонсгол">
          {"Сонсгол"}
        </MenuItem>
        <MenuItem key="5.2" icon={<UserOutlined/>} title={"Дүрүүд"}>
          {"Дүрүүд"}
        </MenuItem>
        </SubMenu>
        {/* <MenuItem key="5"icon={<TeamOutlined/>}>{"Үйлчлүүлэгчид"}</MenuItem> */}
      </Menu>
    </div>
  );
}
