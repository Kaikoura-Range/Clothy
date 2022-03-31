import React from 'react';
import moment from 'moment';
import Answers from './Answers';
import Questions from './Questions';
export default function QAList(props) {
  return (
    <div id={props.q.question_id}>
      <Questions q={props.q} />
      <Answers a={props.q} />
    </div>
  );
}
