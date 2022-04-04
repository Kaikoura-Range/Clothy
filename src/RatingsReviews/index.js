
import React from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'

var mainRenderCount = 0;

export default function RatingsReviews(props) {
  if( props.dev.logs ) {
    mainRenderCount++;
    props.dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    props.dev.state && console.log('DEV  STATE   RelatedProducts: ', props.reviewData)
  }

  const [fullSummary, setFullSummary] = React.useState(false);
  const [sortedReviews, setSortedReviews] = React.useState([{date:'2022-02-21T00:00:00.000Z', helpfulness:1},
  {date:'2020-02-21T00:00:00.000Z',helpfulness:3},{date:'2021-02-21T00:00:00.000Z',helpfulness:2}]);
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
console.log();
  return (
    <>
      <div>{props.reviewData.results.length} reviews
      <select onChange={ (e) => { setSortedReviews(props.reviewData.results.sort((a,b) => sorting( a,b,e.target.value)).sort((a,b) => sorting(a,b,e.target.value))) } }>
        <option value="newest">newest</option>
        <option value="helpful">Helpfulness</option>
        <option value="relevant">Relevance</option>
      </select>
      </div>
    </>
  )
}

function writeReview() {
  const [show, setShow] = ReacuseState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

render(<Example />);


    if(props.reviewData) {
    return (

        <div>
          <SortReviews/>

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
    return ['/reviews/', { product_id: productId, page: 1, sort: 'newest' }]
  }




















// POST METHODS

    // api.post.review( { product_id: state.currentProduct,  })
    //   .then(res => console.log('post review res', res))

    // api.post.review.helpful('reviewId')
    //   .then(res => console.log('post help review res', res))

    // api.post.review.report('reviewId')
    //   .then(res => console.log('post report review res', res))