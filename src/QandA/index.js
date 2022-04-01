import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import QAList from './QAList';
export default function QandQ() {
  const [, dispatch] = useContext(DispatchContext);

  const [state] = useContext(StateContext);
  const [addMoreQuestions, setAddMoreQuestions] = useState(0);

  useEffect(() => {
    // console.log(state.QA);
  }, [state.QA]);

  const addQuestionsHandler = () => {
    setAddMoreQuestions(addMoreQuestions + 2);
  };
  /////////////PUT ALL STATE VARS AND FUNCTIONS ABOVE/////////////////////////////////
  return (
    <div>
      <h1>Questions & Answers:</h1>
      <input type='search' placeholder='Have a question? Search for answers...' />
      {state.QA.main &&
        state.QA.main.results.slice(0, 2 + addMoreQuestions).map((q) => <QAList key={q.question_id} q={q} />)}
      {state.QA.main && state.QA.main.results.length > 2 && (
        <button onClick={addQuestionsHandler}>More Answered Questions</button>
      )}
      <button>Add A Question</button>
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: 37311, count: 500 }]];
};













// POST METHODS

    // var newQuestion =  {
    //   product_id: state.currentProduct,
    //   body: 'This is a question.',
    //   name: 'random',
    //   email: 'sdfsdf'
    // }

    // api.post.question(  newQuestion  )
    //   .then(res => console.log('post question res', res))

    // api.post.question.helpful('questionId')
    //   .then(res => console.log('post help question res', res))

    // api.post.question.report('questionId')
    //   .then(res => console.log('post report question res', res))


  // var newAnswer =  {
    //   photos: [... any photo url ],
    //   body: 'This is a question.',
    //   name: 'random',
    //   email: 'sdfsdf'
    // }

    // api.post.answer( newAnswer )
    //   .then(res => console.log('post questioin res', res))

    // api.post.answer.helpful('answerId')
    //   .then(res => console.log('post help answer res', res))

    // api.post.answer.report('answerId')
    //   .then(res => console.log('post report answer res', res))