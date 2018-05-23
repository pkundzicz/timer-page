import React, { Component } from 'react';
import './Timer.css'

class Timer extends Component {
  showFormatted(secs) {
    const sec_num = parseInt(secs, 10); // don't forget the second param
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }
  render () {
    return (
      <div className='timer'>
        <h1>{this.showFormatted(this.props.seconds)}</h1>
      </div>
    )
  }
}

export default Timer;
