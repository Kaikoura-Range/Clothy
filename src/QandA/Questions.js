import React, { useState } from 'react';
import styled from 'styled-components';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import api from '../api/index';
export default function Questions(props) {
  const [answerForm, setAnswerForm] = useState(false);
  const [submitHelpfulQuestionOnce, setsubmitHelpfulQuestionOnce] = useState(true);
  const [reportQuestionOnce, setreportQuestionOnce] = useState(true);
  const [isReported, setIsReported] = useState(false);
  const answerFormHandler = () => {
    setAnswerForm(true);
  };

  const showAnswerForm = () => {
    setAnswerForm(false);
  };

  const helpfulQuestionHandler = (id) => {
    setsubmitHelpfulQuestionOnce(false);
    if (submitHelpfulQuestionOnce) {
      api.post.question
        .helpful(id)
        .then((res) => console.log('post help answer res', res))
        .catch((err) => console.log('helpful answer not sent!'));
    } else {
      alert('You can only mark question as helpful once!');
    }
  };

  const reportQuestionHandler = (id) => {
    setreportQuestionOnce(false);
    if (reportQuestionOnce) {
      setIsReported(true);
      api.post.question
        .report(id)
        .then(() => alert('An admin will be notified'))
        .catch((err) => console.log('report question not sent!'));
    } else {
      alert('You can only report question once!');
    }
  };

  return (
    <div>
      <h3>Q: {props.q.question_body}</h3>
      <p>
        By: {props.q.asker_name} on: {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </p>
      <p>
        Helpful Question?{' '}
        <a onClick={() => helpfulQuestionHandler(props.q.question_id)} href='#'>
          Yes
        </a>{' '}
        ({props.q.question_helpfulness}){' '}
        <a onClick={() => reportQuestionHandler(props.q.question_id)} href='#'>
          {isReported ? 'Reported' : 'Report'}
        </a>
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
