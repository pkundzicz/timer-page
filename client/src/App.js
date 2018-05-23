import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SubmissionForm from './SubmissionForm.js';
import Timer from './Timer.js';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {seconds: 6300}
  }

  componentWillMount() {
    this.startTimer();
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick () {
    const oneTick = this.state.seconds - 1;
    this.setState({seconds: Math.max(oneTick, 0)})
  }
  startTimer () {
    clearInterval(this.timer)
    this.timer = setInterval(this.tick.bind(this), 1000)
  }
  stopTimer () {
    clearInterval(this.timer)
  }
  render() {
    return (
      <div>
        <Timer seconds={this.state.seconds}/>
        <SubmissionForm />
      </div>
    );
  }
}

export default App;
