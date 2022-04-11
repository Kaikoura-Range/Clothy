const express = require('express');
const cors = require('cors');
const path = require("path");
const compression = require('compression');

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || `http://localhost:${PORT}`
console.log('CORS_ORIGIN', ORIGIN)
const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200
}

const app = express();
app.use(compression())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../dist")));


const api = require('./api/index.js');
const db = require('./db/index.js')

const requestLogs = true
let numRequests = 0;

if (requestLogs) {
  console.log('requestLogs: ', requestLogs)
  const logInterval = 10000//ms
  let upTime = 0;
  setInterval(() =>{
    upTime += logInterval
    const seconds = Math.round(upTime/1000)
    var reqPerSec = ( numRequests / seconds )
    reqPerSec = +reqPerSec.toFixed(2);
    console.log(`\nSTATUS update:\n  number of requests: ${numRequests}\n  uptime (seconds): ${seconds} \n  requests/second: ${reqPerSec}`)
  }, logInterval)
}



app.get('/product/data', (req, res) => {
  if (requestLogs) {
    numRequests++
    console.log('\nGET DATA req:  params', req.query)
  }

  const newId = req.query.productId || null;
  const endpoints = req.query.endpoints ? req.query.endpoints.split(';') : null;
  if (newId && endpoints) {
    api.get.productData(newId, endpoints)
      .then(productRes => res.status(200).send(productRes))
      .catch(err => console.log('api.get.allProductData err', err))
  } else {
    res.status(406).send('No product id attached')
  }
})


app.get('/products/search', (req, res) => {
  if (requestLogs) {
    numRequests++
    console.log('\nGET SEARCH req:  params', req.query)
  }

  const { term, searchBy } = req.query || { term: null, searchBy: null };
  if (term) {
    db.search.then(func => func(term, searchBy))
      .then(productRes => res.status(200).send(productRes))
      .catch(err => {
        console.log('api.search err', err)
        res.status(500).send(null)
      })
  } else {
    res.status(406).send('No product id attached')
  }
})


app.post('/new',  (req, res) => {
  if (requestLogs) {
    numRequests++
    console.log('\nPOST NEW req:  body keys', Object.keys(req.body))
  }

  const { typeId, productId, type, post } = req.body;
  if (type && post) {
    api.post[type](post, productId, typeId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post err', req.body,  err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})


app.post('/report',  (req, res) => {
  if (requestLogs) {
    numRequests++
    console.log('\nPOST REPORT req:  body keys', Object.keys(req.body))
  }

  const { typeId, productId, type } = req.body;
  if (type && typeId) {
    api.post[type].report(typeId, productId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post.report err', req.body,  err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})

app.post('/upvote',  (req, res) => {
  if (requestLogs) {
    numRequests++
    console.log('\nPOST UPVOTE req:  body keys', Object.keys(req.body))
  }

  const { typeId, productId, type } = req.body;
  if (type && typeId) {
    api.post[type].helpful(typeId, productId)
      .then(postRes => res.status(204).send('created'))
      .catch(err => console.log('api.post.upvote err', req.body, err))
  } else {
    res.status(406).send('Type/body not attached')
  }
})

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);