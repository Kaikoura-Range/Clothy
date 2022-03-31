import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';

import QAList from './QAList';
export default function QandQ() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  useEffect(() => {
    console.log(state.QA);
  }, [state.QA]);

  return (
    <div>
      <h1>Questions & Answers:</h1>
      <input placeholder='Have a question? Search for answers...' />
      {state.QA.main &&
        state.QA.main.results
          .slice(0, 4)
          .map((q) => <QAList key={q.question_id} q={q} />)}
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: productId, count: 10 }]];
};
