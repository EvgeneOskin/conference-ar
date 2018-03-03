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
      streamVideo: null
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
  onStream = (streamVideo) => {
    this.setState( {streamVideo} )
  }

  render() {
    const getCamera = () => this.localStream
    const { cameraVideo, streamVideo } = this.state
    return (
      cameraVideo
      ? <AFrameRenderer
          arToolKit={{ sourceType: 'video', sourceUrl: cameraVideo }}
          getSceneRef={this.setScene}
          inherent={true}
        >
          <Call getCamera={getCamera} onStream={this.onStream}/>
          <Peer name="Piter" streamVideo={streamVideo} />
          <a-cursor></a-cursor>
        </AFrameRenderer>
      : <div>Waiting for camera access...</div>
    )
  }
}
export default App;
