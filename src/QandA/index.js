import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import QAList from './QAList';
export default function QandQ() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const [addMoreQuestions, setAddMoreQuestions] = useState(0);
  useEffect(() => {
    console.log(state.QA);
  }, [state.QA]);

  const addQuestionsHandler = () => {
    setAddMoreQuestions(addMoreQuestions + 2);
  };

  return (
    <div>
      <h1>Questions & Answers:</h1>
      <input placeholder='Have a question? Search for answers...' />
      {state.QA.main &&
        state.QA.main.results
          .slice(0, 2 + addMoreQuestions)
          .map((q) => <QAList key={q.question_id} q={q} />)}
      {state.QA.main && state.QA.main.results.length > 3 && (
        <button onClick={addQuestionsHandler}>More Answered Questions</button>
      )}
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: productId, count: 20 }]];
};
