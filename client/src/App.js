import React, { Component } from 'react';
import './App.css';

import SubmissionForm from './SubmissionForm.js';
import Timer from './Timer.js';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 6300,
      items: [],
      companies: []
    }

    this.attemptAnswerSubmit = this.attemptAnswerSubmit.bind(this);
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

  attemptAnswerSubmit(e) {
    var component = this;

    if (e.company && this.state.companies.indexOf(e.company) > -1) {
      // TODO: This answer was already submitted
      return
    }
    fetch('/submit', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    }).then(res => res.json())
      .then(res => {
        if (res && !res.error) {
          var company = res["company"]
          var answer = res["answer"]
          console.log(res);
          component.setState({items: component.state.items.concat({company: company, answer: answer})});
          component.setState({companies: component.state.companies.concat(company)});
        } else {
          // TODO: it was unsuccessful
        }
      });
  }

  render() {

    // Construct simple list if not all items are in the list
    const orderedList = (
      <ol>
        {this.state.items.map((item, index) => {
          return(<li key={item.company}>{capitalizeFirst(item.company) + " " + item.answer}</li>);
        })}
      </ol>
    )


    return (
      <div>
        <div>
          <Timer seconds={this.state.seconds}/>
          <SubmissionForm onSubmit={this.attemptAnswerSubmit}/>
        </div>
        <div>
          {orderedList}
        </div>
      </div>
    );
  }
}

const capitalizeFirst = (s) => {
  return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}
export default App;
