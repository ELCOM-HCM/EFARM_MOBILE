import React, { Component } from "react";
import {
  EPage,
  EList,
  EButton,
  EInput,
  ELoginScreenTitle,
  EListItem
} from "../Widget";
import $ from "jquery";
import Common from "../../utils/Common";
import logo from "../../assets/images/logo.png";
import background from "../../assets/images/background.jpg";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];
export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  /**
   * Show toast
   * @param {String} message message inform
   */
  _showToast(message) {
    let toast = this.$f7.toast.create({
      text: message,
      closeTimeout: 3000,
      position: "bottom"
    });
    toast.open();
  }
  _getFarmId(_id) {
    let objFarm = {
      method: "POST",
      url: "farm/" + _id
    };
    Common.request(objFarm)
      .then(arr => {
        localStorage.setItem("farm", JSON.stringify(arr));
      })
      .catch(err => {
        console.log(err);
      });
  }
  signIn() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7router;
    const { email, password } = this.state;
    if (email === "" || password === "") {
      this._showToast("Email và Mật Khẩu là bắt buộc");
      return;
    }
    app.dialog.preloader();
    let thisJquery=$("#infoUser .item-title-row");
    let thisImage=$("#infoUser img");
    Common.request({
      method: "POST",
      url: "auth/login",
      data: { email: self.state.email, password: self.state.password }
    })
      .then(result => {
        localStorage.setItem("user", JSON.stringify(result));
        this._getFarmId(result.farm_id);
        app.dialog.close();
        thisJquery.text(result.name);
        thisImage.attr("src", Common.PATH_IMAGE + result.folder +"/"+ result.avatar)
        router.navigate("/dashboard/");
      })
      .catch(error => {
        app.dialog.close();
        this._showToast("Email hoặc Mật Khẩu chưa đúng");
      });
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
   
  }
  render() {
    return (
      <EPage noToolbar noNavbar noSwipeback loginScreen style={{background:`url(${background})`, backgroundSize:"cover"}} >
        <ELoginScreenTitle>
          <img src={logo} />
        </ELoginScreenTitle>
        <EList form inlineLabels noHairlinesMd>
          <EInput
            clearButton
            type="email"
            placeholder="Nhập Email"
            value={this.state.email}
            onInput={e => {
              this.setState({ email: e.target.value });
            }}
            style={{background:"rgba(255,255,255,0.5)", padding:5, marginTop:20}}
          />
          <EInput
            clearButton
            type="password"
            placeholder="Nhập Mật Khẩu"
            value={this.state.password}
            onInput={e => {
              this.setState({ password: e.target.value });
            }}
            style={{background:"rgba(255,255,255,0.5)", padding:5, marginTop:20}}
          />
        </EList>
        <EList style={{ margin: "25px" }}>
          <EButton big fill round onClick={this.signIn.bind(this)}>
            Đăng Nhập
          </EButton>
        </EList>
      </EPage>
    );
  }
}
