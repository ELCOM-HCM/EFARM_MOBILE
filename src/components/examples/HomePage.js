import React from "react";
import {
  EPage,
  ENavbar,
  ENavLeft,
  ENavTitle,
  ENavRight,
  ELink,
  EToolbar,
  EBlock,
  EBlockTitle,
  EList,
  EListItem,
  ERow,
  ECol,
  EButton
} from "../Widget";

export default () => (
  <EPage>
    <ENavbar>
      <ENavLeft>
        <ELink iconIos="f7:menu" iconMd="material:menu" panelOpen="left" />
      </ENavLeft>
      <ENavTitle>My App</ENavTitle>
      <ENavRight>
        <SLink iconIos="f7:menu" iconMd="material:menu" panelOpen="right" />
      </ENavRight>
    </ENavbar>
    <EToolbar>
      <ELink>Left Link</ELink>
      <ELink>Right Link</ELink>
    </EToolbar>
    <EBlock strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </EBlock>
    <EBlockTitle>Navigation</EBlockTitle>
    <EList>
      <EListItem link="/about/" title="About" />
      <EListItem link="/form/" title="Form" />
    </EList>
    <EBlockTitle>Modals</EBlockTitle>
    <EBlock strong>
      <ERow>
        <ECol width="50">
          <EButton fill raised popupOpen="#popup">
            Popup
          </EButton>
        </ECol>
        <ECol width="50">
          <EButton fill raised loginScreenOpen="#login-screen">
            Login Screen
          </EButton>
        </ECol>
      </ERow>
    </EBlock>
    <EBlockTitle>Panels</EBlockTitle>
    <EBlock strong>
      <ERow>
        <ECol width="50">
          <EButton fill raised panelOpen="left">
            Left Panel
          </EButton>
        </ECol>
        <ECol width="50">
          <EButton fill raised panelOpen="right">
            Right Panel
          </EButton>
        </ECol>
      </ERow>
    </EBlock>
    <EList>
      <EListItem
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
        title="Dynamic Route"
      />
      <EListItem
        link="/load-something-that-doesnt-exist/"
        title="Default Route (404)"
      />
    </EList>
  </EPage>
);
