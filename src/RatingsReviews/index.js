import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReviewForm from './ReviewForm.js';

var mainRenderCount = 0;

export default function RatingsReviews(props) {
  if( props.dev.logs ) {
    mainRenderCount++;
    props.dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    props.dev.state && console.log('DEV  STATE   RelatedProducts: ', props.reviewData)
  }

 

  const [fullSummary, setFullSummary] = React.useState(false);
  // const [sortedReviews, setSortedReviews] = React.useState([{date:'2022-02-21T00:00:00.000Z', helpfulness:1},
  // {date:'2020-02-21T00:00:00.000Z',helpfulness:3},{date:'2021-02-21T00:00:00.000Z',helpfulness:2}]);
  const [sortedReviews, setSortedReviews] = useState(props.reviewData.results);
  const [diplayedReviewCount, setReviewCount] = useState(2);
  const [openModal, setOpenModal] = useState(false);


  // useEffect(() => {
  //   props.reviewData && reviewStateInit(props.reviewData, )
  // }, [props.reviewData])



  //[{helpfulness:1},{helpfulness:2},{helpfulness:3}]
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

function sorting(a,b,option) {
  if(option === "helpful") {
   return b.helpfulness - a.helpfulness;
  } else if(option === "newest") {
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  } else {
    return 0
  }
}
//sortedReviews.sort((a,b)=>sorting(a,b,e.target.value))
// props.reviewData.results.sort((a,b) => sorting( a,b,e.target.value))

function SortReviews() {
var newlist = sortedReviews;

  return (
    <>
      <div>{props.reviewData.results.length} reviews
      <select onChange={ (e) => { setSortedReviews(newlist.sort((a,b) => sorting( a,b,e.target.value)).sort((a,b) => sorting(a,b,e.target.value))) } }>
        <option value="newest">newest</option>
        <option value="helpful">Helpfulness</option>
        <option value="relevant">Relevance</option>
      </select>
      </div>
    </>
  )
}
  function addReviews(){
    var value = sortedReviews.length-diplayedReviewCount;
    if(value >= 2) {
      setReviewCount(diplayedReviewCount +2);
    } else if( value === 1 ) {
      setReviewCount(diplayedReviewCount +1);
    } 
  }
  function ReviewButton(){
    var value = sortedReviews.length-diplayedReviewCount;
    if(value > 0 ){
      return (<button onClick={addReviews}>More Reviews</button>)
    }
  }
  function backDropHandler() {
    setOpenModal(!openModal)
  }
  
    if(props.reviewData) {
    return (
      <div data-testid="reviews" >
        <SortReviews />
        {sortedReviews.slice(0,diplayedReviewCount).map((review,id) => {
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
        <ReviewButton/>
        <button onClick={() => {setOpenModal(true)}}>Add a Review</button>
        {openModal && <ReviewForm />}
        {openModal && (
        <BackDrop onClick={backDropHandler}>
          <ReviewForm />
        </BackDrop>
      )}
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
    return ['/reviews/', { product_id: productId, page: 1, sort: 'newest' }]
  }



  const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1.5;
  background: rgba(0, 0, 0, 0.75);
`;
















// POST METHODS

    // api.post.review( { product_id: state.currentProduct,  })
    //   .then(res => console.log('post review res', res))

    // api.post.review.helpful('reviewId')
    //   .then(res => console.log('post help review res', res))

    // api.post.review.report('reviewId')
    //   .then(res => console.log('post report review res', res))