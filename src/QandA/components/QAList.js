import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import moment from 'moment';
import Answers from './Answers';
import Questions from './Questions';
import api from '../api/index';

export default function QAList(props) {
  const [state] = useContext(StateContext);

  return (
    <QAndAContainer id={props.q.question_id}>
      <Questions q={props.q} />
      <Answers a={props.q.answers} />
    </QAndAContainer>
  );
}

const QAndAContainer = styled.div`
  border-bottom: 0.5px solid black;
`;
