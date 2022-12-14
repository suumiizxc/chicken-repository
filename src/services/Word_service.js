import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.lingos.mn";

// ----------------------------------------- Word module get all -----------------------------------------
export function getWords(token, page, limit) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      params : {
        page : page,
        limit : limit,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

var localUrl = "http://localhost:8081"

export function getFindWords(string,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/find-by-text/" + string,
      headers: {
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: "",
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function GetWordsByTranslation(string, token){
  return new Promise((resolve, reject)=>{
    axios({
      method:"get",
      url: url + "/api/dt-word/search-by-translation/"+string,
      headers:{
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

// ----------------------------------------- Word module word-transaltion get id  -----------------------------------------
export function getWordsId(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/profile-with-word-translation/" + id,
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
export function insertWordTransalation(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/dt-word/insert-with-word-translation",
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
export function updateWordTranslation(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/dt-word/update-with-word-translation",
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

// ----------------------------------------- Word module delete  -----------------------------------------
export function deleteWordTranslation(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/dt-word/delete-with-word-translation/" + id,
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

// ----------------------------------------- Word module types  -----------------------------------------
export function getTypesWord(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word-types/all",
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

// ----------------------------------------- Word module all_language  -----------------------------------------
export function getLanguageWord(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",

      url: url + "/api/dt-language/all",
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

// ----------------------------------------- Word module find root_word get -----------------------------------------
export function findRootWord(word, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/find-by-text/" + word,
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

// ----------------------------------------- Word module translation_types insert -----------------------------------------
export function getTranslation(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word-translation/all",
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

// ----------------------------------------- Word module translation_types insert -----------------------------------------
export function insertTranslation(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/dt-word-translation/insert-many",
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

// ----------------------------------------- Word module translation_types all delete -----------------------------------------
// export function deleteTranslationTypes(id, token) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "delete",
//       url: url + "/api/dt-word-translation-types/delete/" + id,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       data: "",
//     })
//       .then((res) => resolve(res))
//       .catch((err) => reject(err));
//   });
// }

// ----------------------------------------- Word module translation_types update -----------------------------------------
export function updateTranslation(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/dt-word-translation/update-many",
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
//var localUrl = "http://localhost:8081"
export function getOnlyWords(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/dt-word/all/only-words",
      headers:{
        "Content-Type": "application/json",
        Authorization: token
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}