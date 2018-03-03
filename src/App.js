import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { AFrameRenderer, Marker } from "react-web-ar";
import Peer from './Peer'

class App extends Component {
  componentWillUnmount() {
    this.scene.exitVR()
  }

  render() {
    return (
      <AFrameRenderer
        // arToolKit={{ sourceType: 'image', sourceUrl: '/images/warrior_marker.png'}}
        stats
        getSceneRef={ref => (this.scene = ref)}
        inherent={true}
      >
        <Peer name="Piter"/>
        <a-cursor></a-cursor>
      </AFrameRenderer>
    )
  }
}
export default App;
