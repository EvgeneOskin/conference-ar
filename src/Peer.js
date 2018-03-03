
/* global AFRAME */
import React, { Component } from 'react';
import { AFrameRenderer, Marker } from "react-web-ar";

export default class Peer extends Component {

  componentDidMount() {
    const component = this
    AFRAME.registerComponent('cursor-listener', {
      init: function() {
        this.el.addEventListener('click', function (evt) {
          console.log('Clicked!')
        });
      }
    });
  }
  render() {
    const { name } = this.props
    return [
      <a-assets>
        <video id="stream" autoplay src="/happy.mp4"></video>
      </a-assets>,

      <Marker
          parameters={{
            preset: 'hiro'
          }}
        >

        <a-video src="#stream" ></a-video>
        <a-text
          position="0 1 0"
          value={name}
          anchor="left"
        ></a-text>
      </Marker>
    ]
  }
}
