import React, { Component } from 'react';
import RTC from 'rtc';

class Video extends Component {
  constructor() {
    super();
    this.initiateConn = this.initiateConn.bind(this);
  }
  
  initiateConn() {
    // Options
    var rtcOpts = {
      room: 'test-room',
      signaller: 'https://switchboard.rtc.io'
    };

    var rtc = RTC(rtcOpts);

    //get video target elements
    var localVideo = document.getElementById('local-video');
    var remoteVideo = document.getElementById('remote-video');

    // Display local and remote video streams
    localVideo.appendChild(rtc.local);
    remoteVideo.appendChild(rtc.remote);


    rtc.on('ready', init);
  }

  render() {
    this.initiateConn()
    return(
      <div>
        <div id="local-video"></div>
        <div id="remote-video"></div>
      </div>
    )
  }
}

export default Video

function init(session) {
  session.createDataChannel('chat');
}