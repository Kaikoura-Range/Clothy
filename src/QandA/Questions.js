import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import api from '../api/index';
export default function Questions(props) {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [answerForm, setAnswerForm] = useState(false);
  const [submitHelpfulQuestionOnce, setsubmitHelpfulQuestionOnce] = useState(true);
  const [reportQuestionOnce, setreportQuestionOnce] = useState(true);

  useEffect(() => {
    setAnswerForm(false);
  }, [state.QA]);

  const answerFormHandler = () => {
    setAnswerForm(!answerForm);
  };

  const showAnswerForm = () => {
    setAnswerForm(false);
  };

  const helpfulQuestionHandler = (id) => {
    setsubmitHelpfulQuestionOnce(false);

    if (submitHelpfulQuestionOnce) {
      api.post.question
        .helpful(id)
        .then(() => {
          return api.get.allProductData(state.currentProduct);
        })
        .then((getRes) =>
          dispatch({
            type: 'PROD_INIT',
            payload: getRes,
          })
        )
        .catch((err) => console.log('helpful answer not sent!'));
    } else {
      alert('You can only mark question as helpful once!');
    }
  };

  const reportQuestionHandler = (id) => {
    setreportQuestionOnce(false);
    if (reportQuestionOnce) {
      api.post.question
        .report(id)
        .then(() => alert('Reported! The question will get deleted immediately'))
        .then(() => {
          return api.get.allProductData(state.currentProduct);
        })
        .then((getRes) =>
          dispatch({
            type: 'PROD_INIT',
            payload: getRes,
          })
        )
        .catch((err) => console.log('report question not sent!'));
    } else {
      alert('You can only report question once!');
    }
  };

  const backDropHandler = () => {
    setAnswerForm(false);
  };

  return (
    <QuestionsContainer data-testid='question'>
      <QuestionBody>Q: {props.q.question_body}</QuestionBody>
      <HelpfulReportContainer>
        Helpful Question?{' '}
        <HelpfulLink
          helpful={!submitHelpfulQuestionOnce}
          onClick={() => helpfulQuestionHandler(props.q.question_id)}>
          Yes
        </HelpfulLink>{' '}
        ({props.q.question_helpfulness}) |{'  '}
        <ReportedLink onClick={() => reportQuestionHandler(props.q.question_id)}>
          Report
        </ReportedLink>
        <AddAnswerLink onClick={answerFormHandler}>Add Answer</AddAnswerLink>
      </HelpfulReportContainer>
      <QuestionsAuthor>
        By: {props.q.asker_name} | {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </QuestionsAuthor>
      {answerForm && (
        <BackDrop onClick={backDropHandler}>
          <AnswerForm id={props.q.question_id} showForm={showAnswerForm} />
        </BackDrop>
      )}
    </QuestionsContainer>
  );
}

const ReportedLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  padding-left: 1.5px;
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const AddAnswerLink = styled.div`
  margin-top: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const QuestionsContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const QuestionsAuthor = styled.p`
  margin-top: 5px;
`;

const QuestionBody = styled.h3`
  overflow-wrap: break-word;
  display: inline;
`;

const HelpfulReportContainer = styled.div`
  display: inline;
  float: right;
  vertical-align: top;
`;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1.5;
  background: rgba(0, 0, 0, 0.75);
`;
