import React, { Component } from 'react';
import './App.css';

import SubmissionForm from './SubmissionForm.js';
import Timer from './Timer.js';
import VertList from './VertList.js';

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

          component.setState({items: component.state.items.concat({company: company, answer: answer})});
          component.setState({companies: component.state.companies.concat(company)});
        }
      });
  }

  render() {
    // Construct simple list if not all items are in the list
    const orderedList = (
      <ol>
        {this.state.items.map((item, index) => {
          return(<li key={item.company}>{capitalizeFirst(item.company) + " - " + item.answer}</li>);
        })}
      </ol>
    )


    return (
      <div >
        <Timer seconds={this.state.seconds}/>

        {this.state.companies.length < 12 &&
          <div className="content">
            <div className="form box">
              <SubmissionForm onSubmit={this.attemptAnswerSubmit}/>
            </div>
            <div className="list box">
              {this.state.companies.length > 0 ? orderedList : "Empty :("}
            </div>
          </div>
        }

        {this.state.companies.length == 12 &&
          <div>
            <div className="form box margin-below">
              So you managed to get past all of the other companies' puzzles huh? Fine, here's a code: 24816. I knew I could never trust these other weak companies, but you're messing with Hooli here. I hope you've been paying attention to networking while here at Hooli, you're going to need every answer you get to crack in and get your precious USBs. If you can figure this out, I'll add to you the title of elite, or leet, or 1337 as they say in hip-speak. - Gavin Belson

            </div>
            <div className="content">
              <VertList items={this.state.items} />
            </div>
          </div>
        }
      </div>
    );
  }
}

const capitalizeFirst = (s) => {
  return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}
export default App;
