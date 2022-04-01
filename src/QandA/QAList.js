import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import moment from 'moment';
import Answers from './Answers';
import Questions from './Questions';
import api from '../api/index';

export default function QAList(props) {
  const [state] = useContext(StateContext);

  return (
    <div id={props.q.question_id}>
      <Questions q={props.q} />
      <Answers a={props.q} />
    </div>
  );
}

// POST METHODS

// api.post.question
//   .helpful('questionId')
//   .then((res) => console.log('post help question res', res))
//   .catch((err) => console.log('helpful question not sent!'));

// api.post.question
//   .report('questionId')
//   .then((res) => console.log('post report question res', res))
//   .catch((err) => console.log('report question not sent!'));

// var newAnswer = {
//   //photos = ['image url']
//   photos: [],
//   body: 'This is a question.',
//   name: 'random',
//   email: 'sdfsdf',
// };

// api.post
//   .answer(newAnswer)
//   .then((res) => console.log('post questioin res', res))
//   .catch((err) => console.log('answer not sent!'));

// api.post.answer
//   .helpful('answerId')
//   .then((res) => console.log('post help answer res', res))
//   .catch((err) => console.log('helpful answer not sent!'));

// api.post.answer
//   .report('answerId')
//   .then((res) => console.log('post report answer res', res))
//   .catch((err) => console.log('report answer not sent!'));
