import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import api from '../api/index';
export default function Questions(props) {
  const [state] = useContext(StateContext);
  const [answerForm, setAnswerForm] = useState(false);
  const [submitHelpfulQuestionOnce, setsubmitHelpfulQuestionOnce] = useState(true);
  const [reportQuestionOnce, setreportQuestionOnce] = useState(true);
  const [isReported, setIsReported] = useState(false);

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
        .then((res) => console.log('post help answer res', res))
        .catch((err) => console.log('helpful answer not sent!'));
    } else {
      alert('You can only mark question as helpful once!');
    }
  };

  const reportQuestionHandler = (id) => {
    setreportQuestionOnce(false);
    if (reportQuestionOnce) {
      setIsReported(true);
      api.post.question
        .report(id)
        .then(() => alert('An admin will be notified'))
        .catch((err) => console.log('report question not sent!'));
    } else {
      alert('You can only report question once!');
    }
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
        ({props.q.question_helpfulness}) |{' '}
        <ReportedLink
          reported={isReported}
          onClick={() => reportQuestionHandler(props.q.question_id)}>
          {isReported ? 'Reported' : 'Report'}
        </ReportedLink>
        <AddAnswerLink onClick={answerFormHandler}>Add Answer</AddAnswerLink>
      </HelpfulReportContainer>

      <QuestionsAuthor>
        By: {props.q.asker_name} | {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </QuestionsAuthor>
      {answerForm && (
        <div>
          <AnswerForm id={props.q.question_id} showForm={showAnswerForm} />
        </div>
      )}
    </QuestionsContainer>
  );
}

const ReportedLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => (props.reported ? 'red' : 'black')};
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => (props.helpful ? 'blue' : 'black')};
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
