import React from "react";
import { PageHeader, Button, Descriptions, Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";

export default function Head_nav(props) {
  let navigate = useNavigate();

  const style = {
    // padding: "24px",
    backgroundColor: "#f5f5f5",
  };

  const logout = () => {
    localStorage.removeItem("token");
    props.setUserData({
      ...props.userData,
      token: localStorage.getItem("token"),
    });
    props.userData.token ? navigate("/login") : <></>;
  };
  return (
    <div style={style}>
      <PageHeader
        ghost={false}
        // onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="1" size="small">
            Тохиргоо
          </Button>,
          <Button key="2" size="small" type="primary" onClick={logout}>
            Гарах
          </Button>,
        ]}
      ></PageHeader>
      {/* <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application Center</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Application List</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb> */}
    </div>
  );
}
