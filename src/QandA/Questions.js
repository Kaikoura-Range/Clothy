import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import api from '../api/index';
export default function Questions(props) {
  const [answerForm, setAnswerForm] = useState(false);

  const answerFormHandler = () => {
    setAnswerForm(true);
  };

  const showAnswerForm = () => {
    setAnswerForm(false);
  };

  return (
    <div>
      <h3>Q: {props.q.question_body}</h3>
      <p>
        By: {props.q.asker_name} on: {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </p>
      <p>
        Helpful Question? <a href='#'>Yes</a> ({props.q.question_helpfulness}){' '}
        <a href='#'>Report</a>
      </p>
      <a onClick={answerFormHandler} href='#'>
        Add Answer
      </a>
      {answerForm && (
        <div>
          <AnswerForm id={props.q.question_id} showForm={showAnswerForm} />
        </div>
      )}
    </div>
  );
}
