import React, { useState } from 'react';
import moment from 'moment';
export default function Answers(props) {
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a.answers).length);
  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + 1);
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
                Helpful Answer? <a href='#'>Yes</a> ({answer.helpfulness}) <a href='#'>Report</a>
              </p>
              {answer.photos &&
                answer.photos.map((photo) => {
                  return (
                    <div key={photo}>
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
