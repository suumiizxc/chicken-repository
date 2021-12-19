import React, { useEffect, useState } from "react";
import { Spin, Menu, Layout } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./auth/login";
import LayoutIndex from "./layouts/Index";
import ViewIndex from "./views/index";
import WordIndex from "./views/word/Index";
import ContentIndex from "./views/content/index";

import "./App.css";
import "./css/index.css";
import "./css/layout.css";
import "./css/light-theme.css";

function App() {
  const { SubMenu } = Menu;

  const [loader, setLoader] = useState();
  // const [token, setToken] = useState(null);

  const [userData, setUserData] = useState({
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    token: localStorage.getItem("token"),
    role_id: null,
    created_date: null,
    created_user_id: null,
    organization_id: null,
    is_active: 1,
  });

  const [wordData, setWordData] = useState({
    id: null,
    language_id: null,
    word: null,
    root_word_id: null,
    type_id: null,
    created_by: null,
    created_date: null,
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

  //Loader css
  const loaderCss = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {loader ? (
        <Spin indicator={antIcon} style={loaderCss} />
      ) : (
        <BrowserRouter>
          <Routes>
            {userData.token ? (
              <Route
                path="/"
                element={
                  <LayoutIndex userData={userData} setUserData={setUserData} />
                }
              >
                <Route index element={<ViewIndex />}></Route>
                <Route
                  path="/word"
                  element={
                    <WordIndex
                      userData={userData}
                      setUserData={setUserData}
                      loader={loader}
                      setLoader={setLoader}
                    />
                  }
                ></Route>
                <Route path="/content" element={<ContentIndex />}></Route>
              </Route>
            ) : (
              <></>
            )}
            <Route
              path="/login"
              element={
                <Login
                  userData={userData}
                  setUserData={setUserData}
                  loader={loader}
                  setLoader={setLoader}
                  tok
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
