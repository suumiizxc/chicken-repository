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
