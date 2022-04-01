

import axios from 'axios';
import GIT_TOKEN from '../config/config.js'
import format from './formaters';

const CAMPUS_CODE = 'hr-rfe';
const baseUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}`;



const headers = {
  Authorization: GIT_TOKEN,
};

const buildPostOptions = (endpoint, params = {}, data = {}, method = 'POST') => {
  return {
    method,
    params,
    headers,
    url: endpoint,
    baseURL: baseUrl,
    data,
  }
};



const runFetch = (options) => {
  return axios(options)
    .then((res) => res)
    .catch(err => console.log('API POST err: ', err))
};

const startPostRequest = (endpoint, params, data, formater = '') => {
  data = formater ? format.post[formater](data) : data;
  return runFetch(buildPostOptions(endpoint, params, data))
}





const postReview = (postData) => {
  return startPostRequest('/reviews', {}, postData, 'review')
}

const postReviewAction = (reveiwId, action = 'helpful' ) => {
  const endpoint = `/reviews/${reveiwId}/${action}`
  return runFetch(buildPostOptions(endpoint, {}, {}, 'PUT'))
}

postReview.report = ((prodId) => postReviewAction(prodId, 'report'))
postReview.helpful = postReviewAction


// const reviews = {
//   helpful: postReviewAction,
//   report: ((prodId) => postReviewAction(prodId, 'report')),
//   review: postReview
// }





const postQuestion = (qestionData) => {
  return startPostRequest('/qa/questions', {}, qestionData, 'question')
}

const postQuestionAction = (questionId, action = 'helpful' ) => {
  const endpoint = `/qa/questions/${questionId}/${action}`
  return runFetch(buildPostOptions(endpoint, {}, {}, 'PUT'))
}

postQuestion.report = ((qId) => postQuestionAction(qId, 'report'))
postQuestion.helpful = postQuestionAction


// const questions = {
//   question: postQuestion,
//   helpful: postQuestionAction,
//   report: ((qId) => postQuestionAction(qId, 'report'))
// }





const postAnswer = (questionId, answerData) => {
  const endpoint = `/qa/questions/${questionId}/answers`
  return startPostRequest(endpoint,  {}, answerData, 'answer')
}

const postAnswerAction = (answerId, action = 'helpful' ) => {
  const endpoint = `/qa/answers/${answerId}/${action}`
  return runFetch(buildPostOptions(endpoint, {}, {}, 'PUT'))
}


postAnswer.report = ((aId) => postAnswerAction(aId, 'report'))
postAnswer.helpful = postAnswerAction


// const answers = {
//   answer: postAnswer,
//   helpful: postAnswerAction,
//   report: ((aId) => postAnswerAction(aId, 'report'))
// }





startPostRequest.question = postQuestion
startPostRequest.answer = postAnswer
startPostRequest.review = postReview



export default startPostRequest;








// var testPost = {
//   product_id: 37311,
//   body: 'Dope af dood. Def recommend this. Just trying to make sure length isnt like a thing so this is a long post.',
//   rating: 4,
//   recommend: true,
//   summary: 'Dope',
//   name: 'Yann',
//   email: 'sup@gmail.com',
//   photos: [],
//   characteristics: {},
// }

// post.post('/reviews', {}, testPost)
//   .then((postRes) => console.log('post res', postRes))

// fetch(baseUrl + '/reviews', {
//   method: 'POST',
//   headers: {
//     ...headers,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(testPost)
// })
// .then((res) => console.log('fetch res ', res))
// .catch(err => console.log('API fetch err: ', err))