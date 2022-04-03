

import axios from 'axios';
import GIT_TOKEN from '../config/config.js'
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
      return res.data
    })
    .catch(err => {
      console.log('API GET fetch err: ', err)
      console.log('input options', options)
    })
};






const get = ((endpoint, params) => {
  return runFetch(buildGetOptions(endpoint, params))
});


const getAllObj = (allGetOptions) => {

  const Promisified = Object.keys(allGetOptions).reduce((memo, key) => {
    let getOptions = allGetOptions[key];
    let newPromise = Array.isArray(getOptions) ? get(...getOptions) : getAllObj(getOptions)
    memo[key] =  newPromise
    return memo
  }, {})

  return Promise.all.obj(Promisified)
    .catch(err => {
      console.log('GET getAllObj fetch err ', err)
      console.log('input obj ', allGetOptions)
    })
}

const getAllArray = (allGetOptions) => {
  const getPromises = allGetOptions.map((getOptions) => get(...getOptions))
  return Promise.all(getPromises)
    .catch(err => {
      console.log('GET getAllArray fetch err ', err)
      console.log('input array ', allGetOptions)
    })
}



const getAll = (allGetOptions) => {
  let getAllFunc = Array.isArray(allGetOptions) ? getAllArray : getAllObj
    return getAllFunc(allGetOptions)
      .catch(err => {
        console.log('GET all fetch err ', err)
        console.log('GET all input ', allGetOptions)
      })
}




const initProductDataFetch = (detailsGets, reviewsGets, QAGets, relatedGets ) => {
  const initStateEndpoints = {
    details: detailsGets,
    reviews: reviewsGets,
    QA: QAGets,
    related: relatedGets,
  }
  get.allProductDataEndpoints = (productId) => {
    return Object.keys(initStateEndpoints).reduce((memo, key) => {
      let keyEndpoints = initStateEndpoints[key]
      memo[key] = keyEndpoints(productId)
      return memo
    }, {})
  }
}

const getAllProductData = (productId) => {
  if (get.allProductDataEndpoints) {
    let newEndpoints = get.allProductDataEndpoints(productId)
    console.log('\nallProductDataEndpoints')
    console.log(newEndpoints)
    return getAll(newEndpoints)
  } else {
    return new Promise((rej, res) => {
      console.log('Inital endpoints not given. get.allProductDataEndpoints function is undefined')
      rej(null)
    })
  }

}



get.all = getAll
get.initProductDataFetch = initProductDataFetch
get.allProductData = getAllProductData



export default get;