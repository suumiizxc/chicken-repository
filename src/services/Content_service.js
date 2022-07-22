import axios from "axios";
// const url = "http://122.201.30.39:8080";
const url = "https://adminback.medlegten.com";
// const url = "http://172.20.176.1:8081";
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

// ----------------------------------------- GET ALL WRITING VIDEO CUE-----------------------------------------

export function getAllWritingVideoCueByVIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-writing-video-cue/profile-by-video-id/" + id,
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

export function updateWritingVideoCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-writing-video-cue/update",
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

export function insertWritingVideoCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-writing-video-cue/insert",
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

export function deleteWritingVideoCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-writing-video-cue/delete/" + id,
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

export function getAllWritingVideoCueMissWordByCIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-writing-video-cue-missword/profile-by-cue-id/" + id,
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

export function insertWritingVideoCueMissWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-writing-video-cue-missword/insert",
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

export function deleteWritingVideoCueMissWordAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-writing-video-cue-missword/delete/" + id,
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

export function deleteWritingVideoCueMissWordByCueIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-writing-video-cue-missword/delete-by-cue-id/" + id,
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

export function updateWritingVideoCueMissWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-writing-video-cue-missword/update",
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


export function getAllListeningAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-listening/all",
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

export function insertListeningAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-listening/insert",
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

export function updateListeningAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-listening/update",
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

export function deleteListeningAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-listening/delete/" + id,
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

export function getAllListeningCueByListeningAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-listening-cue/profile-by-listening/" + id,
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

export function insertListeningCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-listening-cue/insert",
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

export function updateListeningCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-listening-cue/update",
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

export function deleteListeningCueVideoAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-listening-cue/delete/" + id,
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

export function getAllListeningQuestionByCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-listening-question/profile-by-cue/" + id,
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

export function insertListeningQuestionAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-listening-question/insert",
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

export function deleteListeningQuestionAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-listening-question/delete/" + id,
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

export function updateListeningQuestionAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-listening-question/update",
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


export function getAllListeningAnswerByQuestionAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-listening-answer/profile-by-question/" + id,
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

export function insertListeningAnswerAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-listening-answer/insert",
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

export function deleteListeningAnswerAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-listening-answer/delete/" + id,
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

export function updateListeningListeningAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-listening-answer/update",
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

export function getAllReadingAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-reading/all",
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

export function deleteReadingAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-reading/delete/" + id,
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

export function updateReadingAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-reading/update",
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

export function insertReadingAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-reading/insert",
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

export function getAllReadingCueByReadingAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-reading-cue/profile-by-reading-id/" + id,
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

export function insertReadingCueAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-reading-cue/insert",
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

export function updateReadingCueAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-reading-cue/update",
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

export function deleteReadingCueAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-reading-cue/delete/" +id,
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

export function getAllReadingCueWordByCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-reading-cue-word/profile-by-cue-id/" + id,
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

export function insertReadingCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-reading-cue-word/insert",
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

export function updateReadingCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-reading-cue-word/update",
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

export function deleteReadingCueWordAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-reading-cue-word/delete/" + id,
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

export function deleteReadingCueWordByCueIDAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-reading-cue-word/delete-by-cue-id/" + id,
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

const localUrl = "http://192.168.1.106:8081"

