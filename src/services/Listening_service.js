import axios from "axios"
//const localUrl = "http://localhost:8081/api/"
const url = "https://adminback.lingos.mn/api/" 
function Get(reqUrl, token){
    return new Promise((resolve, reject) =>{
        axios({
            method: "get",
            url: url + reqUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

function Post(reqUrl, token, data){
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url + reqUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            data: data,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

function Put(reqUrl, token, data){
    return new Promise((resolve, reject) => {
        axios({
            method: "put",
            url: url + reqUrl,
            headers:{
                "Content-Type": "application/json",
                Authorization: token,
            },
            data: data,
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

function Delete(reqUrl, token){
    return new Promise((resolve, reject) => {
        axios({
            method: "delete",
            url: url + reqUrl,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    })
}

export function GetAllHWListening(token){
    return Get("hw-listening/all", token);
}

export function UpdateHWListening(token, data){
    console.log(data)
    return Put("hw-listening/update", token, data);
}

export function InsertHWListening(token, data){
    return Post("hw-listening/insert", token, data);
}

export function DeleteHWListening(token, id){
    return Delete("hw-listening/"+id, token);
}

export function UploadListeningMP3(token, data){
    return Post("hw-listening/upload-b64-mp3", token, data);
}

export function GetCuesByListeningID(token, listening_id){
    return Get("hw-listening/cues/" + listening_id, token);
}

export function GetCharactersByListeningID(token, listening_id){
    return Get("hw-listening/character/listening_character/"+listening_id, token);
}

export function GetAllHwListeningCharacters(token){
    return Get("hw-listening/character/all", token);
}

export function InsertHwListeningCharacter(token, data){
    return Post("hw-listening/character/insert", token, data);
}

export function UpdateHwListeningCharacter(token, data){
    return Put("hw-listening/character/update", token, data);
}

export function UploadListeningCharacterImage(token, data){
    return Post("hw-listening/upload-b64-image", token, data);
}

export function InsertHWListeningCue(token, data){
    return Post("hw-listening/cue/insert", token, data);
}

export function UpdateHWListeningCue(token, data){
    return Put("hw-listening/cue/update", token, data);
}

export function DeleteHWListeningCue(token, id){
    return Delete("hw-listening/cue/"+id, token);
}

export function GetHwListeningCueWords(token, cue_id){
    return Get("hw-listening/cue-words/"+cue_id, token);
}