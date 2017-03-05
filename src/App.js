import React, { Component } from 'react';
import Video from './video.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Video bidirectional={true} />
      </div>
    );
  }
}

export default App;
