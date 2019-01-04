import React, { Component } from "react";
import { EPanel, EList, EListGroup, EListItem, EIcon } from "./Widget";
import avatar from "../assets/images/faces/default_user.png";
import Common from "../utils/Common";
import { Hidden } from '@material-ui/core/Hidden';
import $ from "jquery";
export default class Panel extends Component {
  constructor(props) {
    super(props);
  }
  componentWillUpdate() {}
  render() {
    let name="";
    let image="";
   
    if(JSON.parse(localStorage.getItem("user"))!=undefined)
    {
      let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
      name=JSON.parse(localStorage.getItem("user")).name;
      if(JSON.parse(localStorage.getItem("user")).avatar==null ||JSON.parse(localStorage.getItem("user")).avatar=="")
      {
        image=avatar
      }
      else
      {
        image=Common.PATH_IMAGE + folder +  JSON.parse(localStorage.getItem("user")).avatar
      }
    
    }
    
    
    return (
      <React.Fragment>
        <EPanel left reveal>
          <EList mediaList>
            <EListGroup>
              {
                <EListItem
                  id="infoUser"
                  mediaItem
                  title={name}
                >
                  <img
                    width="32px"
                    src={image}
                    slot="media"
                  />
                </EListItem>
              }
            </EListGroup>
          </EList>
          <EList>
            <EListGroup>
              <EListItem
                link="/profile"
                onClick={() => {
                  this.$f7.panel.close();
                }}
                title="Thông Tin"
              >
                <EIcon
                  slot="media"
                  ios="f7:person"
                  md="material:person_round"
                />
              </EListItem>
              <EListItem
                link="/farm"
                title="Farm"
                onClick={() => {
                  this.$f7.panel.close();
                }}
              >
                <EIcon slot="media" size="30px" fa="leaf" />
              </EListItem>
              {/* <EListItem link="#" title="Cài Đặt">
                <EIcon
                  slot="media"
                  ios="f7:settings_fill"
                  md="material:settings"
                />
              </EListItem> */}
              <EListItem
                title="Đăng Xuất"
                onClick={() => {
                  $(".sheet-modal").hide()
                  localStorage.clear();
                  this.$f7.panel.close();
                  this.$f7.views.main.router.navigate("/login");
                }}
              >
                <EIcon slot="media" size="30px" fa="sign-out" />
              </EListItem>
            </EListGroup>
          </EList>
        </EPanel>
      </React.Fragment>
    );
  }
}
