import React from "react";
import { Outlet } from "react-router-dom";
import HeadNav from "./Head_nav";
import SideNav from "./Side_nav";
import Footer from "./Footer";

export default function Index(props) {
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
