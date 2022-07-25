import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.lingos.mn";

// ----------------------------------------- Login Auth -----------------------------------------
export function authLogin(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/tb-sys-user/auth/login",
      headers: {
        "Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function RegisterNewUser(data, token){
    return new Promise((resolve, reject) =>{
        axios({
            method: "post",
            url: url + "/api/tb-sys-user/auth/register",
            headers:{
                "Content-Type": "application/json",
                //"Access-Control-Allow-Origin":"*"
                "Authorization": token
            },
            data: data,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}