export function generatePPVVocabularyByMovieID(token, movie_id){
  return new Promise((resolve, reject) => {
    axios({
      method:"get",
      url: url + "/api/ppv-quiz/vocabulary/generate-by-movie-id/"+movie_id,
      headers:{
        "Authorization":token,
        "Content-Type": "application/json",
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function getWordsNotInDTWordByMovieID(token, movie_id){
  return new Promise((resolve, reject) => {
    axios({
      method:"get",
      url: url + "/api/ppv-quiz/vocabulary/get-words-not-in-dtword/"+movie_id,
      headers:{
        "Authorization":token,
        "Content-Type": "application/json",
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function getAllPPVCategory(token){
  return new Promise((resolve, reject) => {
    axios({
      method:"get",
      url: url + "/api/ppv-category/all",
      headers: {
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function getAllPPVLevel(token){
  return new Promise((resolve, reject) => {
    axios({
      method:"get",
      url: url + "/api/ppv-level/all",
      headers: {
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function getAllPPVContentAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content/all",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function getPPVContentByID(token, content_id){
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content/profile/"+content_id,
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function insertPPVContentAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-content/insert",
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

export function deletePPVContentAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-content/delete/" + id,
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

export function updatePPVContentAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-content/update",
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

export function getAllContentMovieByContentAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content-movie/profile-by-content/" + id,
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

export function getContenMovieByID(movie_id, token){
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content-movie/profile/"+movie_id,
      headers:{
        "Content-Type":"application/json",
        Authorization: token,
      }
    })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
  });
}

export function inserContentMovieAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-content-movie/insert",
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

export function deleteContentMovieAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-content-movie/delete/" + id,
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

export function updateContentMovieAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-content-movie/update",
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

export function getAllContentMovieCueByMovieAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content-movie-cue/profile-by-movie/" + id,
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

export function insertContentMovieCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-content-movie-cue/insert",
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

export function resetContentMovieCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-content-movie-cue/reset-by-movie/" + id,
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

export function updateContentMovieCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-content-movie-cue/update",
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

export function deleteContentMovieCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-content-movie-cue/delete/" + id,
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

export function getAllContentMovieCueWordByCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-content-movie-cue-word/profile-by-cue-id/" + id,
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

export function insertContentMovieCueWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-content-movie-cue-word/insert",
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

export function updateContentMovieCueWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-content-movie-cue-word/update",
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

export function deleteContentMovieCueWordAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-content-movie-cue-word/delete/" + id,
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

export function deleteContentMovieCueWordAPIByCueID(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-content-movie-cue-word/delete-by-cue-id/" + id,
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


export function getAllConversationAPI(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/conversation/all",
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

export function insertConversationAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/conversation/insert",
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

export function updateConversationAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/conversation/update",
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

export function deleteConversationAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/conversation/delete/" + id,
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


export function getAllCueConversationAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/conversation-cue/profile-by-video-id/" + id,
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

export function insertConversationCueAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/conversation-cue/insert",
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

export function updateConversationCueAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/conversation-cue/update",
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

export function deleteConversationCueAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/conversation-cue/delete/" + id,
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

export function getAllConversationCueWordByCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/conversation-cue-word/profile-by-cue-id/" + id,
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

export function insertConversationCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/conversation-cue-word/insert",
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

export function updateConversationCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/conversation-cue-word/update",
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

export function deleteConversationCueWordAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/conversation-cue-word/delete/" + id,
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

export function getAllMixedVideoCueWordByCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-mixed-video-cue-word/profile-by-cue-id/" + id,
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

export function insertMixedVideoCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-mixed-video-cue-word/insert",
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

export function updateMixedVideoCueWordAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-mixed-video-cue-word/update",
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

export function deleteMixedVideoCueWordAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-mixed-video-cue-word/delete/" + id,
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

export function getAllArticleCategories(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-article-category/all",
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

export function getAllArticle(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-article/all",
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

export function insertArticleAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-article/insert",
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

export function deleteArticleAPI(id,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-article/delete/" + id,
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

export function updateArticleAPI(data,token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-article/update",
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

export function getAllArticleCueByArticleAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-article-cue/profile-by-article/" + id,
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

export function insertArticleCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-article-cue/insert",
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

export function updateArticleCueAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-article-cue/update",
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

export function deleteArticleCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-article-cue/delete/" + id,
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

export function getAllArticleCueWordByArticleCueAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/course-article-cue-word/profile-by-cue/" + id,
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

export function insertArticleCueWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/course-article-cue-word/insert",
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

export function deleteArticleCueWordByCueIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-article-cue-word/delete-by-cue-id/" + id,
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

export function updateArticleCueWordAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/course-article-cue-word/update",
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

export function deleteArticleCueWordAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/course-article-cue-word/delete/" + id,
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

export function uploadSingleImageAPI(data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: "https://adminback.medlegten.com/api/upload-b64-image" ,
      headers: {
        Accept: 'application/json',
        //"Access-Control-Allow-Origin":"*",
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

export function insertPPVQuizConfigAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-quiz/config/insert",
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

export function getPPVQuizConfigByContentAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-quiz/config/get-by-content-id/" + id,
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

export function deletePPVQuizConfigAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-quiz/config/delete-by-id/" + id,
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

export function insertPPVQuizQuestionAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-quiz/question/insert" ,
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

export function updatePPVQuizQuestionAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-quiz/question/update" ,
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

export function getPPVQuizByContentAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-quiz/question/get-by-content-id/" + id,
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

export function deletePPVQuizQuestionAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-quiz/question/delete-by-id/" + id,
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

export function getPPVQuizAnswerByQuestionAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-quiz/answer/get-by-question-id/" + id,
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

export function insertPPVQuizQuestionAnswerAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: url + "/api/ppv-quiz/answer/insert" ,
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

export function deletePPVQuizQuestionAnswerAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "delete",
      url: url + "/api/ppv-quiz/answer/delete-by-id/" + id ,
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

export function getPPVQuizVocListByMovieIDAPI(id, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: url + "/api/ppv-quiz/vocabulary/get-by-movie-id/" + id,
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

export function updatePPVQuizVocByMovieIDAPI(id, selected, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-quiz/vocabulary/update/" + id + "/" + selected,
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

export function updatePPVContentMovieCueMonAPI(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: url + "/api/ppv-content-movie-cue/update-mon",
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
// const localurl = "http://localhost:8081/"
// export function getPPVContentCategoryByID(id, token){
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "get",
//       url: localurl + "/api/ppv-content-category/"+id,
//       headers:{
//         "Conten"
//       }
//     })
//   })
// }