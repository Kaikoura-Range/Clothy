
import React from 'react';
import moment from 'moment';

export default function RatingsReviews(props) {
  // if( state.dev.pref ) {
    // console.log('DEV- Review rendered')
  // }
  const [fullSummary, setFullSummary] = React.useState(false);

  function Recommended(props) {
    if(props.input === 'true') {
      return <div>Recommended!</div>
    }
  }
  function SalesResponse(props) {
    if(props.response) {
      return <div>{props.response}</div>
    }
  }

  function Images(props) {
     return props.photos.map((photo) => {
      return <img key={photo.id} src={photo.url} alt='' height="50" width="50"/>
    });
  }
  function Star(props) {
   return <div>star rating: {props.stars}</div>
 }
 function Helpfulness(props) {
  return <div>Was this helpful?</div>
}

function SummaryBody(props) {
  return (
  <div>
    <b>{props.summary}</b>
   {fullSummary ? <div>{props.body}</div> : <div>{props.body.substring(0,250)}</div>}
  </div>
  )
}

    if(props.reviewData) {
    return (
        <div data-testid="reviews" >
           {props.reviewData.results.map((review,id) => {
            return (
            <div key={id}>
              <div>{moment(review.date).format("MMM Do YY")}</div>
              <div>review name- {review.reviewer_name}</div>
              <SummaryBody summary={review.summary} body={review.body} showFull={false}/>
              <Recommended input={review.recommend.toString()}/>
              <SalesResponse response={review.response}/>
              <Images photos={review.photos}/>
              <Star stars={review.rating}/>
              <Helpfulness counter={review.helpfulness}/>
            </div>
            )
          })}

        </div>
    )
    }
    return (
      <div data-testid="reviews" >
        Loading...
      </div>
    )
};


export const reviewStateInit = (productId) => {
    return [
      ['this', '/reviews/', { product_id: productId, page: 1, sort: 'newest' }]
    ]
  }




















// POST METHODS

    // api.post.review( { product_id: state.currentProduct,  })
    //   .then(res => console.log('post review res', res))

    // api.post.review.helpful('reviewId')
    //   .then(res => console.log('post help review res', res))

    // api.post.review.report('reviewId')
    //   .then(res => console.log('post report review res', res))