import React, { Component } from "react";
import { Page } from "efw-react";
import Navbar from "../Navbar";
import $ from "jquery";
import {
  EPage,
  EList,
  EListItem,
  EAccordionContent,
  EIcon,
  EActions,
  EActionsGroup,
  EActionsButton,
  ESwipeoutActions,
  ESwipeoutButton,
  EListGroup,
  EInput,
  ELabel,
  ERow,
  ECol,
  ERange,
  EToggle,
  EButton,
  EFab,
  EBlock,
  ENavbar,
  EBlockTitle,
  EBlockFooter
} from "../Widget";
import moment from "moment";
import Common from "../../utils/Common";
import avatar from "../../assets/images/faces/default_user.png";
import "../../assets/js/upload.js";

const newLocal = true;
export default class FagAddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrRole: [],
      selectRole: [],
      objUser: {}
    };
  }
  componentDidMount() {
    this._getRole();
  }
  //Upload image
  imageChange(ev) {
    $("#inputFile").trigger("click");
  }

  uploadFile(evt) {
    let file = $("#inputFile").prop("files");

    let date = new Date();
    let files = [];
    let fileOutName = [];
    let fileName = [];
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    let extension = file[0].name.split(".").pop();
    let name = `account_${date.getTime()}.${extension}`;
    files.push(file[0]);
    // fileOutName.push(Common.UPLOAD_FOLDER + folder + name);
    fileOutName.push(Common.UPLOAD_FOLDER + folder + name);
    fileName.push(name);
    let obj = {
      ip: Common.UPLOAD_IP,
      fileOut: fileOutName,
      files: files,
      port: Common.UPLOAD_PORT,
      progress: function(evt) {},
      success: response => {
        let image = Common.PATH_IMAGE + folder + name;

        $("#imageAvatar").attr("src", image);
        $("#imageAvatar").attr("data-src", name);
      },
      error: function() {}
    };
    $(this.inputFile).Upload(obj);
  }
  _showToast(message) {
    let toast = this.$f7.toast.create({
      text: message,
      closeTimeout: 3000,
      position: "bottom"
    });
    toast.open();
  }
  async handleCreateAccount() {
    let { arrRole, selectRole, objUser } = this.state;
    let checkMaster = false;
    let role = $("#slRole").val();
    role.map(s => {
      if (s == "5c00e166aecd9d36b9b6ac9b") {
        checkMaster = true;
      }
    });

    let image = $("#imageAvatar").attr("data-src");
    let _id = JSON.parse(localStorage.getItem("user"))._id;
    let farm_id = JSON.parse(localStorage.getItem("farm"))._id;
    let objAccount = {
      method: "POST",
      data: {
        _id: _id,
        email: objUser.email,
        farm_id: farm_id,
        name: objUser.name,
        password: objUser.password,
        status: objUser.status,
        role_id: role,
        address: objUser.address,
        avatar: image,
        is_parent: checkMaster
      },
      url: "user/"
    };

    await Common.request(objAccount)
      .then(arr => {
        this._showToast("Thêm thành viên thành công");
      }, 2000)
      .catch(err => {
        this._showToast("Thêm thành viên thất bại");
        console.log(err);
      });
  }
  _getRole() {
    let objRole = {
      method: "POST",
      url: "role/" + JSON.parse(localStorage.getItem("user"))._id
    };
    Common.request(objRole)
      .then(arr => {
        let role = [];
        arr.map(r => {
          if (r.code != "ROOT") {
            role.push(r);
          }
        });
        this.setState({ arrRole: role });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let { selectRole, arrRole, objUser } = this.state;
    return (
      <div>
        <ENavbar title="Tạo mới Thành Viên" backLink="Quay Lại" />
        <EPage>
          <EBlock style={{ textAlign: "center" }}>
            <EBlockTitle>Ảnh đại diện</EBlockTitle>

            <input
              type="file"
              style={{ display: "none" }}
              onChange={this.uploadFile.bind(this)}
              ref={input => {
                this.inputFile = input;
              }}
              id="inputFile"
            />
            <img
              width="45px"
              src={avatar}
              id="imageAvatar"
              onClick={this.imageChange.bind(this)}
            />
            <EBlockFooter>(Nhấn vào ảnh để thay đổi)</EBlockFooter>
          </EBlock>
          <EList mediaList>
            <EListGroup>
              <EListItem title="Thông Tin thành viên" groupTitle />

              <EListItem mediaItem>
                <ELabel inline>Tên thành viên</ELabel>
                <EInput
                  clearButton
                  type="text"
                  onChange={e => {
                    objUser.name = e.target.value;
                    this.setState(objUser);
                  }}
                />
              </EListItem>
              <EListItem mediaItem>
                <ELabel inline>Email</ELabel>
                <EInput
                  clearButton
                  type="email"
                  onChange={e => {
                    objUser.email = e.target.value;
                    this.setState(objUser);
                  }}
                />
              </EListItem>
              <EListItem mediaItem>
                <ELabel inline>Mật khẩu</ELabel>
                <EInput
                  clearButton
                  type="password"
                  onChange={e => {
                    objUser.passwor = e.target.value;
                    this.setState(objUser);
                  }}
                />
              </EListItem>
              <EListItem mediaItem>
                <EList style={{ margin: 0 }}>
                  <ul style={{ marginLeft: "-15px", padding: 0 }}>
                    <EListItem
                      title="Chọn quyền"
                      smartSelect
                      smartSelectParams={{ openIn: "popover" }}
                    >
                      <select
                        id="slRole"
                        name="select_role"
                        multiple
                        defaultValue={selectRole}
                      >
                        {arrRole.map((role, index) => {
                          return (
                            <option value={role._id} key={index}>
                              {role.name}
                            </option>
                          );
                        })}
                      </select>
                    </EListItem>
                  </ul>
                </EList>
              </EListItem>

              <EListItem>
                <ELabel style={{ marginLeft: "-10px" }} className="cfsizeLable">
                  Trạng thái
                </ELabel>
                <EToggle
                  onToggleChange={e => {
                    objUser.passwor = e == newLocal ? 1 : 0;
                    this.setState(objUser);
                  }}
                />
              </EListItem>
              <EListItem mediaItem>
                <ELabel className="cfsizeLable">Địa chỉ</ELabel>
                <EInput
                  clearButton
                  type="textarea"
                  onChange={e => {
                    objUser.address = e.target.value;
                    this.setState(objUser);
                  }}
                />
              </EListItem>
            </EListGroup>
          </EList>
          <EBlock>
            <EButton
              round
              big
              fill
              onClick={this.handleCreateAccount.bind(this)}
            >
              Tạo mới
            </EButton>
          </EBlock>
        </EPage>
      </div>
    );
  }
}
