import React from "react";
import ReactDOM from "react-dom";
import eFW from "efw-dtm/efw.esm.bundle";

import FWReact from "efw-react";

// Import main App component
import App from "./components/App.js";
// styles
import "efw-dtm/css/efw.min.css";

// Icons
import "./assets/css/icons.css";

import "./assets/less/app.less";
import { isBrowser } from "react-device-detect";
// Init
eFW.use(FWReact);
if (isBrowser) {
  location.href = "http://iot.e-farm.vn:8083/#/login";
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
