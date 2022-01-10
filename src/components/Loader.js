import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export default function Loader(props) {
  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} />;

  return (
    <Spin
      tip=""
      spinning={props.loader}
      indicator={antIcon}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-5.5rem",
      }}
    />
  );
}
