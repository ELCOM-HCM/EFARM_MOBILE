import React, { Component } from "react";
import { EToolbar, ELink } from "./Widget";
import { RoleContext } from "../utils/Context";
export default class ToolbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolBar: [
        {
          animate: true,
          tabLink: "",
          href: "/dashboard",
          tabLinkActive: false,
          text: "Dữ Liệu",
          iconIos: "f7:pie_chart_fill",
          iconMd: "material:pie_chart"
        },
        {
          animate: true,
          href: "/device",
          tabLink: "",
          tabLinkActive: false,
          text: "Thiết Bị",
          iconIos: "f7:settings_fill",
          iconMd: "material:phonelink_setup"
        },
        {
          animate: true,
          tabLink: "",
          href: "/report",
          tabLinkActive: false,
          text: "Báo Cáo",
          iconIos: "f7:cloud_download_fill",
          iconMd: "material:cloud_download"
        },
        {
          animate: true,
          href: "/account",
          tabLink: "",
          tabLinkActive: false,
          text: "Tài Khoản",
          iconIos: "f7:persons",
          iconMd: "material:people"
        }
      ]
    };
  }
  render() {
    let { toolBar } = this.state;
    let role = this.context;
    return (
      <EToolbar tabbar labels bottomMd={true}>
        <p>{role}</p>
        {toolBar.map((link, index) => {
          if (location.hash.indexOf(link.href) != -1) {
            link.tabLinkActive = true;
          }
          return (
            <ELink
              key={index}
              tabLinkActive={link.tabLinkActive}
              {...link}
              onClick={() => {
                toolBar.map((t, indx) => {
                  if (index === indx) {
                    t.tabLinkActive = true;
                  } else {
                    t.tabLinkActive = false;
                  }
                });
                this.setState({ toolBar });
              }}
            />
          );
        })}
      </EToolbar>
    );
  }
}
ToolbarPage.contextType = RoleContext;
