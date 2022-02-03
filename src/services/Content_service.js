import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.medlegten.com";

// ----------------------------------------- START GRAMMER  -----------------------------------------
// ----------------------------------------- GET All GRAMMER -----------------------------------------
export function getAllGrammerAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-grammar/all",
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

// ----------------------------------------- POST Insert GRAMMER -----------------------------------------
export function insertIntoGrammerAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-grammar/insert",
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

// ----------------------------------------- DELETE Delete GRAMMER -----------------------------------------
export function deleteGrammerAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-grammar/delete/" + id,
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

// ----------------------------------------- PUT Update GRAMMER -----------------------------------------
export function updateGrammerAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-grammar/update",
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


// ----------------------------------------- GET All GRAMMER PATTERN-----------------------------------------
export function getAllGrammerPatternAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-grammar-pattern/all",
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

// ----------------------------------------- POST Insert GRAMMER STRUCTURE-----------------------------------------
export function insertIntoGrammerStructureAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-grammar-structure/insert-many",
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


// ----------------------------------------- POST get GRAMMER STRUCTURE by grammar id-----------------------------------------
export function getIntoGrammerStructureByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-grammar-structure/profile-by-grammar-id/" + id,
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

// ----------------------------------------- POST delete GRAMMER STRUCTURE by grammar id-----------------------------------------
export function deleteIntoGrammerStructureByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-grammar-structure/delete-by-grammar-id/" + id,
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

// ----------------------------------------- POST insert GRAMMER EXAMPLE -----------------------------------------

export function insertGrammarTableExampleAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-grammar-table-example/insert",
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

// ----------------------------------------- GET  GRAMMER EXAMPLE -----------------------------------------

export function getGrammarTableExampleByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-grammar-table-example/profile-by-grammar-id/" + id,
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