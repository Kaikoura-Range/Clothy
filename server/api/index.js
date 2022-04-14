const db = require('../db/index.js');

const { get } = require('./get.js')
const { post } = require('./post.js')



Promise.all.obj = (asyncObj) => {
  const promiseArray = []
  const indToKey = Object.keys(asyncObj).map((key, ind) => {
    promiseArray.push(asyncObj[key])
    return key
  })
  return Promise.all(promiseArray)
    .then(allRes => allRes.reduce((memo, result, ind) => {
        memo[indToKey[ind]] = result
        return memo
      }, {}))
    .catch(err => {
      console.log('Promise.all.obj err', err)
      console.log('input obj', asyncObj)
    })
}





module.exports = { get, post };




