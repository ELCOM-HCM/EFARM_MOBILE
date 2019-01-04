import React, { Component } from "react";
import { Page } from "efw-react";
import Navbar from "../Navbar";
import $ from "jquery";
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
  ERow,
  ECol,
  ERange,
  EToggle,
  EButton,
  EFab,
  EBlock
} from "../Widget";
import moment from "moment";
import Common from "../../utils/Common";
import avatar from "../../assets/images/faces/icon-user.jpg";
export default class DevicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionsOpened: false,
      arrDeviceFarm: [],
      thingId: {
        name: "",
        status: false,
        threshold_min: 0,
        threshold_max: 0,
        threshold_special: 0,
        unit: "",
        description: "",
        switch_control: []
      },
      idThing: "",
      switch_control: []
    };
  }
  _showToast(message) {
    let toast = this.$f7.toast.create({
      text: message,
      closeTimeout: 3000,
      position: "bottom"
    });
    toast.open();
  }
  componentDidMount() {
    this._getDeviceFarm();
  }
  handleEditThing() {
    let { thingId, idThing,switch_control } = this.state;
    let objThing = {
      method: "PUT",
      data: {
        name: thingId.name,
        status: thingId.status,
        description: thingId.description,
        unit: thingId.unit,
        threshold_max: thingId.threshold_max,
        threshold_min: thingId.threshold_min,
        threshold_special: thingId.threshold_special,
        switch_control:switch_control,
        type:thingId.type,
        method:thingId.method
      },
      url: "device/" + idThing
    };
    Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._showToast("Cập nhật thiết bị thành công");
      })
      .catch(err => {
        this._showToast("Cập nhật thiết bị thất bại");
      });
  }
  _deleteDevice() {
    let { idThing } = this.state;
    let objThing = {
      method: "DELETE",
      data: {},
      url: "device/" + idThing
    };

    Common.request(objThing)
      .then(arr => {
        this._getDeviceFarm();
        this._showToast("Xóa thiết bị thành công");
      })
      .catch(err => {
        this._showToast("Xóa thiết bị thất bại");
      });
    this.setState({ actionsOpened: false });
  }
  _showActions(_id) {
    this.setState({ actionsOpened: true, idThing: _id });
  }
  _showContentEdit(_id) {
    let objThing = {
      method: "POST",
      data: {},
      url: "device/" + _id
    };
   
    Common.request(objThing)
      .then(arr => {
     
        this.setState({ thingId: arr, idThing: _id,switch_control:arr.switch_control});
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDeviceControl(id_thing, method, index) {
    let methodUpdate="OFF";
    if(method==true)
    {
      methodUpdate="On"
    }
    else
    {
      methodUpdate="Off";
    }
    let objSwitchControl = {
      method: "POST",
      data: {id: id_thing, method: methodUpdate, index: index},
      url:"device/control/"
    };
  Common.request(objSwitchControl)
      .then(arr => {
        
       
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getDeviceFarm() {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: "device/all/" + JSON.parse(localStorage.getItem("user")).farm_id
    };
    Common.request(objDeviceFarm)
      .then(arr => {
        
        let arrDevice = [];
        arr.map((c, index) => {
          arrDevice.push(c._id);
        
   
        });
        this.setState({ arrDeviceFarm: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      actionsOpened,
      thingId,
      //variable for thing
      arrDeviceFarm,
      switch_control
    } = this.state;
    return (
      <div>
        <Navbar title="Thiết Bị" />
        <Page>
        
        <EList accordionList mediaList sortable style={{ marginTop: "0px" }}>
          <ul>
            {arrDeviceFarm.map((c, index) => {
              return (
                <EListItem
                  key={index}
                  swipeout
                  accordionItem
                  title={c.name}
                  after={moment(c.last_update).format("DD-MM-YYYY")}
                  text={`Mô tả: ${c.description}`}
                  ref={item => (this.idThing = item)}
                  onClick={() => {
                    this._showContentEdit(c._id);
                  }}
                >
                  <EIcon
                    slot="media"
                    fa="trello"
                    size="45px"
                    color={c.status == true ? "green" : "red"}
                  />
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
                        <ERow>
                          <ELabel className="cfsizeLable">Tên</ELabel>
                          <EInput
                            type="text"
                            clearButton
                            value={thingId.name}
                            ref={input => (this.txtName = input)}
                            inputId="txtName"
                            onInput={e => {
                              thingId.name = e.target.value;
                              this.setState({ thingId });
                            }}
                          />
                        </ERow>
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">Trạng thái</ELabel>
                        <EToggle
                          checked={thingId.status}
                          ref={toggle => (this.tgThresholdMax = toggle)}
                          onToggleChange={e => {
                            thingId.status = !thingId.status;
                            this.setState(thingId);
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">Ngưỡng tối đa</ELabel>
                        <ERange
                          min={0}
                          max={500}
                          step={1}
                          value={thingId.threshold_max}
                          label={true}
                          dual={false}
                          color="green"
                          onRangeChanged={value => {
                            thingId.threshold_max = value;
                            this.setState({ thingId });
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">
                          Ngưỡng tối thiểu
                        </ELabel>
                        <ERange
                          min={0}
                          max={500}
                          step={1}
                          value={thingId.threshold_min}
                          label={true}
                          dual={false}
                          color="green"
                          onRangeChanged={value => {
                            thingId.threshold_min = value;
                            this.setState({ thingId });
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">Ngưỡng đặc biệt</ELabel>
                        <ERange
                          min={0}
                          max={500}
                          step={1}
                          value={thingId.threshold_special}
                          label={true}
                          dual={false}
                          color="green"
                          onRangeChanged={value => {
                            thingId.threshold_special = value;
                            this.setState({ thingId });
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">Đơn vị đo</ELabel>
                        <EInput
                          type="text"
                          clearButton
                          value={thingId.unit}
                          ref={input => (this.txtUnit = input)}
                          onInput={e => {
                            thingId.unit = e.target.value;
                            this.setState({ thingId });
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        <ELabel className="cfsizeLable">Mô Tả</ELabel>
                        <EInput
                          type="textarea"
                          value={thingId.description}
                          ref={input => (this.txtDescription = input)}
                          onInput={e => {
                            thingId.description = e.target.value;
                            this.setState({ thingId });
                          }}
                        />
                      </EListItem>
                      <EListItem>
                        {thingId.type == 1 && (
                          <div>
                            <ELabel className="cfsizeLable">
                              Các thiết bị điều khiển
                            </ELabel>
                            {switch_control.length > 0 && switch_control.map((s, index) => {
                              
                             return (
                                <ERow style={{ margin: "10px 0" }} key={index}>
                                  <ECol style={{ width: "50%" }}>
                                    <EInput
                                      type="text"
                                      clearButton
                                      value={s.name}
                                      ref={input => (this.txtName = input)}
                                      inputId="txtName"
                                      onInput={e => {
                                        s.name =
                                          e.target.value;
                                        this.setState({ switch_control });
                                      }}
                                    />
                                  </ECol>
                                  <ECol style={{ width: "50%" }}>
                                    <EToggle
                                      style={{ float: "right" }}
                                      checked={
                                        s.value == 1
                                          ? true
                                          : false
                                      }
                                      ref={toggle =>
                                        (this.tgThresholdMax = toggle)
                                      }
                                      onToggleChange={e => {
                                      
                                        s.value =
                                                 e == true
                                                    ? 1
                                                    : 0;
                                                  
                                                this.setState({
                                                  switch_control
                                                });
                                                this.handleDeviceControl(
                                                  c._id,
                                                  e,
                                                  index
                                                );
                                      }}
                                    />
                                  </ECol>
                                </ERow>
                              );
                            })}
                          </div>
                        )}
                      </EListItem>
                      <EListItem>
                        <EButton onClick={this.handleEditThing.bind(this)}>
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
            <EActionsButton onClick={this._deleteDevice.bind(this)}>
              Xoá Thiết Bị
            </EActionsButton>
          </EActionsGroup>
          <EActionsGroup>
            <EActionsButton color="red">Đóng</EActionsButton>
          </EActionsGroup>
        </EActions>
        {/* <EFab
          position="right-bottom"
          slot="fixed"
          color="yellow"
          onClick={() => {
            this.$f7.panel.close();
            this.$f7.views.main.router.navigate("/add-device");
          }}
        >
          <EIcon ios="f7:add" md="material:add" />
        </EFab> */}
      </Page>
      </div>

    );
  }
}
