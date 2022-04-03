import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import api from '../api/index';
import QAList from './QAList';
import QuestionForm from './QuestionForm';
export default function QAndA() {
  //central API state
  const [state] = useContext(StateContext);
  //state for toggling how many questions get showed and what gets filtered
  const [addMoreQuestionsNoSearch, setAddMoreQuestionsNoSearch] = useState(0);
  const [addQuestionsSearch, setAddQuestionsSearch] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchTextThere, setSearchTextThere] = useState(false);
  //state for form inputs
  const [createForm, setCreateForm] = useState(false);
  //////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // console.log(state.QA);
    setAddMoreQuestionsNoSearch(0);
    setAddQuestionsSearch(0);
    setCreateForm(false);
  }, [state.QA]);
  //these functions render 2 questions at a time
  const addQuestionsNoSearchHandler = () => {
    setAddMoreQuestionsNoSearch(addMoreQuestionsNoSearch + 2);
  };

  const addQuestionsSearchHandler = () => {
    setAddQuestionsSearch(addQuestionsSearch + 2);
  };
  //////////////////////////////////////////////////////////////////////////////////////////
  //uses text from search input to filter out results
  const searchTextHandler = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (searchText.trim().length > 1) {
      setSearchTextThere(true);
    } else {
      setSearchTextThere(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  //these functions render out each question & answer and conditionally renders "more answered questions button"
  const renderWhenSearchInput = () => {
    let filteredResults = state.QA.results
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
              <MoreAnsweredQuestionsButton onClick={addQuestionsSearchHandler}>
                More Answered Questions
              </MoreAnsweredQuestionsButton>
            )}
          </div>
        );
      }
      if (length % 2 === 0) {
        return (
          <div>
            {results}
            {length > 2 && addQuestionsSearch + 2 !== length && (
              <MoreAnsweredQuestionsButton onClick={addQuestionsSearchHandler}>
                More Answered Questions
              </MoreAnsweredQuestionsButton>
            )}
          </div>
        );
      }
    }
  };

  const renderWhenNoSearchInput = () => {
    let results = state.QA.results
      .slice(0, 2 + addMoreQuestionsNoSearch)
      .sort((a, b) => b.helpfulness - a.helpfulness)
      .map((q) => <QAList key={q.question_id} q={q} />);
    return results;
  };

  const addMoreQuestionsButtonWhenNoSearchInput = () => {
    let length = state.QA.results.length;
    let results;
    if (length % 2 !== 0) {
      return (
        state.QA.results.length > 2 &&
        addMoreQuestionsNoSearch + 1 !== length && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsNoSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
    if (length % 2 === 0) {
      return (
        state.QA.results.length > 2 &&
        addMoreQuestionsNoSearch + 2 !== length && (
          <MoreAnsweredQuestionsButton onClick={addQuestionsNoSearchHandler}>
            More Answered Questions
          </MoreAnsweredQuestionsButton>
        )
      );
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //functions used for sending post requests for adding a question
  //toggles add question form
  const createQuestionForm = () => {
    setCreateForm(!createForm);
  };

  const backDropHandler = () => {
    setCreateForm(false);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <EntireQuestionsContainer data-testid='QandA'>
      <EntireQuestionsWrapper>
        <h1>Questions & Answers:</h1>
        <SearchBar
          type='search'
          value={searchText}
          onChange={searchTextHandler}
          placeholder='Have a question? Search for answers...'
        />

        {/* RENDERS WHEN USER STARTS SEARCHING */}
        {searchTextThere && state.QA && renderWhenSearchInput()}

        {/* IF NOT SEARCH VALUE RENDER BOTTOM */}
        {!searchTextThere && state.QA && renderWhenNoSearchInput()}
        {!searchTextThere &&
          state.QA &&
          state.QA.results.length > 2 &&
          addMoreQuestionsButtonWhenNoSearchInput()}

        <AddQuestionButton onClick={createQuestionForm}>Add A Question</AddQuestionButton>
      </EntireQuestionsWrapper>
      {createForm && (
        <BackDrop onClick={backDropHandler}>
          <QuestionForm showForm={setCreateForm} />
        </BackDrop>
      )}
    </EntireQuestionsContainer>
  );
}

export const qAndAStateInit = (productId) => {
  return ['/qa/questions/', { product_id: productId, count: 500 }];
};

const SearchBar = styled.input`
  border: 2px solid black;
  display: block;
  margin-top: 25px;
  padding: 15px;
  width: 50%;
  font-size: 20px;
`;

const EntireQuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 100px;
`;

const EntireQuestionsWrapper = styled.div`
  display: inline;
`;

const ButtonsContainer = styled.div``;

const AddQuestionButton = styled.button`
  cursor: pointer;
  margin: 25px;
  float: left;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  &:active {
    transform: translateY(4px);
  }
`;

const MoreAnsweredQuestionsButton = styled.button`
  cursor: pointer;
  margin: 25px;
  float: left;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
  &:active {
    transform: translateY(4px);
  }
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
`;
