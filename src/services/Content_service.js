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

// ----------------------------------------- Delete  GRAMMER EXAMPLE -----------------------------------------

export function deleteGrammarTableExampleByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-grammar-table-example/delete/" + id,
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
// ----------------------------------------- Update  GRAMMER EXAMPLE -----------------------------------------

export function updateGrammarTableExampleByGrammarIDAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-grammar-table-example/update",
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

// ----------------------------------------- POST insert GRAMMER EXAMPLE PATTERN -----------------------------------------

export function insertGrammarTableExamplePatternAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-grammar-table-example-pattern/insert-many",
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

// ----------------------------------------- GET get GRAMMER EXAMPLE PATTERN -----------------------------------------

export function getGrammarTableExamplePatternByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-grammar-table-example-pattern/profile-by-grammar-id/" + id,
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

// ----------------------------------------- Delete del GRAMMER EXAMPLE PATTERNs -----------------------------------------

export function deleteGrammarTableExamplePatternByGrammarIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-grammar-table-example-pattern/delete-by-grammar-id/" + id,
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

// ----------------------------------------- GET ALL WRITING -----------------------------------------

export function getAllWritingAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-writing/all",
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

// ----------------------------------------- POST INSERT WRITING -----------------------------------------

export function insertWritingAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-writing/insert",
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

// ----------------------------------------- PUT UPDATE WRITING -----------------------------------------

export function updateWritingAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-writing/update",
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

// ----------------------------------------- DELETE DELETE WRITING -----------------------------------------

export function deleteWritingAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-writing/delete/" + id,
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



// ----------------------------------------- GET ALL WRITING VIDEO-----------------------------------------

export function getAllWritingVideoByWIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-writing-video/profile-by-writing/" + id,
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

export function insertWritingVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-writing-video/insert",
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

export function deleteWritingVideoAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-writing-video/delete/" + id,
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

export function updateWritingVideoAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-writing-video/update",
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