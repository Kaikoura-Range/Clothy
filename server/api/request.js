const axios = require('axios');
const { format } = require('./formaters');
const { QuickCache } = require('./localCache')
const GIT_TOKEN = process.env.GIT_TOKEN
const CAMPUS_CODE = 'hr-rfe';
const baseUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}`;


const cache = QuickCache()

const checkCache = (options) => {

  if (options.method.toUpperCase() === 'GET') {
    return cache.check(options)
  } else {
    cache.remove(options)
    return null
  }
}




const startRequest = (options, formatKey) => {
  const cached = checkCache(options)
  if (cached) {
    return cached
  }

  return axios(options)
    .then((res) => {
      if (options.method.toUpperCase() === 'GET') {
        const value = res.data;
        cache.add(options, value)
        return value
      }
      return res
    })
    .catch(err => {
      console.log('API startRequest err: ', err)
      console.log('input options', options)
    })
};


const headers = {
  Authorization: GIT_TOKEN,
};

const buildGetOptions = (endpoint, params = {}) => {
  return {
    method: 'get',
    params,
    headers,
    url: endpoint,
    baseURL: baseUrl,
  }
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


const getReqest = ((endpoint, params, formatKey) => {
  return startRequest(buildGetOptions(endpoint, params), formatKey)
});



const postRequest = (endpoint, params, data, method = 'POST', formater = '') => {
  data = formater ? format.post[formater](data) : data;
  return startRequest(buildPostOptions(endpoint, params, data, method))
}




const request = {
  get: getReqest,
  post: postRequest,
}



module.exports = { request };

