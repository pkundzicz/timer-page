import React, { Component } from 'react';
import './SubmissionForm.css';

class SubmissionForm extends Component {
  render () {
    return (
      <div className="SubmissionForm">
        Company: <input type="text" name="company" />
        Answer: <input type="text" name="answer" />

        <button className="button">Submit</button>
      </div>
    );
  }
}

export default SubmissionForm;
