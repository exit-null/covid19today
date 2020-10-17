import React    from "react";
import Template from "./navbar.jsx";

class navbar extends React.Component {
  render() {
    return <Template {...this.props}/>;
  }
}

export default navbar;
