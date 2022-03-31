import React from 'react';
import moment from 'moment';
export default function QAList(props) {
  return (
    <div id={props.q.question_id}>
      <h3>Q: {props.q.question_body}</h3>
      <h3>A: </h3>
      <p>
        By: {props.q.asker_name} on:{' '}
        {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </p>
      <p>
        Helpful? <a href='#'>Yes</a> ({props.q.question_helpfulness})
      </p>
      <a href='#'>Report</a>
      )}
    </div>
  );
}
