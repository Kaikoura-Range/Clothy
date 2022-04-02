import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import moment from 'moment';
import api from '../api/index';

export default function Answers(props) {
  const [state] = useContext(StateContext);
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a.answers).length);
  const [submitHelpfulAnswerOnce, setsubmitHelpfulAnswerOnce] = useState(true);
  const [reportAnswerOnce, setReportAnswerOnce] = useState(true);
  const [isReported, setIsReported] = useState(false);
  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + 1);
  };
  useEffect(() => {
    setAddMoreAnswers(0);
  }, [state.QA]);

  const helpfulAnswerHandler = (id) => {
    setsubmitHelpfulAnswerOnce(false);
    if (submitHelpfulAnswerOnce) {
      api.post.answer
        .helpful(id)
        .then((res) => console.log('post help question res', res))
        .catch((err) => console.log('helpful question not sent!'));
    } else {
      alert('You can only mark answer as helpful once!');
    }
  };

  const reportAnswerHandler = (id) => {
    setReportAnswerOnce(false);
    if (reportAnswerOnce) {
      setIsReported(true);
      api.post.answer
        .report(id)
        .then(() => alert('An admin will be notified'))
        .catch((err) => console.log('report answer not sent!'));
    } else {
      alert('You can only report this answer once!');
    }
  };

  return (
    <div>
      {Object.values(props.a.answers)
        .slice(0, 1 + addMoreAnswers)
        .map((answer) => {
          return (
            <div key={answer.id}>
              <h3>A: {answer.body}</h3>
              <p>
                By: {answer.answerer_name} on: {moment(answer.date).format('MMMM Do, YYYY')}
              </p>
              <p>
                Helpful Answer?{' '}
                <a onClick={() => helpfulAnswerHandler(answer.id)} href='#'>
                  Yes
                </a>{' '}
                ({answer.helpfulness}){' '}
                <a onClick={() => reportAnswerHandler(answer.id)} href='#'>
                  {isReported ? 'Reported' : 'Report'}
                </a>
              </p>
              {answer.photos &&
                answer.photos.map((photo, i) => {
                  return (
                    <div key={i}>
                      <img alt='some pic' src={photo} />
                    </div>
                  );
                })}
            </div>
          );
        })}
      {length > 1 && length && addMoreAnswers !== length - 1 && (
        <p onClick={addMoreAnswersClickHandler}>Load more answers</p>
      )}
    </div>
  );
}

const ReportLink = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;
