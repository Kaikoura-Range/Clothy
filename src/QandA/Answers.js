import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import moment from 'moment';
export default function Answers(props) {
  const [state] = useContext(StateContext);
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a.answers).length);

  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + 1);
  };
  useEffect(() => {
    setAddMoreAnswers(0);
  }, [state.QA]);
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
                Helpful Answer? <a href='#'>Yes</a> ({answer.helpfulness}) <a href='#'>Report</a>
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
