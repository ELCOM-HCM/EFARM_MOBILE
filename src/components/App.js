/* eslint-disable react/display-name */
import React from "react";
import { EApp, EView, EStatusbar } from "./Widget";
import Toolbar from "./Toolbar";
import routes from "../routes";
import Panel from "./Panel";
export default function(props) {
  const params = {
    id: "dangtm.esmile", // App bundle ID
    name: "eFARM", // App name
    theme: "auto", // Automatic theme detection:ios,md. MD theme for all other devices.
    // App routes
    routes
  };
  return (
    <EApp params={params} id="dangtm-esmile">
      {/* Statusbar */}
      <EStatusbar />
      {/* Main View */}
      <Panel />

      <EView
        id="main-view"
        pushState={true}
        pushStateSeparator="#!"
        url="/"
        main
        className="ios-edges"
      >
      </EView>
    </EApp>
  );
}
