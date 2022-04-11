const mongoose = require("mongoose");
const { Schema } = mongoose;
const { checkForHydration } = require('./hydrate.js')
// mongoose.connect(`mongodb://localhost:${process.env.PORT || 3000}/server`);
// mongoose.connect('mongodb://localhost/fec')
mongoose.connect('mongodb://localhost/fec_dev')
//{ autoIndex: false }

const ProductsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  campus: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  slogan: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  category: {
    type: String,
    default: null
  },
  default_price: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})


const Products = mongoose.model('Products', ProductsSchema);



const saveProducts = (toSave) => {
  return Products.create(toSave)
    .catch(err => console.log('Error saving to db ', err, 'input: ', toSave[0]))
}

const findProducts = (queries = {}) => {
  return Products.find(queries)
  .catch(err => console.log('Error finding in db ', err, 'input: ', queries))
}



var sortMatched = (textToMatch, searchBy, matched) => {
  const matchScore = matched.map((doc, index) => {
    const method = doc[searchBy];
    const methodLength = method.length
    const indOf = method.toUpperCase().indexOf(textToMatch)
    // const distanceFromStartPerChar = (( methodLength - indOf ) / methodLength )
    // const distanceFromStartPerChar = (( indOf ) / methodLength )
    const distanceFromStartPerChar = indOf
    return { score: distanceFromStartPerChar, doc }
  })
  return matchScore.sort((a, b) => a.score - b.score).map(scoreObj => scoreObj.doc)
}

const initSearchProducts = async () => {
  const allProducts = await Products.find({})
  console.log('all products loaded', allProducts.length)
  console.log('search is ready.')
  return (textToMatch, searchBy = 'name') => {
    textToMatch = textToMatch.toUpperCase()
    const matched = allProducts.filter(doc => doc[searchBy].toUpperCase().includes(textToMatch))
    const sorted = sortMatched(textToMatch, searchBy, matched)
    return new Promise((res, rej) => res(sorted))
  }
}

const db = { Products, save: saveProducts, find: findProducts, initSearch: initSearchProducts }
checkForHydration(db)

module.exports = db



