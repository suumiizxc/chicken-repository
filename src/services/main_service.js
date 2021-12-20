import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.medlegten.com";

// ----------------------------------------- Login Auth -----------------------------------------
export function authLogin(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/tb-sys-user/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// ----------------------------------------- Word module get all -----------------------------------------
export function getWords(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/all",
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
// ----------------------------------------- Word module insert  -----------------------------------------
export function insertWord(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/dt-word/insert",
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

// ----------------------------------------- Word module update  -----------------------------------------
export function updateWord(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/dt-word/update",
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
