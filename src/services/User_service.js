import axios from "axios"

const url = "https://adminback.medlegten.com";

export function getAllUsers(token, isActive){
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: url + "/api/tb-sys-user/all/" + (isActive ? "1":"0"),
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

export function UpdateUser(data, token, id){
    console.log(data)
    console.log(id)
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: url + "/api/tb-sys-user/update/"+id,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            data: data
        })
        .then((res) => {
            console.log(res)
            resolve(res)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        });
    });
}

export function DeleteUser(userID, token){
    return new Promise((resolve, reject) => {
        axios({
            method: "delete",
            url: url + "/api/tb-sys-user/delete/"+userID,
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}