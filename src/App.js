import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AFrameRenderer, Marker } from "react-web-ar";
import Peer from './Peer'
import Call from './Call'

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cameraVideo: null,
      streamVideos: {
        hiro: '',
        kanji: '',
      }
    }
  }

  componentWillUnmount() {
    this.scene.exitVR()
  }

  componentDidMount() {
    navigator.getUserMedia({ video: true }, (stream) => {
      this.localStream = stream;
      const cameraVideo = window.URL.createObjectURL(stream)
      this.setState({ cameraVideo });
    }, (event) => {
      // Something failed
      console.log(event);
    });
  }

  setScene = (ref) => {
    this.scene = ref
  }
  onStream = (fromPeerId, streamVideo) => {
    const streamVideos = {
      ...this.state.streamVideos,
      [fromPeerId]: streamVideo
    }
    this.setState({ streamVideos })
  }
  installRef = (ref) => {
    this.makeCall = ref.makeCall;
  }
  callPeer = (peerId) => {
    console.log(`Call to ${peerId}`)
    this.makeCall(peerId)
  }
  getCamera = () => this.localStream

  render() {
    const { cameraVideo, streamVideos } = this.state
    return (
      cameraVideo
      ? <AFrameRenderer
          arToolKit={{ sourceType: 'video', sourceUrl: cameraVideo }}
          getSceneRef={this.setScene}
          inherent={true}
        >
          <a-assets>
            <a-asset-item id="optimerBoldFont" src="https://rawgit.com/mrdoob/three.js/dev/examples/fonts/optimer_bold.typeface.json"></a-asset-item>
          </a-assets>
          <Call
            ref={this.installRef}
            keyIDs={['hiro', 'kanji']}
            getCamera={this.getCamera}
            onStream={this.onStream}
          />
          <Peer
            marker="hiro"
            name="hiro"
            streamVideo={streamVideos['hiro']}
            callPeer={this.callPeer}
          />
          <Peer
            marker="kanji"
            name="kanji"
            streamVideo={streamVideos['kanji']}
            callPeer={this.callPeer}
          />
          <a-cursor></a-cursor>
        </AFrameRenderer>
      : <div>Waiting for camera access...</div>
    )
  }
}
export default App;
