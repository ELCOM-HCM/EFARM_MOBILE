import React from "react";
import { Page, Navbar, Block } from "efw-react";

export default () => (
  <div>
    <Navbar title="Not found" backLink="Back" />
    <Page>
      <Block strong>
        <p>Sorry</p>
        <p>Requested content not found.</p>
      </Block>
    </Page>
  </div>
);
