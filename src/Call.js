import React, { Component } from 'react';
import Peer from 'peerjs';

const peerJSServer = 'ar-hakaton-webrtc.herokuapp.com'

const style = {
  position: 'fixed',
  top: '10px',
  'text-align': 'center',
  'z-index': 1,
  color: 'black',
  background: 'white'
}

export default class Call extends Component {

  constructor(props) {
    super(props)
    this.state = {
      myPeerId: '',
    }
  }
  componentDidMount() {
    const { keyIDs } = this.props  // Use fixed ids for debug reasons
    this.setupPeer(keyIDs[0], keyIDs.slice(1))
  }

  makeCall = (peerId) => {
    const localStream = this.props.getCamera()
    const call = this.peer.call(peerId, localStream);

    call.on('stream', (stream) => {
      const streamVideo = window.URL.createObjectURL(stream)
      this.props.onStream(peerId, streamVideo)
    });
  }

  setupPeer = async (key, recoveryKeys) => {
    this.peer = Peer(key, {host: peerJSServer, port: 443, path: '/', secure: true})
    this.peer.on('error', (err) => {
      if (recoveryKeys[0]) {
        this.setupPeer(recoveryKeys[0], recoveryKeys.splice(1))
      } else {
        alert(err.message);
      }
    });

    this.peer.on('open', (id) => {
      this.setState({ myPeerId: id });
      console.log('My peer ID is: ' + id);
    })
    this.peer.on('call', (call) => {
      // Answer the call, providing our mediaStream
      const localStream = this.props.getCamera()
      call.answer(localStream);
    });
  }

  render() {
    const { myPeerId } = this.state
    return (
      <div style={style}>
        <p>Me peer ID: <span>{myPeerId}</span></p>
      </div>
    )
  }
}
