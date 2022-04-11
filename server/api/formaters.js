const dataForms = require('./dataForms.js')

const extend = (src, desinationt = {}) => {
  // console.log('\nsrc', src)
  // console.log('desinationt', desinationt)
  return Object.keys(src).reduce((memo, key) => {
    const formatted = src[key]
    if (typeof(formatted) !== 'object') {
      memo[key] = memo[key] || formatted
    }
    else {
      if (Array.isArray(formatted)) {

        const defaultVal = formatted[0]
        memo[key] = memo[key] || [defaultVal]
        memo[key].map(val =>  {
          var formattedVal;
          if (typeof(defaultVal) !== 'object') {
            formattedVal = val || defaultVal
          } else {
            formattedVal = val || extend(defaultVal, val)
          }
          return formattedVal
        })

      }
      else {
        memo[key] = extend(formatted, memo[key])
      }
    }
    return memo
  }, desinationt)
}

const formatApiGet = (apiData, key) => {
  const dataForm = dataForms[key];
  return extend(dataForm, apiData)
}



const formatReview = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.product_id = rawData.product_id || 1;
  formated.body = rawData.body || 'NO ENTED BOODY';
  formated.rating = rawData.rating || 1;
  formated.recommend = rawData.recommend || false;
  formated.summary = rawData.summary || 'NOT SUMMARY';
  formated.name = rawData.name || "no name";
  formated.email = rawData.email || 'noEmail@gmail.com';
  formated.photos = rawData.photos || [];
  formated.characteristics = rawData.characteristics || {};
  return formated
}


const formatQuestion = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.product_id = rawData.product_id || 1;
  formated.body = rawData.body || 'NO Question got ya';
  formated.name = rawData.name || 'No name for me';
  formated.email = rawData.email || 'superValid@gmail.com';
  return formated
}


const formatAnswer = (rawData, extend = false) => {
  var formated = extend ? { ...rawData } : {};
  formated.photos = rawData.photos || [];
  formated.body = rawData.body || 'NO Answer for ya';
  formated.name = rawData.name || 'No name for me';
  formated.email = rawData.email || 'superValid@gmail.com';
  return formated
}


const format = {
  post: {
    review: formatReview,
    question: formatQuestion,
    answer: formatAnswer
  },
  get: formatApiGet
};

module.exports = { format }