import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

//Components
import Sidebar from "../components/sidebar/sidebar";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar";

//Routes
import routes from "../routes.js";

//Logo
import logo from "../assets/img/logo.PNG";

class Main extends React.Component
{
    constructor(props) {
       super(props);
       this.state = {
         backgroundColor: "blue",
         sidebarOpened:
           document.documentElement.className.indexOf("nav-open") !== -1
       };
    }

  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
      else if(routes[i].layout == '/state/')
      {
        return "COVID-19 India";
      }
    }
    return "";
  };
  render() {
      
      return (
      <>
      <div className="wrapper">
      <Sidebar {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "",
              text: "Covid19Today",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
          <Navbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
          <Switch>
              {this.getRoutes(routes)}
              <Redirect from="*" to="/india"/>
          </Switch>
          </div>
      </div>
      <Footer />
      </>
      );
    } 
}

export default Main;
