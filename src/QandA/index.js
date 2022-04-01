import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import QAList from './QAList';
export default function QandQ() {
  const [state] = useContext(StateContext);
  const [addMoreQuestionsNoSearch, setAddMoreQuestionsNoSearch] = useState(0);
  const [addQuestionsSearch, setAddQuestionsSearch] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchTextThere, setSearchTextThere] = useState(false);

  useEffect(() => {
    console.log(state.QA);
    setAddMoreQuestionsNoSearch(0);
    setAddQuestionsSearch(0);
  }, [state.QA]);

  const addQuestionsNoSearchHandler = () => {
    setAddMoreQuestionsNoSearch(addMoreQuestionsNoSearch + 2);
  };

  const addQuestionsSearchHandler = () => {
    setAddQuestionsSearch(addQuestionsSearch + 2);
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

  const renderWhenSearchInput = () => {
    let filteredResults = state.QA.main.results
      .slice(0, 2 + addQuestionsSearch)
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .map(
        (q) =>
          q.question_body.toLowerCase().indexOf(searchText.toLowerCase()) > -1 && (
            <QAList key={q.question_id} q={q} />
          )
      );
    return filteredResults;
  };

  const addMoreQuestionsButtonWhenSearchInput = () => {
    let results = state.QA.main.results.length > 2 &&
      addQuestionsSearch !== state.QA.main.results.length - 2 && (
        <button onClick={addQuestionsSearchHandler}>More Answered Questions</button>
      );
    return results;
  };

  const renderWhenNoSearchInput = () => {
    let results = state.QA.main.results
      .slice(0, 2 + addMoreQuestionsNoSearch)
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .map((q) => <QAList key={q.question_id} q={q} />);
    return results;
  };

  const addMoreQuestionsButtonWhenNoSearchInput = () => {
    let results = state.QA.main.results.length > 2 &&
      addMoreQuestionsNoSearch !== state.QA.main.results.length - 2 && (
        <button onClick={addQuestionsNoSearchHandler}>More Answered Questions</button>
      );
    return results;
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
      {searchTextThere && state.QA.main && renderWhenSearchInput()}
      {searchTextThere && state.QA.main && addMoreQuestionsButtonWhenSearchInput()}

      {/* IF NOT SEARCH VALUE RENDER BOTTOM */}
      {!searchTextThere && state.QA.main && renderWhenNoSearchInput()}

      {!searchTextThere && state.QA.main && addMoreQuestionsButtonWhenNoSearchInput()}

      <button>Add A Question</button>
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: productId, count: 500 }]];
};
