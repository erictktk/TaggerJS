const siteName = "http://localhost:5000/";

const signInUrl = siteName + "auth/signin";
const signOutUrl = siteName + "auth/signout";
const uploadUrl = siteName + "/update";
let loadNewUrl = siteName + '/loadnew?lib=';


export function UpdateLibrary(jsonString, libArgument, callback){
  const actualUploadUrl = loadNewUrl + libArgument;
  //var obj = {};
  postData(actualUploadUrl, jsonString)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    if (data[0].success){
        callback(data);
    }
  });
}

//
export function GetUpdatedLibraries(callback){
  var obj = {};
  postData(signInUrl, JSON.stringify(obj))
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    if (data[0].success){
        callback(data);
    }
  });
}

export function GetLibraryFromServer(argument, callback, errorCallback=null){
  const actualLoadNewUrl = loadNewUrl + argument;
  var obj = {};
  postData(actualLoadNewUrl, JSON.stringify(obj))
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    if (data[0].success){
        callback(data);
    }
  }).catch(err => {
    console.log("ERROR!");
    console.log(err);
  } )
  ;
}

//
export function ajaxSignIn(username, password, callback){
    var obj = { username: username, password: password }
    postData(signInUrl, JSON.stringify(obj))
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      if (data[0].success){
          callback(username);
      }
    });
}

export function ajaxSignOut(signoutCallback){
    var obj = {};
    postData(signOutUrl, JSON.stringify(obj))
    .then(data => {
        if (data[0].success){
            signoutCallback();
        }
    })
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  //

