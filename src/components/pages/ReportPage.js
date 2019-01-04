import React, { Component } from "react";
import $ from "jquery";
import {
  EPage,
  EList,
  EInput,
  ELabel,
  EBlock,
  EListItem,
  EIcon,
  EFab,
  EButton,
  EFabButton,

} from "../Widget";
import moment from "moment";
import { FabButtons } from "efw-react";
import Navbar from "../Navbar";
import ReactTable from "react-table";
import "react-table/react-table.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Common from "../../utils/Common";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDeviceFarm: [],
      dateFrom: "",
      dateTo: "",
      slDevice: [],
      arrReportHistogram: [],
      dataReport: [],
      dataTitle: []
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
  componentWillMount() {
    let today=new Date();
    let dateTo = moment(today)
      .endOf("week")
      .format("YYYY-MM-DD");
    let dateFrom = moment(today)
      .startOf("week")
      .format("YYYY-MM-DD");
    $("#thisWeek").prop("checked", true);
    this.setState({ dateFrom: dateFrom, dateTo: dateTo });
  }
  componentDidMount() {
    this._getDeviceFarm();
  }
  _getDeviceFarm() {
    let objDeviceFarm = {
      method: "POST",
      data: {},
      url: "device/all/" + JSON.parse(localStorage.getItem("user")).farm_id
    };
    Common.request(objDeviceFarm)
      .then(arr => {
        let { slDevice } = this.state;
        let arrDevice = [];
        arr.map((c, index) => {
          arrDevice.push(c._id);
        });
        slDevice.push(arrDevice[0]);
        this.handleReportDefault(slDevice[0]);
        this.setState({ arrDeviceFarm: arr, slDevice });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _handleExportExcel() {
    let { dateFrom, dateTo } = this.state;
    let { selectThing } = this.state;
    let objExcel = {
      method: "GET",
      url: "report/download/excel/",
      data: {
        _id: selectThing,
        date_from: dateFrom,
        date_to: dateTo,
        type: "Days"
      }
    };

    Common.requestDownload(objExcel).then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "filename.xlsx";
      // we need to append the element to the dom -> otherwise it will not work in firefox
      document.body.appendChild(a);
      a.click();
      a.remove(); //afterwards we remove the element again
    });
  }
  async _handleExportPdf() {
    // try{
    let { dateFrom, dateTo } = this.state;
    var docDefinition = {
      header: {
        text: JSON.parse(localStorage.getItem("user")).name,
        alignment: "left",
        margin: [10, 0, 10, 0]
      },
      footer: function() {
        return {
          columns: [
            {
              text: JSON.parse(localStorage.getItem("farm")).name,
              alignment: "left",
              margin: [10, 0, 10, 0]
            },
            {
              text: dateFrom + " đến " + dateTo,
              alignment: "right",
              margin: [10, 0, 10, 0]
            }
          ]
        };
      },
      info: {
        author: "elcom",
        creator: "elcom",
        producer: "elcom"
      },
      content: [],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          fillColor: "#1ebfae",
          color: "#ffffff"
        }
      }
    };
    let column = [];
    let arrTitle = [];
    let { arrReportHistogram } = this.state;
    let dataReport = [];
    if (
      Object.keys(arrReportHistogram).length > 1 &&
      arrReportHistogram.keys != undefined
    ) {
      dataReport = arrReportHistogram.keys.map((key, index) => {
        let obj = [key];

        arrReportHistogram[key].map((c, index) => {
          obj.push(Number(c.value));
        });
        return obj;
      });

      column = arrReportHistogram.keys.map(key => {
        arrTitle = [];
        let date = "Thời gian cập nhật";
        arrTitle.push(date);
        arrReportHistogram[key].map((c, index) => {
          arrTitle.push(c.name);
        });
        return arrTitle;
      });
    }
    dataReport.unshift(column[0]);
    let content = [
      {
        text:
          "BÁO CÁO THỐNG KÊ CÁC THIẾT BỊ SỬ DỤNG TRONG " +
          JSON.parse(localStorage.getItem("farm")).name,
        alignment: "center",
        margin: 20
      },
      {
        widths: ["*"],
        alignment: "center",
        table: {
          headerRows: 1,
          body: dataReport,
          layout: {
            hLineWidth: function(i, node) {
              return i === 0 || i === node.table.body.length ? 2 : 1;
            },
            vLineWidth: function(i, node) {
              return i === 0 || i === node.table.widths.length ? 2 : 1;
            },
            hLineColor: function(i, node) {
              return "black";
            },
            vLineColor: function(i, node) {
              return "black";
            },
            hLineStyle: function(i, node) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return { dash: { length: 10, space: 4 } };
            },
            vLineStyle: function(i, node) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return { dash: { length: 4 } };
            }
          }
        }
      }
    ];
    docDefinition.content.push(content);
    pdfMake.createPdf(docDefinition).download("report.pdf");

    // catch{

    // }
  }
  handleReportDate() {
    let { slDevice, dateFrom, dateTo } = this.state;

    let objReport = {
      method: "POST",
      data: {
        _id: slDevice,
        date_from: dateFrom,
        date_to: dateTo,
        type: "Days"
      },
      url: "report/histogram/"
    };

    Common.request(objReport)
      .then(arr => {
        this.handleViewReportTable(arr);
        this.setState({ arrReportHistogram: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleReportDefault(idDevice) {
    let today = new Date();

    let dateTo = moment(today)
      .endOf("week")
      .format("YYYY-MM-DD");
    let dateFrom = moment(today)
      .startOf("week")
      .format("YYYY-MM-DD");
    $("#thisWeek").prop("checked", true);

    let objReport = {
      method: "POST",
      data: {
        _id: [idDevice],
        date_from: dateFrom,
        date_to: dateTo,
        type: "Days"
      },
      url: "report/histogram/"
    };
    
    Common.request(objReport)
      .then(arr => {
        this.handleViewReportTable(arr);
        this.setState({ arrReportHistogram: arr });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleViewReportTable(arrReportHistogram) {
    let dataReport = [];
    let column = [];
    if (Object.keys(arrReportHistogram).length > 1) {
      dataReport = arrReportHistogram.keys.map((key, index) => {
        let obj = {
          date: key
        };
        arrReportHistogram[key].map((c, index) => {
          obj[`value_${index}`] = Number(c.value);
        });
        return obj;
      });

      column = arrReportHistogram.keys.map(key => {
        let arrTitle = [];
        let date = {
          Header: "Thời gian cập nhật",
          accessor: "date"
        };
        arrTitle.push(date);
        arrReportHistogram[key].map((c, index) => {
          let objTitle = {};
          objTitle.Header = c.name;
          objTitle.accessor = `value_${index}`;
          arrTitle.push(objTitle);
        });
        return arrTitle;
      });
      this.setState({ dataReport: dataReport, dataTitle: column });
    }
  }
  exportExcel() {
    console.log("OK");
  }
  render() {
    const data = [
      {
        name: "Tanner Linsley",
        age: 26,
        friend: {
          name: "Jason Maurer",
          age: 23
        }
      }
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "name" // String-based value accessors!
      },
      {
        Header: "Age",
        accessor: "age",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: "friendName", // Required because our accessor is not a string
        Header: "Friend Name",
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: "friend.age"
      }
    ];
    let {
      dateTo,
      dateFrom,
      arrDeviceFarm,
      slDevice,
      dataReport,
      dataTitle,
      arrReportHistogram
    } = this.state;

    return (
      <div>
          <Navbar title="Báo Cáo" />
          <EPage>
      
      <EBlock>
        <EList media-list chevronCenter={true}>
          <ul>
            <EListItem itemInput inlineLabel>
              <EIcon fa="android" size="25px" slot="media" />
              <ELabel inline>Thiết Bị</ELabel>
              {arrDeviceFarm.length > 0 && (
                <EInput
                  media
                  inputId="slDevice"
                  type="select"
                  value={slDevice[0]}
                  onChange={e => {
                    slDevice[0] = e.target.value;
                    this.setState({ slDevice });
                  }}
                >
                  {arrDeviceFarm.map((f, index) => {
                    return (
                      <option key={index} value={f._id}>
                        {f.name}
                      </option>
                    );
                  })}
                </EInput>
              )}
            </EListItem>
            <EListItem itemInput inlineLabel>
              <EIcon fa="calendar" size="25px" slot="media" />
              <ELabel inline>Bắt Đầu</ELabel>
              <EInput
                type="date"
                inputId="date-from"
                value={dateFrom}
                onChange={e => {
                  this.setState({ dateFrom: e.target.value });
                }}
              />
            </EListItem>
            <EListItem itemInput inlineLabel>
              <EIcon fa="calendar" size="25px" slot="media" />
              <ELabel inline>Kết Thúc</ELabel>
              <EInput
                type="date"
                inputId="date-to"
                value={dateTo}
                onChange={e => {
                  this.setState({ dateTo: e.target.value });
                }}
              />
            </EListItem>
          </ul>
        </EList>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <EButton
            style={{ display: "inline-block" }}
            onClick={this.handleReportDate.bind(this)}
          >
            Lọc báo cáo
          </EButton>
        </div>
      </EBlock>
      {(Object.keys(arrReportHistogram).length > 1 &&
      dataReport.length > 1 &&
      dataTitle.length > 1)?(
        <ReactTable
          defaultPageSize={5}
          data={dataReport}
          columns={dataTitle[0]}
        />
      ):<ELabel style={{textAlign:"center"}}>Dữ liệu không có. Vui lòng chọn ngày hoặc thiết bị khác</ELabel>}
      <EFab position="right-bottom" slot="fixed" color="orange">
        <EIcon ios="f7:document_chart" md="material:import_export" />
        <EIcon ios="f7:close" md="material:close" />
        <FabButtons position="top">
          <EFabButton
            onClick={this._handleExportExcel.bind(this)}
            label="Xuất Excel"
          >
            Excel
          </EFabButton>
          <EFabButton
            label="Xuất PDF"
            onClick={this._handleExportPdf.bind(this)}
          >
            PDF
          </EFabButton>
        </FabButtons>
      </EFab>
      {/* <EFab position="right-bottom" slot="fixed" color="yellow">
        <EIcon ios="f7:document_chart" md="material:import_export" />
        <EIcon ios="f7:close" md="material:close" />import { TableBody } from '@material-ui/core/TableBody';

        <EFabButtons position="left">
          <EFabButton
            onClick={this.exportExcel.bind(this)}
            label="Xuất Excel"
          >
            Excel
          </EFabButton>
          <EFabButton label="Xuất PDF">PDF</EFabButton>
        </EFabButtons>
      </EFab> */}
    </EPage>
      </div>
 
    );
  }
}
