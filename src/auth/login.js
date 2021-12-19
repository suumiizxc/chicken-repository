import React, { useEffect, useState } from "react";
import LoginForm from "./login_form";
import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
const backgroundStyle = {
  backgroundImage: "url(/img/others/img-17.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "220% !important",
};

const Login = (props) => {
  const id = false;
  let navigate = useNavigate();

  useEffect(() => {
    props.userData.token ? navigate("/word") : <></>;
    console.log("login index useEffect");
  }, [props.userData]);

  return (
    <div className="h-100" style={backgroundStyle}>
      <div
        className="container d-flex flex-column justify-content-center h-100"
        style={{}}
      >
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={"/img/logo/medlegten_logo.svg"}
                    alt="medlgeten app logo"
                  />
                  <p
                    style={{
                      marginTop: "16px",
                      fontWeight: "bold",
                      color: "#1a3353",
                    }}
                  >
                    МЭДЛЭГТЭН
                  </p>
                  <p>
                    Та бүртгүүлэх үү? <a href="/auth/register-1">Бүртгүүлэх</a>
                  </p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <LoginForm {...props} />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
