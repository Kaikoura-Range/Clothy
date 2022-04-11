const mongoose = require("mongoose");
const { Schema } = mongoose;


const RandomId = () => {
  return Math.round((Math.random() * 100 000))
}

const PhotosSchema = new Schema({
  thumbnail_url: {
    type: String,
    default: null,
  },
  url:  {
    type: String,
    default: null,
  },
})



const ReviewssSchema = new Schema({
  review_id: {
    type: Number,
    default: RandomId
  },
  reviewer_name: {
    type: String,
    default: null,
  },

  summary: {
    type: String,
    default: null,
  },
  body: {
    type: String,
    default: null,
  },
  response: {
    type: String,
    default: null,
  },

  helpfulness: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  recommend: {
    type: Boolean,
    default: false,
  },

  photos: {
    type: [ PhotosSchema ],
    default: [].
  }

  date:  {
    type: Date,
    default: Date.now
  },
})



const AnswersSchema = new Schema({
  id: {
    type: Number,
    default: RandomId
  },
  answerer_name: {
    type: String,
    default: null,
  },
  body: {
    type: String,
    default: null,
  },
  helpfulness: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  date:  {
    type: Date,
    default: Date.now
  },
  photos: {
    type: [ PhotosSchema ],
    default: [].
  }
})




const QuestionsSchema = new Schema({
  question_id: {
    type: Number,
    default: RandomId
  },
  asker_name: {
    type: String,
    default: null,
  },
  question_body: {
    type: String,
    default: null,
  },
  question_helpfulness: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  question_date:  {
    type: Date,
    default: Date.now
  },
  answers: {
    type: [ AnswersSchema ],
    default: [].
  }

})









const SkusSchema = new Schema({
  sku_id: {
    type: Number,
    default: RandomId
  },
  quantity: {
    type: Number,
    required: true
  },
  size:  {
    type: String,
    required: true,
    unique: true
  },
})





const StylesSchema = new Schema({
  style_id: {
    type: Number,
    default: RandomId
  },
  "default?": {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    default: null
  },
  original_price: {
    type: String,
    default: null
  },
  sale_price: {
    type: String,
    default: null
  },
  photos: {
    type: [ PhotosSchema ],
    default: []
  },
  skus:  {
    type: [ SkusSchema ],
    default: []
  },
})



const FeaturesSchema = new Schema({
  feature: {
    type: String,
    default: null
  },
  value: {
    type: String,
    default: null
  }
})



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

  related: {
    type: [ Number ],
    default: []
  },
  features: {
    type: [ FeaturesSchema ],
    default: []
  },
  styles: {
    type: [ StylesSchema ],
    default: []
  },
  questions: {
    type: [ QuestionsSchema ],
    default: []
  },
  reviews: {
    type: [ QuestionsSchema ],
    default: []
  },
  meta: {
    type: [ QuestionsSchema ],
    default: []
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





module.exports = {
  ProductsSchema
}