import React, { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/login";
import LayoutIndex from "./layouts/Index";
import ViewIndex from "./views/index";
import WordIndex from "./views/word/Index";
import CourseIndex from "./views/course/index";
import CourseIntroVideo from "./views/course/course_intro_video/CourseIntroVideo";
import CourseIntroCueVideo from "./views/course/course_intro_cue_video/CourseIntroCueVideo";
import ContentIndex from "./views/content/index";
import PageNotFound from "./views/PageNotFound";
import CourseMixedVideo from "./views/course/course_mixed_video/CourseMixedVideo";
import CourseMixedVideoCue from "./views/course/course_mixed_video_cue/CourseMixedVideoCue";

import CourseMixedVideoCueWord from "./views/course/course_mixed_video_cue_word/CourseMixedVideoCueWord"

import Grammer from "./views/content/grammer/Grammer";
import GrammerStructure from "./views/content/grammer_structure/GrammerStructure";
import GrammerPattern from "./views/content/grammer_pattern/GrammerPattern";
import GrammerTableExample from "./views/content/grammar_table_example/GrammarTableExample";
import Writing from "./views/writing/writing";
import WritingVideo from "./views/writing/writingVideo";
import WritingVideoCue from "./views/writing/writingVideoCue";
import WritingVideoCueMissWord from "./views/writing/writingVideoCueMissWord";
import Listening from "./views/listening/listening"
import ListeningCue from "./views/listening/listeningCue"
import ListeningQuestion from "./views/listening/listeningQuestion"
import ListeningAnswer from "./views/listening/listeningAnswer"
import Reading from "./views/reading/reading"
import ReadingCue from "./views/reading/readingCue"
import ReadingCueWord from "./views/reading/readingCueWord"
import PPVContent from "./views/ppv/ppvContent"
import PPVContentMovie from "./views/ppv/ppvContentMovie"
import PPVContentMovieCue from "./views/ppv/ppvContentMovieCue"
import PPVContentMovieCueWord from "./views/ppv/ppvContentMovieCueWord"
import Conversation from "./views/conversation/conversation"
import ConversationCue from "./views/conversation/conversationCue"
import ConversationCueWord from "./views/conversation/conversationCueWord"


import "./App.css";
import "./css/index.css";
import "./css/layout.css";
import "./css/light-theme.css";
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
  const [courseIds, setCourseIds] = useState({
    introVideoId: null,
    mixedVideoId: null,
    mixedVideoCueId : null,
    grammarId : null,
    writingId : null,
    writingVideoId : null,
    writingVideoCueId : null,
    listeningId : null,
    listeningCueId : null,
    listeningQuestionId : null,
    readingId : null,
    readingCueId :null,
    ppvContentId : null,
    ppvContentMovieId : null,
    ppvContentMovieCueId : null,
    conversationId : null,
    conversationCueId : null,
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
              {/* -------------------------------------------- WORD -------------------------------------------- */}
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
              {/* -------------------------------------------- CONTENT -------------------------------------------- */}
              <Route path="/content" element={<ContentIndex />} />
              <Route
                path="/content/grammer"
                element={
                  <Grammer
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/grammer-structure"
                element={
                  <GrammerStructure
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/grammer-pattern"
                element={
                  <GrammerPattern
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/grammer-table-example"
                element={
                  <GrammerTableExample
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/writing"
                element={
                  <Writing
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
               <Route
                path="/content/writing-video"
                element={
                  <WritingVideo
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
               <Route
                path="/content/writing-video-cue"
                element={
                  <WritingVideoCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/writing-video-cue-miss-word"
                element={
                  <WritingVideoCueMissWord
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/listening"
                element={
                  <Listening
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/listening-cue"
                element={
                  <ListeningCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/listening-question"
                element={
                  <ListeningQuestion
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/listening-answer"
                element={
                  <ListeningAnswer
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/reading"
                element={
                  <Reading
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/reading-cue"
                element={
                  <ReadingCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/content/reading-cue-word"
                element={
                  <ReadingCueWord
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              {/* -------------------------------------------- COURSE -------------------------------------------- */}
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
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
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
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
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
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
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
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/course/mixed-video-cue-word"
                element={
                  <CourseMixedVideoCueWord
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/ppv/content"
                element={
                  <PPVContent
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/ppv/content-movie"
                element={
                  <PPVContentMovie
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/ppv/content-movie-cue"
                element={
                  <PPVContentMovieCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/ppv/content-movie-cue-word"
                element={
                  <PPVContentMovieCueWord
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/conversation"
                element={
                  <Conversation
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/conversation-cue"
                element={
                  <ConversationCue
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
                  />
                }
              />
              <Route
                path="/conversation-cue-word"
                element={
                  <ConversationCueWord
                    userData={userData}
                    setUserData={setUserData}
                    loader={loader}
                    setLoader={setLoader}
                    courseIds={courseIds}
                    setCourseIds={setCourseIds}
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
