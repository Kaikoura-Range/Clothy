import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../appState/index.js';

import styled from 'styled-components';
import moment from 'moment';
import api from '../../api/index';
import HelpfulModal from './modals/HelpfulModal';

export default function Answers(props) {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [addMoreAnswers, setAddMoreAnswers] = useState(0);
  const [length, setLength] = useState(Object.keys(props.a).length);
  const [submitHelpfulAnswerOnce, setsubmitHelpfulAnswerOnce] = useState(true);
  const [reportAnswerOnce, setReportAnswerOnce] = useState(true);
  const [showHelpfulModal, setShowHelpfulModal] = useState(false);
  const addMoreAnswersClickHandler = () => {
    setAddMoreAnswers(addMoreAnswers + 1);
  };

  useEffect(() => {
    setLength(Object.keys(props.a).length);
  }, [props.a]);

  useEffect(() => {
    setAddMoreAnswers(0);
  }, [state.currentProduct]);

  const helpfulAnswerHandler = (id) => {
    setsubmitHelpfulAnswerOnce(false);
    if (submitHelpfulAnswerOnce) {
      setShowHelpfulModal(true);
      api.post.answer
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
        .catch((err) => console.log('helpful question not sent!'));
    } else {
      alert('You can only mark answer as helpful once!');
    }
  };

  const reportAnswerHandler = (id) => {
    setReportAnswerOnce(false);
    if (reportAnswerOnce) {
      api.post.answer
        .report(id)
        .then(() => {
          return api.get.allProductData(state.currentProduct);
        })
        .then((getRes) =>
          dispatch({
            type: 'PROD_INIT',
            payload: getRes,
          })
        )
        .catch((err) => console.log('report answer not sent!'));
    } else {
      alert('You can only report this answer once!');
    }
  };

  const backDropHandler = (e) => {
    e.stopPropagation();
    setShowHelpfulModal(false);
  };

  return (
    <AnswersContainer>
      {Object.values(props.a)
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
                <ReportedLink onClick={() => reportAnswerHandler(answer.id)}>Report</ReportedLink>
              </HelpfulAnswer>
              {showHelpfulModal && (
                <BackDrop onClick={backDropHandler}>
                  <HelpfulModal />
                </BackDrop>
              )}
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
  padding-left: 1.5px;
`;

const AnswerAuthor = styled.p`
  margin-top: 5px;
`;

const HelpfulLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
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

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
`;
