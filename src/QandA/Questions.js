import React, { useState } from 'react';
import styled from 'styled-components';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import api from '../api/index';
export default function Questions(props) {
  const [answerForm, setAnswerForm] = useState(false);
  const [submitHelpfulQuestionOnce, setsubmitHelpfulQuestionOnce] = useState(true);
  const [reportQuestionOnce, setreportQuestionOnce] = useState(true);
  const [isReported, setIsReported] = useState(false);
  const answerFormHandler = () => {
    setAnswerForm(true);
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
    <QuestionsContainer data-testid="question" >
      <QuestionBody>Q: {props.q.question_body}</QuestionBody>
      <HelpfulReportContainer>
        <h3>Q: {props.q.question_body}</h3>
        <p>By: {props.q.asker_name} on: {moment(props.q.question_date).format('MMMM Do, YYYY')}</p>
        <p> Helpful Question?{' '}</p>
        <Link onClick={() => helpfulQuestionHandler(props.q.question_id)}>Yes</Link> (
        {props.q.question_helpfulness}){' '}
        <Link onClick={() => reportQuestionHandler(props.q.question_id)}>
          {isReported ? 'Reported' : 'Report'}
        </Link>
      </HelpfulReportContainer>
      <QuestionsAuthor>
        By: {props.q.asker_name} on: {moment(props.q.question_date).format('MMMM Do, YYYY')}
      </QuestionsAuthor>
      <Link onClick={answerFormHandler}>Add Answer</Link>
      {answerForm && (
        <div>
          <AnswerForm id={props.q.question_id} showForm={showAnswerForm} />
        </div>
      )}
    </QuestionsContainer>
  );
}

const Link = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const QuestionsContainer = styled.div``;

const QuestionsAuthor = styled.div``;

const QuestionBody = styled.h3`
  display: inline;
`;

const HelpfulReportContainer = styled.div`
  display: inline;
  float: right;
  vertical-align: top;
`;
