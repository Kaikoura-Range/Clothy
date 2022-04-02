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
