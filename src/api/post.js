
import request from './request';

const post = request.post



const postReview = (postData) => {
  return post('/reviews', {}, postData,  'POST', 'review')
}

const postReviewAction = (reveiwId, action = 'helpful' ) => {
  const endpoint = `/reviews/${reveiwId}/${action}`
  return post(endpoint, {}, {}, 'PUT')
}

postReview.report = ((prodId) => postReviewAction(prodId, 'report'))
postReview.helpful = postReviewAction






const postQuestion = (qestionData) => {
  return post('/qa/questions', {}, qestionData, 'POST', 'question')
}

const postQuestionAction = (questionId, action = 'helpful' ) => {
  const endpoint = `/qa/questions/${questionId}/${action}`
  return post(endpoint, {}, {}, 'PUT')
}

postQuestion.report = ((qId) => postQuestionAction(qId, 'report'))
postQuestion.helpful = postQuestionAction





const postAnswer = (questionId, answerData) => {
  const endpoint = `/qa/questions/${questionId}/answers`
  return post(endpoint,  {}, answerData, 'POST', 'answer')
}

const postAnswerAction = (answerId, action = 'helpful' ) => {
  const endpoint = `/qa/answers/${answerId}/${action}`
  return post(endpoint, {}, {}, 'PUT')
}


postAnswer.report = ((aId) => postAnswerAction(aId, 'report'))
postAnswer.helpful = postAnswerAction







post.question = postQuestion
post.answer = postAnswer
post.review = postReview

export default post;








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