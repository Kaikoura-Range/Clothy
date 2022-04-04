import axios from 'axios';
import format from './formaters';
import QuickCache from './localCache'
import GIT_TOKEN from '../config/config.js'
const CAMPUS_CODE = 'hr-rfe';
const baseUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}`;


const cache = QuickCache()

const checkCache = (options) => {

  const key = options.url
  if (options.method.toUpperCase() === 'GET') {
    return cache.check(key)
  } else {
    cache.remove(key)
    return null
  }
}

// var numApiRequests = 0;
// var numCached = 0;


const startRequest = (options) => {
  const cached = checkCache(options)
  if (cached) {
    // numCached++
    // console.log('numApiRequests', numApiRequests)
    // console.log('numCached', numCached)
    return cached
  }
  // numApiRequests++
  // console.log('numApiRequests', numApiRequests)
  // console.log('numCached', numCached)
  return axios(options)
    .then((res) => {
      if (options.method.toUpperCase() === 'GET') {
        const value = res.data;
        cache.add(options.url, value)
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


const getReqest = ((endpoint, params) => {
  return startRequest(buildGetOptions(endpoint, params))
});



const postRequest = (endpoint, params, data, method = 'POST', formater = '') => {
  data = formater ? format.post[formater](data) : data;
  return startRequest(buildPostOptions(endpoint, params, data, method))
}




const request = {
  get: getReqest,
  post: postRequest,
}



export default request;

