import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { findDOMNode } from 'react-dom';
import SimpleWebRTC from 'simplewebrtc';
import './video.css'


class Video extends Component {
  constructor (props) {
    super(props);

    this.addVideo = this.addVideo.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
    this.readyToCall = this.readyToCall.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: ReactDOM.findDOMNode(this.refs.local),
      remoteVideosEl: "",
      autoRequestMedia: true
      //url: 'https://your-production-signalserver.com/'
    });

    console.log("webrtc component mounted");
    
    this.webrtc.on('videoAdded', this.addVideo);
    this.webrtc.on('videoRemoved', this.removeVideo);
    this.webrtc.on('readyToCall', this.readyToCall);
  }

  addVideo(video, peer) {
    console.log('video added', peer);
    //  console.log(this.refs.remotes);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    if (remotes) {
      var container = document.createElement('div');
      container.className = 'innerVideoContainer';
      container.id = 'container_' + this.webrtc.getDomId(peer);
      container.appendChild(video);
      // suppress contextmenu
      video.oncontextmenu = function() {
        return false;
      };
      console.log(container);
      remotes.appendChild(container);
    }
  }

  removeVideo(video, peer) {
    console.log('video removed ', peer);
    var remotes = ReactDOM.findDOMNode(this.refs.remotes);
    var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
    if (remotes && el) {
      remotes.removeChild(el);
    }
  }

  readyToCall() {
   return this.webrtc.joinRoom('bongo');
  }

  handleButton() {
    console.log(this.webrtc)
    this.webrtc.pauseVideo();
  }

 
//style={videoStyle(this.props.bidirectional)}
  render() {
    return(
      <div className="videoContainer">
        {/*<button onClick={this.handleButton}>info</button>*/}
        <video style={localVideoStyle(this.props.bidirectional)} id="localVideo" ref="local" > </video>
        <div className="remoteVideo" id="remoteVideos" ref="remotes"> </div> 
      </div>
    )
  }
}

export default Video

function localVideoStyle(bidirectional) {
    if (bidirectional) return {
      position: 'absolute',
      height: '18%', 
      width: 'auto',
      top: 0,
      right: 0
    }
    else return {
      display: 'none'
    }
  }