import "./navbar.scss";
import React from "react";
import Axios from 'axios';
import classNames from "classnames";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container
} from "reactstrap";
import {addLineBreaks,timestampConverter} from '../../util';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
const ls = require('local-storage');
class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  currentTheme(){
    const body = document.body.classList;
    let white = true;
    Object.keys(body).map((e) => {if(body[e] === 'white-content') white = false;})
    return !white;
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    if(ls.get('c19theme'))
    {
      document.body.classList.add("white-content");
    }
    Axios.get('https://visuospace.herokuapp.com/log')
        .then( response => {
            let latest_log = response.data;
            let newNotification = false;
            if(ls.get('covid19timestamp') !== latest_log[0]['timestamp'])
            {
              newNotification = true;
              ls.set('covid19timestamp',latest_log[0]['timestamp']);
            }
            this.setState({
              log : latest_log,
              newNotification : newNotification
            });
        });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  renderLog = (flag) => {
    if(flag)
    {
      return  flag.map((element,index) => {
                  return(
                  <DropdownItem className="nav-item" key={index}
                                style={{fontSize: '12px'}}>
                    <div style={{fontWeight: 'bold'}}>{ " "+timeAgo.format(new Date(element['timestamp']*1000))+" " }</div>
                    <div style={{overflow : 'hidden'}}> 
                    {addLineBreaks(element['update'].substr(0, element.update.length - 1))} </div>
                  </DropdownItem>
                  );
                });
    }
    else return (
      <NavLink>Loading.....</NavLink>
    );
  }
  activateMode = () => {
    const theme = this.currentTheme();
    if(!theme) 
    {
      document.body.classList.add("white-content");
      ls('c19theme','1');
    }
    else 
    {
      document.body.classList.remove("white-content");
      ls.remove('c19theme');
    }
    window.location.reload();
  };

  newNotification = () => {
    if(this.state.newNotification === true) return <div className="notification d-none d-lg-block d-xl-block" />;
  }

  clearNotification = () => {
    this.setState({newNotification : false});
  }

  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
              {/*<InputGroup className="search-bar">
                  <Button
                    color="link"
                    id="search-button"
                    onClick={this.activateMode}
                  >
                    <i className="tim-icons icon-bulb-63" />
                    <span className="d-lg-none d-md-block">Theme</span>
                  </Button>
              </InputGroup> */}
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={this.clearNotification}
                  >
                    {this.newNotification()}
                    <i className="tim-icons icon-bell-55" />
                    <p className="d-lg-none">Notifications</p>
            
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {this.renderLog(this.state.log)}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <li className="separator d-lg-none" />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
};

export default Template;

