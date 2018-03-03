import React, { Component } from 'react';
import Peer from 'peerjs';

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
      peerId: '',
      myPeerId: '',
    }
  }
  componentDidMount() {
    this.peer = Peer({key: '1gbqi7p922e7y14i'})
    this.peer.on('error', (err) => {
      alert(err.message);
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

  call = () => {
    const localStream = this.props.getCamera()
    const call = this.peer.call(this.state.peerId, localStream);

    call.on('stream', (stream) => {
      const streamVideo = window.URL.createObjectURL(stream)
      this.props.onStream(streamVideo)
    });
  }

  render() {
    const { myPeerId } = this.state
    return (
      <div style={style}>
        <p>Me peer ID: <span>{myPeerId}</span></p>
        <input onChange={(e) => this.setState({ peerId: e.target.value })} />
        <button onClick={() => this.call() }>Call</button>
      </div>
    )
  }
}
