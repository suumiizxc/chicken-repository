import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.medlegten.com";

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

export function getWords(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

// export function authRegister(data) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "post",
//       url: url + "юapi/tb-sys-user/auth/register",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     })
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// }
