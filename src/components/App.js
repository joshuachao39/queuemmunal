import React from 'react';
import MobileContainer from './MobileContainer'
import DesktopContainer from './DesktopContainer'
import '../styles/App.css';
import $ from 'jquery';

var App = React.createClass({
  render() {
    /*return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    ); */
    if (this.state.width > 480 || this.state.width > this.state.height) {
      return (
        <div className="flexContainer">
          <DesktopContainer />
        </div>
      );
    } else {
      return (
        <MobileContainer />
      );
    }
  },
  updateDimensions(){
    this.setState({
      width: $(window).width(),
      height: $(window).height()
    });
  },
  componentWillMount() {
    this.updateDimensions();
  },
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  },
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
});

export default App;
