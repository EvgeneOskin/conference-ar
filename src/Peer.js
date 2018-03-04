
/* global AFRAME */
import React, { Component } from 'react';
import { AFrameRenderer, Marker } from "react-web-ar";

export default class Peer extends Component {

  constructor(props) {
    super(props)
    this.markerName = this.props.marker
    this.listenerName = `cursor-listener-${this.markerName}`
    this.streamId = `stream-${this.markerName}`
  }

  componentDidMount() {
    const component = this
    AFRAME.registerComponent(this.listenerName, {
      init: function() {
        this.el.addEventListener('click', function (evt) {
          component.props.callPeer(component.props.name)
        });
      }
    });
  }
  render() {
    const { name, streamVideo } = this.props
    const listenerProps = {[this.listenerName]: ""}
    return [
      <a-assets>
        <video id={this.streamId} autoplay src={streamVideo}></video>
      </a-assets>,

      <Marker parameters={{ preset: this.markerName }} >
        {streamVideo
          ? <a-video rotation="-90 0 0" src={`#${this.streamId}`} />
          : <a-box height={0.2} {...listenerProps}/>
        }

        <a-entity
          position="0 1 0"
          material="color: grey"
          text-geometry={`value: ${name}; font: #optimerBoldFont`}
        ></a-entity>
      </Marker>
    ]
  }
}
