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
import avatar from "../../assets/images/faces/icon-user.jpg";
import "../../assets/js/upload.js";

export default class FagAddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDeviceMapping: [],
      objInfoDeviceMapping: []
    };
  }
  componentDidMount() {
    this._getDeviceMapping();
  }
  _getDeviceMapping() {
    let objDeviceMapping = {
      method: "POST",
      data: {},
      url: "device/mapping/active/"
    };
    Common.request(objDeviceMapping)
      .then(arr => {
        this.setState({ arrDeviceMapping: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getInfoDeviceMapping(_idDeviceThing) {
    let objDeviceMapping = {
      method: "POST",
      data: {},
      url: "device/mapping/" + _idDeviceThing
    };

    Common.request(objDeviceMapping)
      .then(arr => {
        this.setState({
          objInfoDeviceMapping: arr
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  mappingDataDevice() {
    let codeDevice = $("#slCodeDevice").val();
    this._getInfoDeviceMapping(codeDevice);

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
  render() {
    let { arrDeviceMapping } = this.state;
    return (
      <EPage>
        <ENavbar title="Tạo mới thiết bị" backLink="Quay Lại" />
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
            src="http://demo.e-smile.vn:5001/drive/views/default_user.png"
            alt="..."
            id="imageAvatar"
            onClick={this.imageChange.bind(this)}
          />
          <EBlockFooter>(Nhấn vào ảnh để thay đổi)</EBlockFooter>
        </EBlock>
        <EList mediaList>
          <EListGroup>
            <EListItem title="Thông Tin Thiết Bị" groupTitle />
            <EListItem mediaItem>
              <ELabel inline>Mã thiết bị</ELabel>
              <EInput
                media
                type="select"
                onChange={this.mappingDataDevice.bind(this)}
                inputId="slCodeDevice"
              >
                {arrDeviceMapping.map((c, index) => {
                  return <option key={index}>{c}</option>;
                })}
              </EInput>
            </EListItem>
            <EListItem mediaItem>
              <ELabel inline>Tên thiết bị</ELabel>
              <EInput type="text" disable={true}/>
            </EListItem>
            <EListItem mediaItem>
              <ELabel inline>Chọn thiết bị</ELabel>
              <EInput media type="select">
                <option value="Male">Thing 01</option>
                <option value="Female">Thing 02</option>
              </EInput>
            </EListItem>
            <EListItem mediaItem>
              <ELabel inline>Đơn vị đo</ELabel>
              <EInput type="text" />
            </EListItem>
            <EListItem>
              <ELabel className="cfsizeLable">Trạng thái</ELabel>
              <EToggle />
            </EListItem>
            <EListItem>
              <ELabel className="cfsizeLable">Ngưỡng tối đa</ELabel>
              <ERange />
            </EListItem>
            <EListItem>
              <ELabel className="cfsizeLable">Ngưỡng tối thiểu</ELabel>
              <ERange />
            </EListItem>
            <EListItem>
              <ELabel className="cfsizeLable">Ngưỡng đặc biệt</ELabel>
              <ERange />
            </EListItem>
            <EListItem mediaItem>
              <ELabel className="cfsizeLable">Mô tả</ELabel>
              <EInput type="textarea" />
            </EListItem>
          </EListGroup>
        </EList>
        <EBlock>
          <EButton round big fill>
            Tạo mới
          </EButton>
        </EBlock>
      </EPage>
    );
  }
}
