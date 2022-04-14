import React, { useState, useContext, useEffect } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import moment from 'moment';
import styled from 'styled-components';
import Star from './Star.js';
import api from '../api/index';


const isClickable = (reviewId, savedReviews) => {
    return savedReviews.some((savedIds)=>{
        return savedIds === reviewId
    })
}

const Review = ({review}) => {
  const [fullSummary, setFullSummary] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [state] = useContext(StateContext);
  const [clicked, setClicked] = useState(isClickable(review.review_id, state.user.reviews));
  const [notH,setNotH] = useState(0);
  const [, dispatch] = useContext(DispatchContext);

  useEffect((()=> {setClicked(isClickable(review.review_id, state.user.reviews))}),[review.review_id,state.user.reviews])

  const showImg = (photo) => {
    setOpenModal(true);
    setSelectedImage(photo.id)
  }

  const clickedHelpful = (id) => {
    if(!clicked){
        dispatch({type:'ADD_TO_REVIEWS',payload:id})
        setClicked(true)
        api.upvote.review({ typeId: id, productId: state.currentProduct })
        .then(() => api.load.newProduct(state.currentProduct, dispatch))
        .catch(err => console.log('problem ',err))
    }
  }
  const clickedNotHelpful = (id) => {
    if(!clicked) {
        dispatch({type:'ADD_TO_REVIEWS',payload:id})
        setClicked(true);
        setNotH(1);
    }
  }

  const {photos} = review
  const nonDups = photos.reduce((memo, photo, ind) => {
    const nextSlice = ind + 1;
    const checkedphotos = photos.slice(nextSlice);
    const found = checkedphotos.some(otherphotos => otherphotos.url === photo.url)
    if(!found) {
      memo.push(photo)
    }
    return memo
  }, [])

    return (
    <IndividualReviewContainer className='Individual Review'>
        By: {review.reviewer_name} | {moment(review.date).format("MMM Do, YYYY")}
        <SummaryContainer className='Summary'>
            <b>{review.summary.substr(0,60)}</b>
            <div>{fullSummary ? review.body : (review.body.substr(0,250))}</div>
            <button hidden={fullSummary || review.body.length <250} onClick={()=>setFullSummary(true)}>show more</button>
        </SummaryContainer>
        {review.recommend.toString() && <div>I recommend this product! &#10003;</div>}
        {review.response && <div>Seller Response: {review.response}</div>}
        {nonDups.map((photo, id) => {
            return(<span key={id}>
                <img key={photo.id} src={photo.url} alt='' decoding="async" loading="lazy" height="50" width="50" onClick={() => {showImg(photo)}}/>
                {(openModal && photo.id===selectedImage)&& (<BackDrop onClick={()=>setOpenModal(!openModal)}>  <ImageContainer src={photo.url} alt=''/> </BackDrop>)}
                </span>
            )
        })}
        <Star theme={state.user.theme} ratingAvg={review.rating}/>
        <div>
            {clicked ? <div>Thank you for the feedback!</div> : <div>Was this review helpful?</div>}
            <span onClick={()=> clickedHelpful(review.review_id)}>Yes({review.helpfulness}) | </span>
            <span onClick={()=> clickedNotHelpful(review.review_id)}>No({notH}) </span>
        </div>
    </IndividualReviewContainer>
    )
}

const SummaryContainer = styled.div`
margin-left: 30px;
`
const Image=styled.img`
decoding="async";
loading="lazy";
height="50";
width="50";
`
const IndividualReviewContainer = styled.div`
border-bottom: 0.5px solid black;
`
const ImageContainer = styled.img`
max-width: 90%;
max-height: 90%;
display: inline;
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
