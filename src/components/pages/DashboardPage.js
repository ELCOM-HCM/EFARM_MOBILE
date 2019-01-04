import React, { Component } from "react";
import {
  EPage,
  ECard,
  ECardHeader,
  ECardContent,
  ECardFooter,
  ERow,
  ECol,
  EBlock,
  EIcon,
  EList,
  EToggle
} from "../Widget";
import $ from "jquery";
import Common from "../../utils/Common";
import Navbar from "../Navbar";
import moment from "moment";
import ChartLiquidFillGauge from "./../chart/ChartLiquidFillGauge";
import MultipleLineChart from "./../chart/MultipleLineChart";
import ThermometerChar from "./../chart/ThermometerChar";
import GaugeChart from "./../chart/GaugeChart";
import ReactSpeedometer from "react-d3-speedometer";
import { Temperature,PM} from "react-environment-chart";
export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.today = new Date();
    this.state = {
      data: {},
      listHashBoarHead: [],
      arrOfThing: [],
      arrHistogramOfThing: [],
      listHistogram: [],
      arrDeviceFarm: []
    };
    this.swiper = null;
  }
  converStringToArray(string) {
   try{
    return Array.from(string).filter(c => c != "," && c != "[" && c != "]");
   }catch{

   }
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
    let now = new Date();
    this._getListDashBoardHead();
    this.onSheetClick(moment(now), moment(now));
    this._getDeviceFarm();
    Common.SOCKET.emit(
      "sendThingsValues",
      JSON.parse(localStorage.getItem("user")).farm_id
    );
    Common.SOCKET.on("receiveThingsValues", data => {
      let { arrDeviceFarm } = this.state;
      arrDeviceFarm.map((c, index) => {
        if (c.type == 1) {
          try{
            let arrStatus = this.converStringToArray(data[index].value);
            c.switch_control.map((d, index) => {
              d.value = arrStatus[index];
            });
          }catch{

          }
        
        }
      });
      this.setState({ listHashBoarHead: data, arrDeviceFarm });
    });

    $("#rowChartGauge").each(function() {
      var highestBox = 0;
      $(".col-50", this).each(function() {
        if ($(this).height() > highestBox) {
          highestBox = $(this).height();
        }
      });

      // Set the height of all those children to whichever was highest
      $(".col-50", this).height(highestBox);
    });
  }
  async _getListDashBoardHead() {
    let objDashBoardHead = {
      method: "POST",
      url: "device/values/" + JSON.parse(localStorage.getItem("user")).farm_id
    };

    await Common.request(objDashBoardHead)
      .then(arr => {
        // let objPH = arr.filter(c => c.unit == "PH")[0];

        arr.map(c => {
          this._getHistogramOfThing(c._id);
        });

        this.setState({ listHashBoarHead: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _getHistogramOfThing(_idThing) {
    let { arrHistogramOfThing } = this.state;
    let date_from = moment(this.today)
      .subtract(1, "weeks")
      .startOf("isoWeek")
      .format("YYYY/MM/DD hh:mm:ss");

    let date_to = moment(this.today)
      .subtract(1, "weeks")
      .endOf("isoWeek")
      .format("YYYY/MM/DD hh:mm:ss");
    let typeDate = "Days";
    let objHistogramOfThing = {
      method: "POST",
      data: {
        _id: _idThing,
        date_from: date_from,
        date_to: date_to,
        type: typeDate
      },
      url: "device/histogram/" + _idThing
    };

    Common.request(objHistogramOfThing)
      .then(arr => {
        arrHistogramOfThing.push(arr);
        this.setState({ arrHistogramOfThing });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleDeviceControl(id_thing, method, index) {
    let methodUpdate = "OFF";
    if (method == true) {
      methodUpdate = "On";
    } else {
      methodUpdate = "Off";
    }
    let objSwitchControl = {
      method: "POST",
      data: { id: id_thing, method: methodUpdate, index: index },
      url: "device/control/"
    };

    Common.request(objSwitchControl)
      .then(arr => {})
      .catch(err => {
        console.log(err);
      });
  }

  async onSheetClick(dateFrom, dateTo) {
    let _id = JSON.parse(localStorage.getItem("user")).farm_id;
    let dateToFormat = moment(dateTo).format("YYYY/MM/DD hh:mm:ss");
    let dateFromFormat = moment(dateFrom).format("YYYY/MM/DD hh:mm:ss");
    let typeDate = "Days";
    let objDashboard = {
      method: "POST",
      url: "device/histogram/all",
      data: {
        _id: _id,
        date_from: dateFromFormat,
        date_to: dateToFormat,
        type: typeDate
      }
    };

    await Common.request(objDashboard)
      .then(result => {
        this.setState({ listHistogram: result });
      })
      .catch(error => {
        this._showToast("Dữ liệu trong trang chủ bị rỗng");
        console.log(error);
      });
  }
  async _getDeviceFarm() {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: "device/all/" + JSON.parse(localStorage.getItem("user")).farm_id
    };
    await Common.request(objDeviceFarm)
      .then(arr => {
        this.setState({ arrDeviceFarm: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    let {
      listHashBoarHead,
      arrHistogramOfThing,
      listHistogram,
      arrDeviceFarm
    } = this.state;

    return (
      <div>
        <Navbar
          title="Dữ Liệu"
          showNavRight
          onSheetClick={this.onSheetClick.bind(this)}
        />
        <EPage>
          <ERow
            id="rowChartGauge"
            style={{
              textAlign: "center"
            }}
          >
            {listHashBoarHead.map((c, index) => {
              return arrHistogramOfThing.map((d, indexD) => {
                if (index == indexD && c.type != 1) {
                  switch (c.value_name) {
                    case "PH":
                      {
                        return (
                          <ECol width="100" key={index}>
                            <ECard
                              style={{
                                margin: 2,
                                height: 392,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                              }}
                            >
                              <ECardContent>
                                <ReactSpeedometer
                                  maxValue={c.threshold_max}
                                  value={c.value == null ? 0 : c.value}
                                  needleColor="red"
                                  startColor="green"
                                  segments={10}
                                  endColor="blue"
                                  height={200}
                                />
                                <h4 style={{ overflow: "hidden" }}>{c.name}</h4>
                                <p>{`${c.value_name} : ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardContent>
                              <ECardFooter>
                                <EIcon fa="address-book" size="25px" />
                                <p>{`Hôm nay: ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardFooter>
                            </ECard>
                          </ECol>
                        );
                      }
                      break;
                    case "Temperature":
                      {
                        return (
                          <ECol width="50" key={index}>
                            <ECard
                              style={{
                                margin: 2,
                                height: 392,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                              }}
                            >
                              <ECardContent>
                                {/* <ThermometerChar
                               valueMin={d.threshold_min}
                               valueMax={d.threshold_max}
                               valueChart={c.value == null ? 0 : c.value}
                             /> */}
                                <Temperature value={c.value} height={220} />
                                <h4 style={{ overflow: "hidden" }}>{c.name}</h4>
                                <p>{`${c.value_name} : ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardContent>
                              <ECardFooter>
                                <EIcon fa="address-book" size="25px" />
                                <p>{`Hôm nay : ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardFooter>
                            </ECard>
                          </ECol>
                        );
                      }
                      break;
                    case "Humidity":
                      {
                        return (
                          <ECol width="50" key={index}>
                            <ECard
                              style={{
                                margin: 2,
                                height: 392,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                              }}
                            >
                              <ECardContent>
                                <ChartLiquidFillGauge valueChart={c.value} />
                                <h4 style={{ overflow: "hidden" }}>{c.name}</h4>
                                <p>{`${c.value_name} : ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardContent>
                              <ECardFooter>
                                <EIcon fa="address-book" size="25px" />
                                <p>{`Hôm nay: ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardFooter>
                            </ECard>
                          </ECol>
                        );
                      }
                      break;
                    case "EC":
                      {
                        return (
                          <ECol width="50" key={index}>
                            <ECard
                              style={{
                                margin: 2,
                                height: 392,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column"
                              }}
                            >
                              <ECardContent>
                                <GaugeChart
                                  valueChart={c.value}
                                  valueMax={d.threshold_max}
                                />
                                <h4 style={{ overflow: "hidden" }}>{c.name}</h4>
                                <p>{`${c.value_name} : ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardContent>
                              <ECardFooter>
                                <EIcon fa="address-book" size="25px" />
                                <p>{`Hôm nay: ${
                                  c.value == null ? 0 : c.value
                                } ${c.unit}`}</p>
                              </ECardFooter>
                            </ECard>
                          </ECol>
                        );
                      }
                      break;
                    default:
                      return (
                        <ECol width="50" key={index}>
                          <ECard
                            style={{
                              margin: 2,
                              height: 392,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column"
                            }}
                          >
                            <ECardContent>
                              <PM value={c.value} height={150} />
                              {/* <ChartLiquidFillGauge valueChart={c.value} /> */}
                              <h4 style={{ overflow: "hidden" }}>{c.name}</h4>
                              <p>{`${c.value_name} : ${
                                c.value == null ? 0 : c.value
                              } ${c.unit}`}</p>
                            </ECardContent>
                            <ECardFooter>
                              <EIcon fa="address-book" size="25px" />
                              <p>{`Hôm nay: ${c.value == null ? 0 : c.value} ${
                                c.unit
                              }`}</p>
                            </ECardFooter>
                          </ECard>
                        </ECol>
                      );
                  }
                }
              });
            })}
          </ERow>

          <ECard>
            <ECardContent>
              {arrDeviceFarm.map((c, index) => {
                if (c.type == 1) {
                  return (
                    <ERow key={index}>
                      <strong>{c.name}</strong>
                      <ECol key={index}>
                        {c.switch_control.map((s, indexCtr) => {
                          return (
                            <ERow key={indexCtr} style={{ margin: 10 }}>
                              <ECol width="50">
                                <span>{s.name}</span>
                              </ECol>
                              <ECol
                                width="50"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end"
                                }}
                              >
                                <EToggle
                                  checked={s.value == 1 ? true : false}
                                  onToggleChange={e => {
                                    s.value = e == true ? 1 : 0;
                                    this.handleDeviceControl(
                                      c._id,
                                      e,
                                      indexCtr
                                    );
                                  }}
                                />
                              </ECol>
                            </ERow>
                          );
                        })}
                      </ECol>
                    </ERow>
                  );
                }
              })}
            </ECardContent>
          </ECard>

          <EBlock>
            <MultipleLineChart listHistogram={listHistogram} />
          </EBlock>
        </EPage>
      </div>
    );
  }
}
