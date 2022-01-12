import React, { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import LayoutIndex from "./layouts/Index";
import ViewIndex from "./views/index";
import WordIndex from "./views/word";
import CourseIndex from "./views/course/index";
import CourseIntroVideo from "./views/course/course_intro_video/CourseIntroVideo";
import CourseIntroCueVideo from "./views/course/course_intro_cue_video/CourseIntroCueVideo";
import ContentIndex from "./views/content/index";
import PageNotFound from "./views/PageNotFound";

import "./App.css";
import "./css/index.css";
import "./css/layout.css";
import "./css/light-theme.css";
import CourseMixedVideo from "./views/course/course_mixed_video/CourseMixedVideo";
import CourseMixedVideoCue from "./views/course/course_mixed_video_cue/CourseMixedVideoCue";

function App() {
  const [loader, setLoader] = useState(false);
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
            <Route
              path="/"
              element={
                userData.token ? (
                  <LayoutIndex userData={userData} setUserData={setUserData} />
                ) : (
                  <Login
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    tok
                  />
                )
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
              />
              <Route path="/content" element={<ContentIndex />} />
              <Route
                path="/login"
                element={
                  <Login
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
              <Route
                path="/course"
                element={
                  <CourseIndex
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
              <Route
                path="/course/intro-video"
                element={
                  <CourseIntroVideo
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
              <Route
                path="/course/intro-cue-video"
                element={
                  <CourseIntroCueVideo
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
              <Route
                path="/course/mixed-video"
                element={
                  <CourseMixedVideo
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
              <Route
                path="/course/mixed-video-cue"
                element={
                  <CourseMixedVideoCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                  />
                }
              />
            </Route>

            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
