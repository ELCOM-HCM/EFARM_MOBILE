/* eslint-disable react/display-name */
import React, { Component } from "react";
import {
  ENavbar,
  ENavLeft,
  ENavTitle,
  ENavRight,
  ELink,
  EIcon
} from "./Widget";
import Sheet from "./Sheet";
import Popup from "./Popup";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetOpened: false
    };
  }

  render() {
    let { sheetOpened } = this.state;
    // eslint-disable-next-line react/prop-types
    const { title, showNavRight } = this.props;
    return (
      <React.Fragment>
        <ENavbar>
          <ENavLeft>
            <ELink panelOpen="left">
              <EIcon ios="f7:menu" md="material:menu" />
            </ELink>
          </ENavLeft>
          <ENavTitle>{title}</ENavTitle>
          <ENavRight>
            {showNavRight && (
              <ELink
                onClick={() => {
                  this.setState({ sheetOpened: !sheetOpened });
                }}
              >
                <EIcon ios="f7:more_vertical" md="material:more_vert" />
              </ELink>
            )}
          </ENavRight>
        </ENavbar>
        <Sheet
          opened={sheetOpened}
          onSheetClosed={() => {
            this.setState({ sheetOpened: false });

          }}
          onSheetClick={this.props.onSheetClick}
        />
      </React.Fragment>
    );
  }
}
