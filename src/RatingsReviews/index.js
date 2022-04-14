import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import ReviewForm from './ReviewForm.js';
import Rating from './Rating.js';
import Review from './Review.js';
import tracker from '../components/Tracker.js'

var mainRenderCount = 0;

export default function RatingsReviews({reviewData, reviewMeta, dev, theme}) {
  const {results} = reviewData;
  // if( dev.logs ) {
  //   mainRenderCount++;
  //   dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
  //   dev.state && console.log('DEV  STATE   RelatedProducts: ', reviewData)
  // }

  const [sortSelect,setSortSelect] = useState('relevant')
  const [sortedReviews, setSortedReviews] = useState(results)
  const [diplayedReviewCount, setReviewCount] = useState(2)
  const [openModal, setOpenModal] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [starcount, setStarCount] = useState(5)
  const [filtered, setFiltered] = useState(false)

  useEffect(()=> {
    var newSorted;
    if(sortSelect === "helpful") {
      newSorted = results.sort((a,b) => b.helpfulness - a.helpfulness);
    } if(sortSelect === "newest") {
      newSorted = results.sort((a,b) => new moment(b.date).valueOf() - new moment(a.date).valueOf());
    } if(sortSelect === 'relevant') {
      newSorted = results.sort((a,b) => relevantSort(a,b));
    }
    setSortedReviews([...newSorted])
  },[sortSelect, results])

  const relevantSort = (a,b) => {
    var cmp = b.helpfulness - a.helpfulness;
    if(Math.abs(cmp) <=7) {
       return new moment(b.date).valueOf() - new moment(a.date).valueOf();
    } else return cmp;
  }
  const setStarFilter = (e) => {
    if(Number(e.target.id)+1 === 5) setFiltered(false) 
    else Number(e.target.id)+1 ===starcount ? (setFiltered(false), setStarCount(5)): (setStarCount(Number(e.target.id)+1), setFiltered(true))
  }
  const removeFilter = () =>{
    setFiltered(false)
    setStarCount(5)
  }

  if(reviewData) {
    return (
      <><Header>Ratings and Reviews</Header>
      <Wrapper onClick={(e)=>{tracker('TRACK_EVENT', 'reviews', e.target.className)}}>
      <RatingsReviewsContainer data-testid="reviews" className='reviews'>
        <Rating theme={theme} data={reviewMeta} filter={filtered} test={setStarFilter} remove={removeFilter} starcount={starcount}/>
        <ReviewsListContainer className='Reviews list'>
          <div className='review list selector'>
            {results.length} reviews sorted by
            <select className='sort selector' value={sortSelect} onChange={(e) => {setSortSelect(e.target.value) }}>
              <option value="newest">newest</option>
              <option value="helpful">Helpfulness</option>
              <option value="relevant">Relevance</option>
            </select>
          </div>
          <SearchReviews type='search' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} placeholder='Search For a Review'/>
          <InnerListContainer>
          {sortedReviews.filter((item) => {
            if(item.rating <= starcount) {
            if(keyword.length >= 3) {
              if(item.summary.toLowerCase().includes(keyword.toLowerCase()) || item.body.includes(keyword.toLowerCase())) {
                return item
              } 
            } else return item 
          }
          }).slice(0,diplayedReviewCount).map((review,id) => {return (<Review key={id} review={review} />)})}
         </InnerListContainer>
         <ButtonContainer>
          {(results.length-diplayedReviewCount >0) && (<Button onClick={()=> setReviewCount(results.length)}>More Reviews</Button>)}
          <Button onClick={() => {setOpenModal(true)}}>Add a Review</Button>
          {openModal && (<BackDrop className='Back drop' onClick={()=>setOpenModal(!openModal)}><ReviewForm className='Review form' done={setOpenModal} theme={theme}/></BackDrop>)}
          </ButtonContainer>
        </ReviewsListContainer>
      </RatingsReviewsContainer>
      </Wrapper>
      </>
    )
  }
  
  return (
    <div data-testid="reviews" >
      Loading...
    </div>
  )
}
  const Header=styled.h1`
  margin-left: 5%;
  font-size: var(--header-fs);
  color: var(--header-fc);
  `
  const Wrapper=styled.div`
  background-color: var(--contain-bgc);

  `
  const ButtonContainer=styled.div`
  padding: 10px;
  margin:auto;
  justify-content: space-between;
  `
  const Button=styled.button`
  padding: 10px;
  background-color: #2f3640;
  color: #fff;
  border-radius: 5%;
  `
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
  height: 800px;
  padding-top:2%;
  padding-bottom:2%;
 
  `
  const InnerListContainer=styled.div`
  display: flex;
  flex-direction: column;
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
  display:flex;
  justify-content: space-evenly;
  margin-top: 25px;
  padding: 15px;
  width: 50%;
  font-size: 20px;
`
