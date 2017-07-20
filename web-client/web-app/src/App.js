import React, { Component } from 'react';

import TopBar from './components/TopBar'
import SideBar from './components/SideBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <SideBar />
      </div>
    );
  }
}

export default App;
