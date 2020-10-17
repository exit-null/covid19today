import React from 'react';
import Main from './layouts/main';

import "./assets/css/nucleo-icons.css";
import "./assets/scss/black-dashboard-react.scss";

class App extends React.Component {
  render(){
    return (
      <div className="">
      <Main {...this.props}/> 
      </div>
    );
  }
}

export default App;
