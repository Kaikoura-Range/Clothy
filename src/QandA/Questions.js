import React from 'react';
import moment from 'moment';
export default function Questions(props) {
  return (
    <div>
      <h3>Q: {props.q.question_body}</h3>
      <p>
        By: {props.q.asker_name} on: {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </p>
      <p>
        Helpful Question? <a href='#'>Yes</a> ({props.q.question_helpfulness})
      </p>
      <a href='#'>Report</a>
    </div>
  );
}
