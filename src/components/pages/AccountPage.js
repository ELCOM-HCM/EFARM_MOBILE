import React, { Component } from "react";
import { Page } from "efw-react";
import $ from "jquery";
import Navbar from "../Navbar";
import moment from "moment";
import avatar from "../../assets/images/faces/default_user.png";
import {
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
  EFab,
  EBlockTitle,
  EBlockFooter,
  EBlock,
  EToggle,
  EButton
} from "../Widget";
import "../../assets/js/upload.js";
import Common from "../../utils/Common";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionsOpened: false,
      dataUser: [],
      idUser: "",
      selectedOption: null,
      arrRole: [],
      selectRole: [],
      userId: {},
      selectRoleEdit: []
    };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  _showToast(message) {
    let toast = this.$f7.toast.create({
      text: message,
      closeTimeout: 3000,
      position: "bottom"
    });
    toast.open();
  }
  _deleteUser() {
    let { idUser } = this.state;
    let idUserCookie = JSON.parse(localStorage.getItem("user"))._id;
    if (idUserCookie != idUser) {
      let objUser = {
        method: "DELETE",
        data: {},
        url: "user/" + idUser
      };
      Common.request(objUser)
        .then(arr => {
          this._getListUser();
          this._showToast("Xóa thành viên thành công");
        })
        .catch(err => {
          console.log(err);
          this._showToast("Xóa thành viên thất bại");
        });
    } else {
      this._showToast("Xóa thành viên thất bại");
    }
  }
  _deleteDevice() {
    this.setState({ actionsOpened: false });
  }
  _showActions(_id) {
    this.setState({ actionsOpened: true, idUser: _id });
  }
  componentDidMount() {
    this._getListUser();
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

  _showContentEdit(_id) {
    let { arrRole } = this.state;
    let objUser = {
      method: "POST",
      url: "user/profile/" + _id
    };
    Common.request(objUser)
      .then(arr => {
        // let role_id = [];
        // arrRole.map((c, index) => {
        //   arr.role.map((r, index) => {
        //     if (c._id == r) {
        //       role_id.push(c._id);
        //     }
        //   });
        // });
        this.setState({
          idUser: _id,
          userId: arr
          // selectRoleEdit: role_id
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getListUser() {
    let objAccount = {
      method: "POST",
      url: "user/" + JSON.parse(localStorage.getItem("user"))._id
    };

    Common.request(objAccount)
      .then(arr => {
        this.setState({ dataUser: arr });
      })
      .catch(err => {
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
        let { selectRole } = this.state;
        let role = [];
        arr.map(r => {
          if (r.code != "ROOT") {
            role.push(r);
            selectRole.push(r._id);
          }
        });
        this.setState({ arrRole: role });
      })
      .catch(err => {
        console.log(err);
      });
  }
  async handleEditAccount() {
    let { arrRole, idUser, userId } = this.state;
    let image = $("#imageAvatar").attr("data-src");
    let roleid=$("#slRole").val();
    let objAccount = {
      method: "PUT",
      data: {
        email: userId.email,
        name: userId.name,
        password: userId.password,
        status: userId.iStatus,
        role_id:roleid,
        address: userId.address,
        avatar: image,
        is_parent: userId.is_parent
      },
      url: "user/" + idUser
    };
    
    await Common.request(objAccount)
    .then(arr => {
      this._getListUser();
      this._showToast("Cập nhật thông tin thành công");
     
    })
    .catch(err => {
      this._showToast("Cập nhật thông tin thất bại");
      console.log(err);
    });
  }
  render() {
    const {
      actionsOpened,
      dataUser,
      arrRole,
      selectRoleEdit,
      userId
    } = this.state;
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    return (
      <div>
         <Navbar title="Quản Lý Tài Khoản" />
         <Page>
       
       <EList accordionList mediaList sortable style={{ marginTop: "0px" }}>
         <ul>
           {dataUser.map((c, index) => {
             return (
               <EListItem
                 key={index}
                 swipeout
                 accordionItem
                 title={c.name}
                 after={moment(c.last_update).format("DD-MM-YYYY")}
                 text={c.email}
                 onClick={() => {
                   this._showContentEdit(c._id);
                 }}
               >
                 <EIcon
                   slot="media"
                   fa="user"
                   size="45px"
                   color={c.status == 1 ? "green" : "red"}
                 />

                 <ELabel inline style={{ paddingLeft: 20 }}>
                   Quyền truy cập
                 </ELabel>
                 <EInput media type="select" style={{ paddingLeft: 20 }}>
                   {c.role.map((c, index) => {
                     return <option key={index}>{c.name}</option>;
                   })}
                 </EInput>

                 <ESwipeoutActions right>
                   <ESwipeoutButton
                     color="red"
                     onClick={() => {
                       this._showActions(c._id);
                     }}
                   >
                     Xoá
                   </ESwipeoutButton>
                 </ESwipeoutActions>
                 <EAccordionContent>
                   <EListGroup>
                     <EListItem>
                       <ELabel className="cfsizeLable">Họ và tên</ELabel>
                       <EInput type="text" clearButton value={userId.name} />
                     </EListItem>
                     <EListItem>
                       <ELabel className="cfsizeLable">Email</ELabel>
                       <EInput type="text" clearButton value={userId.email} />
                     </EListItem>
                     <EListItem>
                       <ELabel className="cfsizeLable">Mật khẩu</ELabel>
                       <EInput
                         type="password"
                         clearButton
                         value={userId.password}
                       />
                     </EListItem>
                     <EListItem>
                       <ELabel className="cfsizeLable">Địa chỉ</ELabel>
                       <EInput
                         type="textarea"
                         clearButton
                         value={userId.address}
                       />
                     </EListItem>
                     <EListItem>
                       <ELabel className="cfsizeLable">Trạng thái</ELabel>
                       <EToggle />
                     </EListItem>
                     <EListItem>
                       <EList>
                         <ul>
                           <EListItem
                             title="Chọn quyền"
                             smartSelect
                             smartSelectParams={{ openIn: "popover" }}
                           >
                             <select
                               id="slRole"
                               name="select_role"
                               multiple
                               defaultValue={c.role.map(role => role._id)}
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
                       <ELabel inline>Ảnh đại diện</ELabel>
                       <EBlock style={{ textAlign: "center" }}>
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
                           src={
                             userId.avatar != null && userId.avatar != ""
                               ? Common.PATH_IMAGE + folder + userId.avatar
                               :avatar
                           }
                           id="imageAvatar"
                           onClick={this.imageChange.bind(this)}
                         />
                         <EBlockFooter>
                           (Nhấn vào ảnh để thay đổi)
                         </EBlockFooter>
                       </EBlock>
                     </EListItem>
                     <EListItem>
                       <EButton onClick={this.handleEditAccount.bind(this)}>
                         Cập nhật
                       </EButton>
                     </EListItem>
                   </EListGroup>
                 </EAccordionContent>
               </EListItem>
             );
           })}
         </ul>
       </EList>
       <EActions opened={actionsOpened}>
         <EActionsGroup>
           <EActionsButton onClick={this._deleteUser.bind(this)}>
             Xoá thành viên
           </EActionsButton>
         </EActionsGroup>
         <EActionsGroup>
           <EActionsButton color="red">Đóng</EActionsButton>
         </EActionsGroup>
       </EActions>
       <EFab
         position="right-bottom"
         slot="fixed"
         color="yellow"
         onClick={() => {
           this.$f7.panel.close();
           this.$f7.views.main.router.navigate("/add-account");
         }}
       >
         <EIcon ios="f7:add" md="material:add" />
       </EFab>
     </Page>
      </div>
    
    );
  }
}
