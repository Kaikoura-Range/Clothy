import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Star from './Star.js';

const Review = ({review}) => {
  const [helpfulCounter, setHelpfulCounter] = useState(review.helpfulness);
    return (
    <IndividualReviewContainer>
        <div>{moment(review.date).format("MMM Do YY")}</div>
        <div>review name- {review.reviewer_name}</div>
        <SummaryContainer>
            <b>{review.summary}</b>
            <div>{review.body}</div>
        </SummaryContainer>
        {review.recommend.toString() && <div>Recommended!</div>}
        {review.response && <div>{review.response}</div>}
        {review.photos.map((photo) => {return <img key={photo.id} src={photo.url} alt='' height="50" width="50"/>})}
        <Star ratingAvg={review.rating}/>
        <div onClick={()=> setHelpfulCounter(helpfulCounter+1) }>helpful? ({review.helpfulness})</div>
    </IndividualReviewContainer>
    )
}
   

const SummaryContainer = styled.div`
    margin-left: 30px;
`

const IndividualReviewContainer = styled.div`
border-bottom: 0.5px solid black;
`
export default Review;