import React, { Component } from "react";
import $ from "jquery";
import {
  ESheet,
  EToolbar,
  EPageContent,
  ELink,
  EList,
  EListItem,
  EInput,
  ELabel,
  EListGroup,
  ERow,
  ECol
} from "./Widget";
import moment from "moment";
// eslint-disable-next-line react/display-name
export default class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTo: "",
      dateFrom: ""
    };
  }
  onSheetClick() {
    let dateTo = $("#date-to").val();
    let dateFrom = $("#date-from").val();
    this.props.onSheetClick(dateFrom, dateTo);
  }
  componentDidMount() {
    let { dateTo, dateFrom } = this.state;
    let today = new Date();
    $("#today").prop("checked", true);
    dateTo = moment(today).format("YYYY-MM-DD");
    dateFrom = moment(today).format("YYYY-MM-DD");
    this.setState({ dateFrom, dateTo });
  }
  renderDate(type) {
    let { dateTo, dateFrom } = this.state;
    let today = new Date();
    switch (type) {
      case "today":
        {
          dateTo = moment(today).format("YYYY-MM-DD");
          dateFrom = moment(today).format("YYYY-MM-DD");
          $("#today").prop("checked", true);
        }
        break;
      case "yesterday":
        {
          dateFrom = moment(today)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          dateTo = moment(today)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
          $("#yesterday").prop("checked", true);
        }
        break;
      case "thisWeek":
        {
          dateTo = moment(today)
            .endOf("week")
            .format("YYYY-MM-DD");
          dateFrom = moment(today)
            .startOf("week")
            .format("YYYY-MM-DD");
          $("#thisWeek").prop("checked", true);
        }
        break;
      case "lastWeek":
        {
          dateFrom = moment(today)
            .subtract(1, "weeks")
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
          dateTo = moment(today)
            .subtract(1, "weeks")
            .endOf("isoWeek")
            .format("YYYY-MM-DD");
          $("#lastWeek").prop("checked", true);
        }
        break;
      case "thisMonth":
        {
          dateTo = moment(today)
            .endOf("month")
            .format("YYYY-MM-DD");
          dateFrom = moment(today)
            .startOf("month")
            .format("YYYY-MM-DD");

          $("#thisMonth").prop("checked", true);
        }
        break;
      case "lastMonth":
        {
          dateFrom = moment(today)
            .subtract(1, "month")
            .startOf("month")
            .format("YYYY-MM-DD");
          dateTo = moment(today)
            .subtract(1, "month")
            .endOf("month")
            .format("YYYY-MM-DD");
          $("#lastMonth").prop("checked", true);
        }
        break;
    }
    this.setState({ dateFrom, dateTo });
  }
  render() {
    let { opened } = this.props;
    let { dateFrom, dateTo } = this.state;
    return (
      <ESheet opened={opened} onSheetClosed={this.props.onSheetClosed}>
        <EToolbar>
          <div className="left" />
          <div className="right">
            <ELink sheetClose onClick={this.onSheetClick.bind(this)}>
              Chọn
            </ELink>
          </div>
        </EToolbar>
        <EPageContent style={{ paddingBottom: "0px" }}>
          <EList style={{ marginTop: "0px" }}>
            <ul>
              <EListItem
                radio
                title="Hôm Nay"
                name="radioDate"
                value="today"
                defaultChecked
                onClick={() => {
                  this.renderDate("today");
                }}
              />
              <EListItem
                radio
                title="Hôm Qua"
                name="radioDate"
                value="yesterday"
                onClick={() => {
                  this.renderDate("yesterday");
                }}
              />
              <EListItem
                radio
                title="Tuần Này"
                name="radioDate"
                value="thisWeek"
                onClick={() => {
                  this.renderDate("thisWeek");
                }}
              />

              <EListItem
                radio
                title="Tuần Trước"
                name="radioDate"
                value="lastWeek"
                onClick={() => {
                  this.renderDate("lastWeek");
                }}
              />
               <EListItem
                radio
                title="Tháng Này"
                name="radioDate"
                value="thisMonth"
                onClick={() => {
                  this.renderDate("thisMonth");
                }}
              />
                 <EListItem
                radio
                title="Tháng Trước"
                name="radioDate"
                value="lastMonth"
                onClick={() => {
                  this.renderDate("lastMonth");
                }}
              />
           
            </ul>
            <EListGroup>
              <EListItem title="Chọn Ngày" groupTitle />
              <EListItem>
                <ELabel>Ngày Bắt Đầu</ELabel>
                <EInput
                  type="date"
                  inputId="date-from"
                  value={dateFrom}
                  onChange={e => {
                    this.setState({ dateFrom: e.target.value });
                  }}
                />
              </EListItem>
              <EListItem>
                <ELabel>Ngày Kết Thúc</ELabel>
                <EInput
                  type="date"
                  inputId="date-to"
                  value={dateTo}
                  onChange={e => {
                    this.setState({ dateTo: e.target.value });
                  }}
                />
              </EListItem>
            </EListGroup>
          </EList>
        </EPageContent>
      </ESheet>
    );
  }
}
