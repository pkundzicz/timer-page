import React, { Component } from 'react';
import './SubmissionForm.css';

class SubmissionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      answer: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    this.props.onSubmit({company: this.state.company, answer: this.state.answer});

    // Clear items
    this.setState({company: '', answer: ''})
  }

  render () {
    return (
      <div className="SubmissionForm">
          Company: <input type="text" value={this.state.company} name="company" onChange={this.handleChange}/>
          Answer: <input type="text" value={this.state.answer} name="answer" onChange={this.handleChange}/>

          <button className="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default SubmissionForm;
