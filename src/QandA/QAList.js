import React from 'react';
import moment from 'moment';
export default function QAList(props) {
  return (
    <div id={props.q.question_id}>
      {/* questions section */}
      <h3>Q: {props.q.question_body}</h3>
      <p>
        Helpful Question? <a href='#'>Yes</a> ({props.q.question_helpfulness})
      </p>
      <p>
        By: {props.q.asker_name} on:{' '}
        {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </p>
      {/* answers section */}
      <h3>A: </h3>
      {Object.keys(props.q.answers).length > 1 && <p>Load more answers...</p>}
      <a href='#'>Report</a>
    </div>
  );
}
