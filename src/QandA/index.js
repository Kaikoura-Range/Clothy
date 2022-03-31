import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import QAList from './QAList';
export default function QandQ() {
  const [state] = useContext(StateContext);
  const [addMoreQuestions, setAddMoreQuestions] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchTextThere, setSearchTextThere] = useState(false);

  useEffect(() => {
    console.log(state.QA);
    setAddMoreQuestions(0);
  }, [state.QA]);

  const addQuestionsHandler = () => {
    setAddMoreQuestions(addMoreQuestions + 2);
  };

  const searchTextHandler = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (searchText.trim().length > 1) {
      setSearchTextThere(true);
    } else {
      setSearchTextThere(false);
    }
  };

  /////////////PUT ALL STATE VARS AND FUNCTIONS ABOVE/////////////////////////////////
  return (
    <div>
      <h1>Questions & Answers:</h1>
      <input
        type='search'
        value={searchText}
        onChange={searchTextHandler}
        placeholder='Have a question? Search for answers...'
      />
      {/* RENDERS WHEN USER STARTS SEARCHING */}
      {searchTextThere &&
        state.QA.main &&
        state.QA.main.results
          .slice(0, 2 + addMoreQuestions)
          .map(
            (q) =>
              q.question_body.toLowerCase().indexOf(searchText.toLowerCase()) > -1 && (
                <QAList key={q.question_id} q={q} />
              )
          )}

      {/* IF NOT SEARCH VALUE RENDER BOTTOM */}
      {!searchTextThere &&
        state.QA.main &&
        state.QA.main.results.slice(0, 2 + addMoreQuestions).map((q) => <QAList key={q.question_id} q={q} />)}
      {state.QA.main && state.QA.main.results.length > 2 && (
        <button onClick={addQuestionsHandler}>More Answered Questions</button>
      )}
      <button>Add A Question</button>
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: productId, count: 500 }]];
};
