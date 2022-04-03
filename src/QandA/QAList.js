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
      <Answers a={props.q} />
    </QAndAContainer>
  );
}

const QAndAContainer = styled.div`
  border-bottom: 2px solid black;
`;
