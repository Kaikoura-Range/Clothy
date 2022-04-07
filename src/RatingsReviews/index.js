import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReviewForm from './ReviewForm.js';
import Rating from './Rating.js';
import Review from './Review.js';

var mainRenderCount = 0;

export default function RatingsReviews(props) {
  if( props.dev.logs ) {
    mainRenderCount++;
    props.dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    props.dev.state && console.log('DEV  STATE   RelatedProducts: ', props.reviewData)
  }

  const [sortSelect,setSortSelect] = useState('relevant');
  const [sortedReviews, setSortedReviews] = useState(props.reviewData.results);
  const [diplayedReviewCount, setReviewCount] = useState(2);
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState('');

  function addReviews() {
    // var value = sortedReviews.length-diplayedReviewCount;
    // if(value >= 2) {
    //   setReviewCount(diplayedReviewCount +2);
    // } else if( value === 1 ) {
    //   setReviewCount(diplayedReviewCount +1);
    // }
    setReviewCount(sortedReviews.length)
  }
  const sortReviews = (e) => {
    setSortSelect(e.target.value);
    if(e.target.value === "helpful") {
      setSortedReviews(sortedReviews.sort((a,b) => b.helpfulness - a.helpfulness));
    } else if(e.target.value === "newest") {
      setSortedReviews(sortedReviews.sort((a,b) => new moment(b.date).valueOf() - new moment(a.date).valueOf()));
    } else {
      setSortedReviews(sortedReviews.sort((a,b) => new moment(b.date).valueOf() - new moment(a.date).valueOf()).sort((a,b) => b.helpfulness - a.helpfulness));
    }
  }

    if(props.reviewData) {
      return (

        <RatingsReviewsContainer data-testid="reviews" >
          <Rating data={props.reviewMeta}/>
          <ReviewsListContainer>
            <div>
              {props.reviewData.results.length} reviews sorted by
              <select value={sortSelect} onChange={sortReviews}>
                <option value="newest">newest</option>
                <option value="helpful">Helpfulness</option>
                <option value="relevant">Relevance</option>
              </select>
            </div>
            <SearchReviews type='search' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search For a Review'/>
            {sortedReviews.filter(item => {
              if(keyword.length >= 3) {
                const entries = Object.entries(item);
                return entries.some(entry=>entry[1]?entry[1].toString().toLowerCase().includes(keyword.toLowerCase()):false);
              } else return item
            }).slice(0,diplayedReviewCount).map((review,id) => {return (<Review key={id} review={review}/>)})}
            {(sortedReviews.length-diplayedReviewCount >0) && (<button onClick={addReviews}>More Reviews</button>)}
            <button onClick={() => {setOpenModal(true)}}>Add a Review</button>
            {openModal && (<BackDrop onClick={()=>setOpenModal(!openModal)}><ReviewForm /></BackDrop>)}
          </ReviewsListContainer>
        </RatingsReviewsContainer>
      )
    }
    return (
      <div data-testid="reviews" >
        Loading...
      </div>
    )
};

export const reviewStateInit = (productId) => {
  return {
    'meta':['/reviews/meta', { product_id: productId }],
    'reviews': ['/reviews/', { product_id: productId, page: 1, count:20, sort: 'newest' }]
  }
}
  const RatingsReviewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: auto;
  `
  const ReviewsListContainer =styled.div`
  display: flex;
  width: 66%;
  flex-direction: column;
  max-height: 1000px;
  overflow: auto;
  `
  const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1.5;
  background: rgba(0, 0, 0, 0.75);
`
const SearchReviews = styled.input`
  border: 2px solid black;
  display: block;
  margin-top: 25px;
  padding: 15px;
  width: 50%;
  font-size: 20px;
`
// POST METHODS

    // api.post.review( { product_id: state.currentProduct,  })
    //   .then(res => console.log('post review res', res))

    // api.post.review.helpful('reviewId')
    //   .then(res => console.log('post help review res', res))

    // api.post.review.report('reviewId')
    //   .then(res => console.log('post report review res', res))