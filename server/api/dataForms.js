
const defaultProductId = '0'


const answerForm = {
  answerer_name: "none",
  body: 'none',
  date: "2022-04-08T00:00:00.000Z",
  helpfulness: 0,
  id: 0,
  photos: [],
}

const questionForm = {
  answers: { default: answerForm },
  asker_name: "none",
  question_body: "none",
  question_date: "2022-04-08T00:00:00.000Z",
  question_helpfulness: 0,
  question_id: 0,
  reported: false,
}

const QAform = {
  product_id: defaultProductId,
  results: [questionForm],
}







const relatedForm = [defaultProductId]








const featureForm = {feature: 'none', value: 'none'}

const skuForm = {
  quantity: 0,
  size: "none"
}

const photoForm = {
  thumbnail_url: "none",
  url: "none"
}

const styleForm = {
  "default?": true,
  name: "Forest Green & Black",
  original_price: "140.00",
  photos: [photoForm],
  sale_price: null,
  skus: { default: skuForm },
  style_id: 0,
}

const detailsForm = {
  product: {
    campus: "hr-rfe",
    category: "none",
    created_at: "2021-08-13T14:37:33.145Z",
    default_price: "0.00",
    description: "none",
    features: [featureForm],
    id: defaultProductId,
    name: "none",
    slogan: "none",
    updated_at: "2021-08-13T14:37:33.145Z",
  },

  styles: {
    product_id: defaultProductId,
    results: [styleForm],
  }
}









const reviewForm = {
  body: "none",
  date: "2022-02-16T00:00:00.000Z",
  helpfulness: 0,
  photos: [photoForm],
  rating: 0,
  recommend: false,
  response: null,
  review_id: 0,
  reviewer_name: "none",
  summary: "none",
}


const reviewsForm = {
  meta:{
    characteristics: {},
    product_id: defaultProductId,
    ratings: {},
    recommended: {false: '0', true: '0'},
  },
  reviews: {
    count: 0,
    page: 0,
    product: defaultProductId,
    results: [reviewForm],
  }
}



module.exports = {
  ...reviewsForm,
  ...detailsForm,
  QA: QAform,
  related: relatedForm
}