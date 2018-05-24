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
      // companies: [
      //   "google",
      //   "microsoft",
      //   "pinterest",
      //   "adobe",
      //   "snapchat",
      //   "airbnb",
      //   "twitter",
      //   "amazon",
      //   "apple",
      //   "facebook",
      //   "yelp",
      //   "tesla"
      // ],
      // items: [
      //   {company: "google", answer: "search"},
      //   {company: "microsoft", answer: "ascii"},
      //   {company: "pinterest", answer: "nofilter"},
      //   {company: "adobe", answer: "fishy"},
      //   {company: "snapchat", answer: "radical"},
      //   {company: "airbnb", answer: "amaze"},
      //   {company: "twitter", answer: "newsy"},
      //   {company: "amazon", answer: "cloud"},
      //   {company: "apple", answer: "ipadplusprox"},
      //   {company: "facebook", answer: "soviets"},
      //   {company: "yelp", answer: "check"},
      //   {company: "tesla", answer: "outlandish"}
      // ],
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
          <div className="content">
            <VertList items={this.state.items} />
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
