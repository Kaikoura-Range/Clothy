import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import moment from 'moment';
import api from '../api/index';

export default function Answers(props) {
  const [state] = useContext(StateContext);
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a.answers).length);
  const [submitHelpfulAnswerOnce, setsubmitHelpfulAnswerOnce] = useState(true);
  const [reportAnswerOnce, setReportAnswerOnce] = useState(true);
  const [isReported, setIsReported] = useState(false);
  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + 1);
  };
  useEffect(() => {
    setAddMoreAnswers(0);
  }, [state.QA]);

  const helpfulAnswerHandler = (id) => {
    setsubmitHelpfulAnswerOnce(false);
    if (submitHelpfulAnswerOnce) {
      api.post.answer
        .helpful(id)
        .then((res) => console.log('post help question res', res))
        .catch((err) => console.log('helpful question not sent!'));
    } else {
      alert('You can only mark answer as helpful once!');
    }
  };

  const reportAnswerHandler = (id) => {
    setReportAnswerOnce(false);
    if (reportAnswerOnce) {
      setIsReported(true);
      api.post.answer
        .report(id)
        .then(() => alert('An admin will be notified'))
        .catch((err) => console.log('report answer not sent!'));
    } else {
      alert('You can only report this answer once!');
    }
  };

  return (
    <AnswersContainer>
      {Object.values(props.a.answers)
        .slice(0, 1 + addMoreAnswers)
        .map((answer) => {
          return (
            <EachAnswerContainer key={answer.id}>
              <h3>A: {answer.body}</h3>
              {answer.photos &&
                answer.photos.map((photo, i) => {
                  return (
                    <ImagesContainer key={i}>
                      <Img alt='picture from answerer' src={photo} />
                    </ImagesContainer>
                  );
                })}
              <AnswerAuthor>
                By: {answer.answerer_name} | {moment(answer.date).format('MMMM Do, YYYY')}
              </AnswerAuthor>
              <HelpfulAnswer>
                Helpful Answer?{' '}
                <HelpfulLink
                  helpful={!submitHelpfulAnswerOnce}
                  onClick={() => helpfulAnswerHandler(answer.id)}>
                  Yes
                </HelpfulLink>{' '}
                ({answer.helpfulness}) |{' '}
                <ReportedLink reported={isReported} onClick={() => reportAnswerHandler(answer.id)}>
                  {isReported ? 'Reported' : 'Report'}
                </ReportedLink>
              </HelpfulAnswer>
            </EachAnswerContainer>
          );
        })}
      {length > 1 && length && addMoreAnswers !== length - 1 && (
        <LoadMoreAnswers onClick={addMoreAnswersClickHandler}>Load more answers</LoadMoreAnswers>
      )}
    </AnswersContainer>
  );
}

const ReportedLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => (props.reported ? 'red' : 'black')};
  padding-left: 1.5px;
`;

const AnswerAuthor = styled.p`
  margin-top: 5px;
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${(props) => (props.helpful ? 'blue' : 'black')};
`;

const EachAnswerContainer = styled.div`
  margin-top: 25px;
`;

const HelpfulAnswer = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
`;

const LoadMoreAnswers = styled.p`
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const AnswersContainer = styled.div`
  margin-top: 25px;
`;

const ImagesContainer = styled.div`
  display: inline;
`;

const Img = styled.img`
  width: 90px;
  height: 90px;
  margin: 5px;
`;
