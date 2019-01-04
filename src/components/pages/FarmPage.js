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
  EButton,
  ELabel,
  EToggle
} from "../Widget";
import $ from "jquery";
import "../../assets/js/upload.js";
import Common from "../../utils/Common";
import avatar from "../../assets/images/faces/icon-farm.jpg";
export default class FarmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmId: {
        _id: "",
        name: "",
        square: "",
        image: "",
        device: [],
        coordinate: { long: "", lat: "" },
        member: [],
        description: ""
      },
      arrDeviceFarm: [],
      selectDevice: [],
      selectAccount: [],
      arrMember: []
    };
  }
  componentDidMount() {
    this._handleContentEdit();
    this._getDeviceFarm();
    this._getMember();
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
  _handleContentEdit() {
    let objFarm = {
      method: "POST",
      url: "farm/" + JSON.parse(localStorage.getItem("farm"))._id
    };
    Common.request(objFarm)
      .then(arr => {
        // console.log(arr);
        let memberId = arr.member.map(c => c._id);
      
        this.setState({
          farmId: arr,
          selectAccount: memberId,
          member:memberId
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getDeviceFarm() {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: "device/all/" + JSON.parse(localStorage.getItem("farm"))._id
    };
    Common.request(objDeviceFarm)
      .then(arr => {
        let arrThingFarm = arr.map(m => m._id);
        this.setState({ arrDeviceFarm: arr, selectDevice: arrThingFarm });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getMember() {
    let objMember = {
      method: "POST",
      data: {},
      url: "user/" + JSON.parse(localStorage.getItem("user"))._id
    };
    Common.request(objMember)
      .then(arr => {
        this.setState({ arrMember: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _showToast(message) {
    let toast = this.$f7.toast.create({
      text: message,
      closeTimeout: 3000,
      position: "bottom"
    });
    toast.open();
  }
  handleEditFarm() {
    let { farmId,member} = this.state;

    let image = $("#imageAvatar").attr("data-src");
    // let device = $("#select_device").val();
    let memberSelect = $("#select_member").val();
    let userMaster=member.filter(c=>c==JSON.parse(localStorage.getItem("user"))._id)
    let memberLast=userMaster.concat(memberSelect);
    let device=farmId.device.map(c=>c._id);
    let objFarm = {
      method: "PUT",
      data: {
        _id: JSON.parse(localStorage.getItem("user"))._id,
        name: farmId.name,
        square: farmId.square,
        device:device,
        image: image,
        coordinate: {
          long: farmId.coordinate.long,
          lat: farmId.coordinate.lat
        },
        member: memberLast,
        description: farmId.description,
        status: farmId.status
      },
      url: "farm/" + JSON.parse(localStorage.getItem("farm"))._id
    };

    Common.request(objFarm)
      .then(arr => {
        this._handleContentEdit();
        let farm = JSON.parse(localStorage.getItem("farm"));
        farm.name = farmId.name;
        farm.square = farmId.square;
        farm.device = device;
        farm.image = image;
        farm.coordinate = {
          long: farmId.coordinate.long,
          lat: farmId.coordinate.lat
        };
        farm.member = member;
        farm.description = farmId.description;
        farm.status = farmId.status;
        localStorage.setItem("farm", JSON.stringify(farm));
        this._showToast("Cập nhật thông tin thành công");
      })
      .catch(err => {
        console.log(err);
        this._showToast("Cập nhật thông tin thất bại");
      });
  }
  render() {
    let {
      farmId,
      arrDeviceFarm,
      selectDevice,
      arrMember,
      selectAccount
    } = this.state;
   
    let folder = JSON.parse(localStorage.getItem("user")).folder + "/";
    return (
      <div>
         <ENavbar title="Farm" backLink="Quay Lại" />
         <EPage>
       
       <EBlock style={{ textAlign: "center" }}>
         <EBlockTitle>{farmId.name}</EBlockTitle>

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
          id="imageAvatar"
           src={
             
               (farmId.image != "" && farmId.image != null)? Common.PATH_IMAGE + folder + farmId.image
               : avatar
           }
           alt="..."
          
           data-src={farmId.image}
           onClick={this.imageChange.bind(this)}
           style={{ width: "45px" }}
         />
       </EBlock>
       <EList mediaList>
         <EListGroup>
           <EListItem title="Thông Tin Farm" groupTitle />
           <EListItem mediaItem>
             <EIcon slot="media" fa="home" size="30" />
             <EInput
               type="text"
               value={farmId.name}
               onChange={e => {
                 farmId.name = e.target.value;
                 this.setState({ farmId });
               }}
             />
           </EListItem>
           <EListItem mediaItem>
             <ELabel>Vĩ độ</ELabel>
             <EInput
               type="text"
               value={farmId.coordinate.lat}
               onChange={e => {
                 farmId.coordinate.lat = e.target.value;
                 this.setState({ farmId });
               }}
             />
           </EListItem>
           <EListItem mediaItem>
             <ELabel>Kinh độ</ELabel>
             <EInput
               type="text"
               value={farmId.coordinate.long}
               onChange={e => {
                 farmId.coordinate.long = e.target.value;
                 this.setState({ farmId });
               }}
             />
           </EListItem>
           <EListItem mediaItem>
             <ELabel>Diện tích</ELabel>
             <EInput
               type="text"
               value={farmId.square}
               onChange={e => {
                 farmId.square = e.target.value;
                 this.setState({ farmId });
               }}
             />
           </EListItem>

           <EListItem mediaItem>
             <ELabel style={{ margin: "10px 0" }}>Trạng thái</ELabel>
             <EToggle
               checked={farmId.status}
               onToggleChange={e => {
                 farmId.status = !farmId.status;
                 this.setState(farmId);
               }}
             />
           </EListItem>
           <EListItem mediaItem>
             <EIcon slot="media" fa="pencil-square-o" size="30" />
             <EInput
               type="textarea"
               value={farmId.description}
               onChange={e => {
                 farmId.description = e.target.value;
                 this.setState({ farmId });
               }}
             />
           </EListItem>
           <EListItem>
             <EList style={{ margin: 0 }}>
               <ul style={{ padding: 0 }}>
                 {selectDevice.length > 0 && (
                   <EListItem
                     title="Chọn thiết bị"
                     smartSelect
                     smartSelectParams={{ openIn: "popover" }}
                   >
                     <select
                       name="select_device"
                       multiple
                       defaultValue={selectDevice}
                       id="select_device"
                      
                     
                     >
                       {arrDeviceFarm.map((m, index) => {
                         return (
                           <option value={m._id} key={index} disabled >
                             {m.name}
                           </option>
                         );
                       })}
                     </select>
                   </EListItem>
                 )}
               </ul>
             </EList>
           </EListItem>
           <EListItem>
             <EList style={{ margin: 0 }}>
               <ul style={{ padding: 0 }}>
                 {selectAccount.length > 0 && arrMember.length > 0 && (
                   <EListItem
                     title="Chọn thành viên"
                     smartSelect
                     smartSelectParams={{ openIn: "popover" }}
                   >
                     <select
                       id="select_member"
                       name="select_member"
                       multiple
                       defaultValue={selectAccount}
                     >
                       {/* ["5c00e136aecd9d36b9b6ac99", "5c24a321050c1343a109a9a0"] */}
                       {arrMember.map((m, index) => {
                         return (
                           <option value={m._id} key={index}>
                             {m.name}
                           </option>
                         );
                       })}
                     </select>
                   </EListItem>
                 )}
               </ul>
             </EList>
           </EListItem>
         </EListGroup>
       </EList>
       <EBlock>
         <EButton round big fill onClick={this.handleEditFarm.bind(this)}>
           Cập Nhật
         </EButton>
       </EBlock>
     </EPage>
      </div>
     
    );
  }
}
