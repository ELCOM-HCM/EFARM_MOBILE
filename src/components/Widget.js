import React, { Component } from "react";
import {
  App,
  View,
  Page,
  PageContent,
  Statusbar,
  Block,
  BlockTitle,
  BlockHeader,
  BlockFooter,
  Toolbar,
  Panel,
  Icon,
  Input,
  Button,
  Link,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  List,
  ListItem,
  ListGroup,
  LoginScreenTitle,
  Range,
  Row,
  Col,
  Label,
  Toggle,
  Fab,
  FabButtons,
  FabButton,
  Sheet,
  AccordionContent,
  SwipeoutActions,
  SwipeoutButton,
  Actions,
  ActionsGroup,
  ActionsButton,
  ActionsLabel,
  Popup
} from "efw-react";
export class EApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <App {...this.props} />;
  }
}
export class EView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View {...this.props} />;
  }
}
export class EPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Page {...this.props} />;
  }
}
export class EPageContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <PageContent {...this.props} />;
  }
}
export class EBlock extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Block {...this.props} />;
  }
}
export class EBlockTitle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BlockTitle {...this.props} />;
  }
}
export class EBlockHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BlockHeader {...this.props} />;
  }
}
export class EBlockFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <BlockFooter {...this.props} />;
  }
}
export class EStatusbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Statusbar {...this.props} />;
  }
}
export class EToolbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Toolbar {...this.props} />;
  }
}
export class EPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Panel {...this.props} />;
  }
}
export class EIcon extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Icon {...this.props} />;
  }
}
export class EInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Input {...this.props} />;
  }
}
/**
 * iconSize	string or Number
 * iconColor	string
 * iconIos
 * iconMd
 * round	boolean	false	Makes button round
 * roundIos	boolean	false	Makes button round for iOS theme only
 * roundMd
 * big	boolean	false	Makes big button
 * bigIos	boolean	false	Makes big button for iOS theme only
 * bigMd boolean	false
 */
export class EButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Button {...this.props} />;
  }
}
export class ELink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Link {...this.props} />;
  }
}
export class ECard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Card {...this.props} />;
  }
}
export class ECardHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <CardHeader {...this.props} />;
  }
}
export class ECardContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <CardContent {...this.props} />;
  }
}
export class ECardFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <CardFooter {...this.props} />;
  }
}
export class ENavbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Navbar {...this.props} />;
  }
}
export class ENavLeft extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <NavLeft {...this.props} />;
  }
}
export class ENavRight extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <NavRight {...this.props} />;
  }
}
export class ENavTitle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <NavTitle {...this.props} />;
  }
}
export class EList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <List {...this.props} />;
  }
}
export class EListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ListItem {...this.props} />;
  }
}
export class EListGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ListGroup {...this.props} />;
  }
}
export class ELoginScreenTitle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <LoginScreenTitle {...this.props} />;
  }
}
/**
 * Properties
 * value	number array string		Range Slider value, must be array in case of dual range slider
 * min	number
 * string		Minimum value
 * max	number string		Maximum value
 * step	number string	1	Maximum value
 * label	boolean	false	Enables additional label around range slider knob
 * dual	boolean	false	Enables dual range slider
 * draggableBar	boolean	true	When enabled it is also possible to interact with range slider (change value) on range bar click and swipe.
 * disabled	boolean	false	Defines whether the range slider is disabled or not
 * id	string		Range slider element ID attribute
 * input	boolean	false	If enabled, then it will render input type="range" element inside as well
 * inputId
 * @example
 * <Range
      min={0}
      max={500}
      step={1}
      value={[this.state.min, this.state.max]}
      label={true}
      dual={true}
      color="green"
      onRangeChange={this.onRangeChange.bind(this)}
      ></Range>
    onRangeChange(values) {
    this.setState({
      min: values[0],
      max: values[1],
    });
  }
 */
export class ERange extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Range {...this.props} />;
  }
}
/**
 * Properties
 * {noGap}	boolean	false	Removes spacing between columns
 * {tag}	string	div	Defines which tag must be used to render row element
 */
export class ERow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Row {...this.props} />;
  }
}
/**
 * Properties
 * {width}	number string	auto	Column width. Check available Column Sizes
 * {tabletWidth}	number string		Column width for large screen tablets (when width >= 768px)
 * {desktopWidth}	number string		Column width for larger screen tablets (when width >= 1025px)
 */
export class ECol extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Col {...this.props} />;
  }
}
export class ELabel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Label {...this.props} />;
  }
}
/**
 * Properties
 * init	boolean	true	Initializes Toggle
 * name	string		Toggle input name
 * value	string
 * number		Toggle input value
 * checked	boolean	false	Defines whether the toggle input is checked or not
 * disabled	boolean	false	Defines whether the toggle input is disabled or not
 * readonly	boolean	false	Defines whether the toggle input is readonly or not
 */
export class EToggle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Toggle {...this.props} />;
  }
}
export class EFab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Fab {...this.props} />;
  }
}
export class EFabButtons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <FabButtons {...this.props} />;
  }
}
export class EFabButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <FabButton {...this.props} />;
  }
}
export class ESheet extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Sheet {...this.props} />;
  }
}
export class EAccordionContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <AccordionContent {...this.props} />;
  }
}
export class ESwipeoutActions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SwipeoutActions {...this.props} />;
  }
}
export class ESwipeoutButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SwipeoutButton {...this.props} />;
  }
}
export class EActions extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Actions {...this.props} />;
  }
}
export class EActionsGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ActionsGroup {...this.props} />;
  }
}
export class EActionsLabel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ActionsLabel {...this.props} />;
  }
}
export class EActionsButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ActionsButton {...this.props} />;
  }
}
export class EPopup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Popup {...this.props} />;
  }
}
