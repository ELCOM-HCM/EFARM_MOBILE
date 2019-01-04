import React, { Component } from "react";
import {
  EPage,
  EList,
  EListGroup,
  EListItem,
  ENavbar,
  EBlock,
  EBlockFooter,
  EIcon,
  EBlockTitle,
  EInput,
  EButton
} from "../Widget";
import $ from "jquery";
import "../../assets/js/upload.js";
import Common from "../../utils/Common";
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objUser: {},
      dataToken: ""
    };
  }
  componentDidMount() {
    this.handleContentEdit();
    this.getToken();
  }
  handleContentEdit() {
    let objUser = {
      method: "POST",
      url: "user/profile/" + JSON.parse(localStorage.getItem("user"))._id
    };
    Common.request(objUser)
      .then(obj => {
        this.setState({ objUser: obj, name: obj.name });
      })
      .catch(err => {});
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
  getToken() {
    let objToken = {
      method: "PUT",
      url: "user/token/refresh/",
      data: {
        _id: JSON.parse(localStorage.getItem("user"))._id,
        email: JSON.parse(localStorage.getItem("user")).email
      }
    };
    Common.request(objToken)
      .then(obj => {
        this.setState({ dataToken: obj.token });
      })
      .catch(err => {});
  }
  async handleEditAccount() {
    let { objUser } = this.state;
    let image = $("#imageAvatar").attr("data-src");

    let objAccount = {
      method: "PUT",
      data: {
        email: objUser.email,
        name: objUser.name,
        password: objUser.password,
        address: objUser.address,
        avatar: image,
        status: 1,
        role_id: objUser.role,
        is_parent: objUser.is_parent
      },
      url: "user/" + JSON.parse(localStorage.getItem("user"))._id
    };

    await Common.request(objAccount)
      .then(arr => {
        this.handleContentEdit();
        let user = JSON.parse(localStorage.getItem("user"));
        user.email = objUser.email;
        user.name = objUser.name;
        user.address = objUser.address;
        user.avatar = image;
        localStorage.setItem("user", JSON.stringify(user));
    
        this._showToast("Cập nhật thông tin thành công");
       
      })
      .catch(err => {
        this._showToast("Cập nhật thông tin thất bại");
        console.log(err);
      });
  }
  render() {
    let { objUser, dataToken } = this.state;
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    return (
      <div>
         <ENavbar title="Thông Tin" backLink="Quay Lại" />
         <EPage>
       
       <EBlock style={{ textAlign: "center" }}>
         <EBlockTitle>{objUser.name}</EBlockTitle>

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
           src={
             objUser.avatar != "" && objUser.avatar != null
               ? Common.PATH_IMAGE + folder + objUser.avatar
               : "http://demo.e-smile.vn:5001/drive/views/default_user.png"
           }
           alt="..."
           id="imageAvatar"
           data-src={objUser.avatar}
           onClick={this.imageChange.bind(this)}
           style={{ width: "45px" }}
         />
         <EBlockFooter>
           {JSON.parse(localStorage.getItem("farm")).name}
         </EBlockFooter>
       </EBlock>
       <EList mediaList>
         <EListGroup>
           <EListItem title="Thông Tin" groupTitle />
           <EListItem mediaItem>
             <EIcon slot="media" ios="f7:person" md="material:person" />
             <EInput
               type="text"
               value={objUser.name}
               onChange={e => {
                 objUser.name = e.target.value;
                 this.setState(objUser);
               }}
             />
           </EListItem>
           <EListItem mediaItem>
             <EIcon slot="media" ios="f7:email_fill" md="material:email" />
             <EInput
               type="text"
               value={objUser.email}
               onChange={e => {
                 objUser.email = e.target.value;
                 this.setState(objUser);
               }}
             />
           </EListItem>
         </EListGroup>
         <EListGroup>
           <EListItem title="Mật Khẩu" groupTitle />
           <EListItem mediaItem>
             <EIcon slot="media" ios="f7:lock_fill" md="material:lock" />
             <EInput
               clearButton
               type="password"
               value={objUser.password}
               onChange={e => {
                 objUser.password = e.target.value;
                 this.setState(objUser);
               }}
             />
           </EListItem>
         </EListGroup>
         <EListGroup>
           <EListItem title="Địa chỉ" groupTitle />
           <EListItem mediaItem>
             <EIcon fa="map-marker" size="30px" slot="media" />
             <EInput
               clearButton
               type="text"
               value={objUser.address}
               onChange={e => {
                 objUser.address = e.target.value;
                 this.setState(objUser);
               }}
             />
           </EListItem>
         </EListGroup>
         <EListGroup>
           <EListItem title="Quyền truy cập" groupTitle />
           <EListItem mediaItem>
             <EIcon fa="key" size="30px" slot="media" />
             <div>
               {JSON.parse(localStorage.getItem("user")).role.map(
                 (c, index) => {
                   return <h4 key={index}>{c.name}</h4>;
                 }
               )}
             </div>
           </EListItem>
         </EListGroup>
         <EListGroup>
           <EListItem title="Token" groupTitle />
           <EListItem mediaItem>
             <EIcon fa="code-fork" size="30px" slot="media" />
             <EInput clearButton type="textarea" value={dataToken} />
           </EListItem>
           <EButton
             color="pink"
             big
             fill
             style={{ width: "30%", margin: "10px auto" }}
             onClick={this.getToken.bind(this)}
           >
             Lấy mới
           </EButton>
         </EListGroup>
       </EList>
       <EBlock>
         <EButton round big fill onClick={this.handleEditAccount.bind(this)}>
           Cập Nhật
         </EButton>
       </EBlock>
       {/* <EBlock>
         <EButton round big fill color="red">
           Đăng Xuất
         </EButton>
       </EBlock> */}
     </EPage>
      </div>
     
    );
  }
}
