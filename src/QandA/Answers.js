import React, { useState } from 'react';
import moment from 'moment';
export default function Answers(props) {
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
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
                Helpful Answer? <a href='#'>Yes</a> ({answer.helpfulness})
              </p>
              <a href='#'>Report</a>
              {answer.photos &&
                answer.photos.map((photo) => {
                  return (
                    <div>
                      <img alt='some pic' src={photo.url} />
                    </div>
                  );
                })}
            </div>
          );
        })}
      {Object.keys(props.a.answers).length > 1 && <p onClick={addMoreAnswersClickHandler}>Load more answers...</p>}
    </div>
  );
}
