import Rainbow from "rainbowvis.js";
import Contxet from "./Context";
import io from "socket.io-client";
const socket = io(`http://iot.e-farm.vn:3100?farm=${new Date()}`);
socket.on("connect", function() {
  console.log("Socket connect");
});
socket.on("connect_timeout", function() {
  console.log("Socket disconnect");
});
socket.on("disconnect", function() {
  console.log("Socket disconnect");
});
export default {
  /**
   * Request api
   * @param {String} url
   * @param {Object} option object parameter: method, url, data
   */
  DOMAIN: "http://iot.e-farm.vn:3100",
  PATH_IMAGE: "http://iot.e-farm.vn:3001/drive/views/",
  UPLOAD_FOLDER: "/home/devil/front-end/data",
  UPLOAD_IP: "iot.e-farm.vn",
  UPLOAD_PORT: "3001",
  SOCKET: socket,
  request: function(option) {
    let params = {
      method: option.method || "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE0YTk1ODZiMTVmOTVlMjU2ZTlkNWYiLCJlbWFpbCI6Im1pbmhkYW5nY250dEBnbWFpbC5jb20iLCJpYXQiOjE1MzkxNDQyMjR9.CzHQLamyYF4tp4qY7e0MpHyKi9NWnC4kDApyPKv2WKY"
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer" // no-referrer, *client
      //body: JSON.stringify(option.data || {}), // body data type must match "Content-Type" header
    };
    option.method !== "GET"
      ? (params.body = JSON.stringify(option.data || {}))
      : (params.method = "GET");
    return fetch(`${this.DOMAIN}/api/${option.url}`, params).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return response.json().then(Promise.reject.bind(Promise));
      }
    });
  },
  isAndroid: function() {
    return /Android/i.test(navigator.userAgent) ? !0 : !1;
  },
  verify: function(method, roleUser) {
    // EDIT or DELETE or ADD or VIEW
    let arrRoleUser = roleUser;

    let result = [];
    arrRoleUser != undefined &&
      arrRoleUser != null &&
      arrRoleUser.length > 0 &&
      arrRoleUser.map((c, index) => {
        let resultRoleMethod = {};
        if (c.code == "ROOT") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = true;
              break;
            case "DELETE":
              resultRoleMethod.method = true;
              break;
            case "VIEW":
              resultRoleMethod.method = true;
              break;
            case "MENU":
              resultRoleMethod.method = true;
              break;
          }
        } else if (c.code == "EDITOR") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = false;
              break;
            case "DELETE":
              resultRoleMethod.method = false;
              break;
            case "VIEW":
              resultRoleMethod.method = false;
              break;
            case "MENU":
              resultRoleMethod.method = false;
              break;
          }
        } else if (c.code == "MONITOR") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = false;
              break;
            case "ADD":
              resultRoleMethod.method = false;
              break;
            case "DELETE":
              resultRoleMethod.method = false;
              break;
            case "VIEW":
              resultRoleMethod.method = false;
              break;
            case "MENU":
              resultRoleMethod.method = false;
              break;
          }
        } else if (c.code == "MASTER") {
          switch (method) {
            case "EDIT":
              resultRoleMethod.method = true;
              break;
            case "ADD":
              resultRoleMethod.method = true;
              break;
            case "DELETE":
              resultRoleMethod.method = true;
              break;
            case "VIEW":
              resultRoleMethod.method = true;
              break;
            case "MENU":
              resultRoleMethod.method = true;
              break;
          }
        }
        resultRoleMethod.role = c.code;
        result.push(resultRoleMethod);
      });

    return result;
  }
};
