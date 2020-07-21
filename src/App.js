import React from 'react';
import { ReactMic } from 'react-mic';
import $ from 'jquery' ;
import { findDOMNode } from 'react-dom' ;
import './App.css';

class App extends React.Component {

handleDisplayForStart = () => {
  const startBtn = findDOMNode(this.refs.startBtn) ;
  $(startBtn).addClass('d-none') ;
  const stopBtn = findDOMNode(this.refs.stopBtn) ;
  $(stopBtn).removeClass('d-none') ;
}

handleDisplayForStop = () => {
  const stopBtn = findDOMNode(this.refs.stopBtn) ;
  $(stopBtn).addClass('d-none') ;
  const processBtn = findDOMNode(this.refs.processBtn) ;
  $(processBtn).removeClass('d-none') ;
}

  constructor(props) {
    super(props);
    this.state = {
      blobURL: "",
      record: false
    }
  }
 
  startRecording = () => {
    this.setState({ record: true });
    this.handleDisplayForStart() ;
  }
 
  stopRecording = () => {
    this.setState({ record: false });
    this.handleDisplayForStop() ;
  }
 
  onData(recordedBlob) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop = (recordedBlob) => {
    console.log(recordedBlob.blobURL) ;
    const blobURL = recordedBlob.blobURL ;
    this.setState({ blobURL: blobURL}) ;
    return recordedBlob.blobURL ;
  }

  render() {
    return (
    <div className="App">

<ReactMic
          visualSetting="frequencyBars"
          record={this.state.record}
          className="d-none"
          onStop={this.onStop}
          onData={this.onData} />
        <button ref="startBtn" className="start-btn" onClick={this.startRecording} type="button">START</button>
        <button ref="stopBtn" className="stop-btn concentric-circles d-none" onClick={this.stopRecording} type="button">STOP</button>
        <button ref="processBtn" className="process-btn d-none">Processing..</button>
      <br/>
      <audio src={this.state.blobURL} controls />
    </div>
  );}
}

export default App;
