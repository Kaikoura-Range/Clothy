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
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .map(
        (q) =>
          q.question_body.toLowerCase().indexOf(searchText.toLowerCase()) > -1 && (
            <QAList key={q.question_id} q={q} />
          )
      );
    let length = filteredResults.filter((val) => val !== false).length;
    let results = filteredResults.filter((val) => val !== false).slice(0, 2 + addQuestionsSearch);
    if (results.length) {
      if (length % 2 !== 0) {
        return (
          <div>
            {results}
            {length > 2 && addQuestionsSearch + 1 !== length && (
              <button onClick={addQuestionsSearchHandler}>More Answered Questions</button>
            )}
          </div>
        );
      }
      if (length % 2 === 0) {
        return (
          <div>
            {results}
            {length > 2 && addQuestionsSearch + 2 !== length && (
              <button onClick={addQuestionsSearchHandler}>More Answered Questions</button>
            )}
          </div>
        );
      }
    }
  };

  const renderWhenNoSearchInput = () => {
    let results = state.QA.main.results
      .slice(0, 2 + addMoreQuestionsNoSearch)
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .map((q) => <QAList key={q.question_id} q={q} />);
    return results;
  };

  const addMoreQuestionsButtonWhenNoSearchInput = () => {
    let length = state.QA.main.results.length;
    let results;
    if (length % 2 !== 0) {
      return (
        state.QA.main.results.length > 2 &&
        addMoreQuestionsNoSearch + 1 !== length && (
          <button onClick={addQuestionsNoSearchHandler}>More Answered Questions</button>
        )
      );
    }
    if (length % 2 === 0) {
      return (
        state.QA.main.results.length > 2 &&
        addMoreQuestionsNoSearch + 2 !== length && (
          <button onClick={addQuestionsNoSearchHandler}>More Answered Questions</button>
        )
      );
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
      {searchTextThere && state.QA.main && renderWhenSearchInput()}

      {/* IF NOT SEARCH VALUE RENDER BOTTOM */}
      {!searchTextThere && state.QA.main && renderWhenNoSearchInput()}
      {!searchTextThere &&
        state.QA.main &&
        state.QA.main.results.length > 2 &&
        addMoreQuestionsButtonWhenNoSearchInput()}

      <button>Add A Question</button>
    </div>
  );
}

export const qAndAStateInit = (productId) => {
  return [['main', '/qa/questions/', { product_id: productId, count: 50 }]];
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