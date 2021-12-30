import React, { useEffect } from "react";
import { Button, Form, Input, Divider, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { authLogin } from "../services/Main_service";

// import { authLogin } from "services/MainService";

export const LoginForm = (props) => {
  const { showForgetPassword, onForgetPasswordClick } = props;

  const initialCredential = {
    email: "contentmaker4@gmail.com",
    password: "mongol",
  };

  const onFailed = () => {
    message.error("Нэвтрэх нэр эсвэл нууц үг буруу байна");
  };

  const onLogin = (values) => {
    props.setLoader(true);
    authLogin(values)
      .then((res) => {
        props.setLoader(false);
        if (res && res.data && res.data.status && res.data.status === true) {
          //success
          console.log("login success");
          console.log("res.data.data", res.data.data);
          props.setUserData(res.data.data);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user_id", res.data.data.id);
          message.success("Амжилттай нэттэрлээ");

          // ------------------------------------------------------------

          // localStorage.clear();
          // props.setUserData({ ...props.userData, props.userData });
        } else {
          //unsuccessful
          console.log("login unsuccessfully");
        }
        console.log("values", values);
      })
      .catch((e) => {
        //unsuccessful
        props.setLoader(false);
        console.log("login catch erro", e);
      });
    console.log("userData", props.userData);
  };

  useEffect(() => {
    // if (token !== null && allowRedirect) {
    //   history.push(redirect);
    // }
    // if (showMessage) {
    //   setTimeout(() => {
    //     hideAuthMessage();
    //   }, 3000);
    // }
    console.log("props state", props.state);
    console.log("login useEffect");
    console.log("user date", props.userData);
  });

  const renderOtherSignIn = (
    <div>
      <Divider>
        <span className="text-muted font-size-base font-weight-normal">
          Тавтай морилно уу
        </span>
      </Divider>
    </div>
  );

  return (
    <>
      <Form
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={onLogin}
        onFinishFailed={onFailed}
      >
        <Form.Item
          name="email"
          label="И-мэйл"
          rules={[
            {
              required: true,
              message: "Та и-мэйл хаягаа оруулна уу",
            },
            {
              type: "email",
              message: "И-мэйл хаяг буруу байна!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={`${
                showForgetPassword
                  ? "d-flex justify-content-between w-100 align-items-center"
                  : ""
              }`}
            >
              <span>Нууц үг</span>
              {showForgetPassword && (
                <span
                  onClick={() => onForgetPasswordClick}
                  className="cursor-pointer font-size-sm font-weight-normal text-muted"
                >
                  Нууц үг мартсан
                </span>
              )}
            </div>
          }
          rules={[
            {
              required: true,
              message: "Та нууц үгээ оруулна уу",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Нэвтрэх
          </Button>
        </Form.Item>
        {renderOtherSignIn}
      </Form>
    </>
  );
};

export default LoginForm;
