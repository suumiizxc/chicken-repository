import React from "react";
import { Card } from "antd";

export default function CardLarge(props) {
  return (
    <Card
      title={props.title}
      bordered={false}
      style={{ margin: 15, width: "100%" }}
    />
  );
}
