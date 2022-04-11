const { request } = require('../api/request.js')

const { get } = request;



const pageCount = 100;
const apiGracePeriod = 1500//ms

const getAllProducts = (page) => {
  return get('/products', { page, count: pageCount })
    .catch(err => console.log('get all err', err))
}



const deDup = (db) => {
  return db.find({})
    .then(allDocs => {
      const numDocs = allDocs.length;
      console.log('allDocs', numDocs)
      const nonDups = []
      const duplicates = allDocs.reduce((memo, doc, ind) => {
        const nextSlice = ind + 1;
        const checkedDocs = allDocs.slice(nextSlice);
        const found = checkedDocs.some(otherDocs => otherDocs.name === doc.name)
        if(found) {
          memo.push(doc._id.toHexString())
        } else {
          nonDups.push(doc)
        }
        return memo
      }, [])

      console.log('found dups', duplicates.length)
      console.log('found nonDups', nonDups.length)
      return db.Products.deleteMany({ _id: { $in: duplicates } })
        .catch(err => console.log('delete dups err', err))
    })
    .then(res => console.log('delete dups res', res))
    .catch(err => console.log('deDup err', err))
}







const startScrape = (db) => {
  return new Promise((resolve, reject) => {
    const scrape = () => {
      db.find({})
      .then(res => {
        const currentSaved = res.length
        console.log('\nCurrent number of docs in db ', currentSaved)
        const nextPage = Math.round(currentSaved/pageCount) + 1
        console.log('Getting page ', nextPage)
        return getAllProducts(nextPage)
      })
      .then(res => {
        console.log('Api page res', res.length)
        if(res.length) {
          return db.save(res)
        }
        db.save(res)
        return false
      })
      .then(scrapAgain => {
        setTimeout(() => {
          console.log('saved to db')
          scrapAgain ? console.log('running again') : console.log('no more results returned')
          scrapAgain ? scrape() : resolve(true)
        }, apiGracePeriod)
      })
      .catch(err => {
        console.log('Scrape err', err)
        reject(err)
      })
    }
    scrape()
  })
}


const hydrate = (db) => {
  console.log('Db not hydrated starting')
  return startScrape(db).then(res => deDup(db))
}

const checkForHydration = (db) => {

  return db.find({}).then(dbRes => {
    if(50 > dbRes.length ) {
      return hydrate(db).then(hydrateRes => {
        console.log('Db hydrated setting up the search')
        db.search = db.initSearch()
      })
    }
    console.log('Db already hydrated setting up the search')
    db.search = db.initSearch()
    return new Promise((res, rej) => res(true))
  })
  .catch(err => console.log('Checking hydration err', err))
}

module.exports = { hydrate, checkForHydration }