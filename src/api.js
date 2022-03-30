
import axios from 'axios';
import GIT_TOKEN from './config/config.js'
const CAMPUS_CODE = 'hr-rfe';
const baseUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}`;




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



const runFetch = (options) => {
  return axios(options)
    .then((res) => {
      console.log(res)
      return res.data
    })
    .catch(err => console.log('API fetch err: ', err))
};





// const prodId = 37315 just so we know what queries look like
// ['details', `/products/${prodId}`, {}],
// ['reviews', '/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
// ['QA', '/qa/questions/', { product_id: prodId }],
// ['related', `/products/${prodId}/related/`, {}],

const get = ((endpoint, params) => {
  return runFetch(buildGetOptions(endpoint, params))
});

const getAll = (getOptionsData) => {

  const getPromises = getOptionsData.map((optionData) => {
    var [endpoint, params] = optionData.slice(1);
    return runFetch(buildGetOptions(endpoint, params))
  })

  return Promise.all(getPromises)
    .then((resData) => {
      return resData.reduce((memo, apiRes, ind) => {
        memo[getOptionsData[ind][0]] = apiRes
        return memo;
      }, {})
    })
    .catch(err => console.log('GET all fetch err ', err))
}



const getAllProductData = (prodId) => {
  const initEndpointData = [
    ['details', `/products/${prodId}`, {}],
    ['reviews', '/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
    ['QA', '/qa/questions/', { product_id: prodId }],
    ['related', `/products/${prodId}/related/`, {}],
  ]
  return getAll(initEndpointData)
}



get.all = getAll
get.allProductData = getAllProductData




const api = { get };

export default api;



    // const endpoint = '/products/'
    // const params = { page: 1, count: 50 }
    // api.get('/products/37315')
    //   .then((response) => {
    //     console.log(response)
    //   })

    // const initEndpointData = [
    //   ['/products/', { product_id: prodId }],
    //   ['/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
    //   ['/qa/questions/', { product_id: prodId }],
    //   ['/products/related/', { product_id: prodId }],
    // ]