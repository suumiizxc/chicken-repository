import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.medlegten.com";

// ----------------------------------------- START INTRO VIDEO  -----------------------------------------
// ----------------------------------------- GET All intro video -----------------------------------------
export function getAllIntoVideo(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-intro-video/all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- POST Insert intro video -----------------------------------------
export function insertIntoVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-intro-video/insert",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- DELETE Delete intro video -----------------------------------------
export function deleteIntoVideoAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-intro-video/delete/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- PUT Update intro video -----------------------------------------
export function updateIntoVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-intro-video/update",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- POST Insert intro CUE video -----------------------------------------
export function insertIntoCueVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-intro-video-cue/insert-many",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- START COURSE INTRO VIDEO CUE  -----------------------------------------
// ----------------------------------------- GET All intro CUE video -----------------------------------------
export function getAllIntoCueVideo(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-intro-video-cue/profile-by-intro-video-id/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- DELETE Delete intro CUE video -----------------------------------------
export function deleteIntoCueVideoAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-intro-video-cue/delete/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- PUT Update intro CUE video -----------------------------------------
export function updateIntoVideoCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-intro-video-cue/update",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- START COURSE MIXED VIDEO  -----------------------------------------
// ----------------------------------------- GET All MIXED video -----------------------------------------
export function getAllMixedVideoAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-mixed-video/all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- DELETE Delete MIXED video -----------------------------------------
export function deleteMixedVideoAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-mixed-video/delete/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}




// ----------------------------------------- PUT Update MIXED video -----------------------------------------
export function updateMixedVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-mixed-video/update",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- POST Insert MIXED video -----------------------------------------
export function insertMixedVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-mixed-video/insert",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}


// ----------------------------------------- POST Insert intro video CUE word -----------------------------------------
export function insertIntoVideoCueWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-intro-video-cue-word/insert-many",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getIntroVideoCueWordsAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-intro-video-cue-word/profile-by-cue-id/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function deleteIntroVideoCueWordsAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-intro-video-cue-word/delete-by-cue-id/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}


// ----------------------------------------- START COURSE MIXED VIDEO "CUE"  -----------------------------------------
// ----------------------------------------- GET All MIXED video "CUE" -----------------------------------------
export function getAllMixedVideCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-mixed-video-cue/profile-by-intro-video-id/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- DELETE Delete MIXED video "CUE"-----------------------------------------
export function deleteMixedVideoCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-mixed-video-cue/delete/" + id,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- PUT Update MIXED video "CUE" -----------------------------------------
export function updateMixedVideoCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-mixed-video-cue/update",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- POST Insert MIXED video "CUE" -----------------------------------------
export function insertMixedVideoCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-mixed-video-cue/insert-many",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
