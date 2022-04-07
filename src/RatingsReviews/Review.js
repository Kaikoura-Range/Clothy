import React, { useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Star from './Star.js';


const Review = ({review}) => {
  const [yesCounter, setYesCounter] = useState(review.helpfulness);
  const [noCounter, setNoCounter] = useState(review.unhelpfulness||0);
  const [fullSummary, setFullSummary] = useState(false);
  const [openModal, setOpenModal] = useState(false);



    return (
    <IndividualReviewContainer>
        <div>By: {review.reviewer_name} | {moment(review.date).format("MMM Do, YYYY")}</div>
        <SummaryContainer>
            <b>{review.summary.substr(0,60)}</b>
            <div>{fullSummary ? review.body : (review.body.substr(0,250))}</div>
            <button hidden={fullSummary || review.body.length <250} onClick={()=>setFullSummary(true)}>show more</button>
        </SummaryContainer>
        {review.recommend.toString() && <div>I recommend this product! &#10003;</div>}
        {review.response && <div>Seller Response: {review.response}</div>}
        {review.photos.map((photo) => {
            return(<>
                <img key={photo.id} src={photo.url} alt='' height="50" width="50" onClick={() => {setOpenModal(true)}}/> 
                {openModal && (<BackDrop onClick={()=>setOpenModal(!openModal)}>  <ImageContainer src={photo.url} alt='' /> </BackDrop>)}
                </>
            ) 
        })}
        <Star ratingAvg={review.rating}/>
        <div>Was this review helpful? <div onClick={()=> setYesCounter(yesCounter+1) }>Yes({yesCounter})</div> <div onClick={()=> setNoCounter(noCounter+1) }>No({noCounter})</div> </div>
    </IndividualReviewContainer>
    )
}
   

const SummaryContainer = styled.div`
    margin-left: 30px;
`

const IndividualReviewContainer = styled.div`
border-bottom: 0.5px solid black;
`
const ImageContainer = styled.img`
object-position: 50% 50%;
`

const BackDrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 2;
background: rgba(0, 0, 0, 0.90);
`
export default Review;


      