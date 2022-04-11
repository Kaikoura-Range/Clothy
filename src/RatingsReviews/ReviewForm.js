import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import api from '../api/index';
import Stars from './Star.js';

export default function ReviewForm(props) {
  const [state] = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [overallRating, setOverallRating] = useState();
  const [starClicked,setStarClicked] = useState(false);
  const [minChar,setMinChar] = useState(0);
  const [img, setImg] = useState();

const starDescription = ['Poor','Fair','Average','Good','Great']
const characteristicSelector = {
  'Fit': ['Runs tight','Runs slightly tight','Perfect','Runs slightly long','Runs long'],
  'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  'Width': ['Too narrow','Slightly narrow','Perfect','Slightly wide', 'Too Wide'],
  'Comfort': ['Uncomfortable','Slightly uncomfortable','Ok','Comfortable','Perfect'],
  'Quality': ['Poor','Below average','What I expected','Pretty great','Perfect'],
  'Length': ['Runs Short','Runs slightly short','Perfect','Runs slightly long','Runs long']
}

  const onSubmitHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    var newQuestion = {
      product_id: state.currentProduct,
      body: body,
      name: username,
      email: email,
    };
    api.post
      .question(newQuestion)
      .then((res) => console.log('post question res', res))
      .then(() => {
        props.showForm(false);
        setUsername('');
        setEmail('');
        setBody('');
      })
      .catch((err) => console.log('question not sent!'));
  };
  const setStars =(e) => {
    setOverallRating(Number(e.target.id)+1)
    setStarClicked(true)
  }
 
  const onImageChange = (e) => {
    if (e.target.files.length > 5) {
      alert("Only up to 5 files accepted.");
      e.preventDefault();
    } else if(e.target.files.length === 0){
      setImg(null);
    }else {
      setImg(Object.entries(e.target.files).map((file) => {
        return URL.createObjectURL(file[1])
      })) 
    }
  }
  
  return (
    <Modal onClick={(e)=> e.stopPropagation()}>
      <ReviewFormContainer>
        <form >
          <h1>Write your Review </h1>
          <h2>{`About the ${state.details.product.name}`}</h2>
          <OverallRatingContainer onClick={setStars}>Overall Rating:
            <Stars ratingAvg={overallRating}/>
            {starClicked && <p>{overallRating} star: {starDescription[overallRating-1]} </p>}
          </OverallRatingContainer>
          <div>Do you recommend the Product?
            <input type="radio" name={`recommend`} id='yes' value='yes'/>Yes
            <input type="radio" name={`recommend`} id="no" value='no'/>No
          </div>
          <CharacteristicsContainer>Characteristics: 
            {Object.entries(state.reviews.meta.characteristics).map((characteristic,id) => {
              return (
                <div key={id}>{characteristic[0]}
                  <div>
                    <input type="radio" name={`${characteristic[0]}`} value='1'/>{characteristicSelector[characteristic[0]][0]}
                  </div>
                  <div>
                    <input type="radio" name={`${characteristic[0]}`} value='2'/>{characteristicSelector[characteristic[0]][1]}
                  </div>
                  <div>
                    <input type="radio" name={`${characteristic[0]}`} value='3'/>{characteristicSelector[characteristic[0]][2]}
                  </div>
                  <div>
                    <input type="radio" name={`${characteristic[0]}`} value='4'/>{characteristicSelector[characteristic[0]][3]}
                  </div>
                  <div>
                    <input type="radio" name={`${characteristic[0]}`} value='5'/>{characteristicSelector[characteristic[0]][4]}
                  </div>
                </div>
              )
            })}
          </CharacteristicsContainer>
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={onImageChange} multiple/>
          {img && (img.map((photo,id)=>{
            return(
              <img key={id} src={photo} height="50" width="50" alt="" />
            )
          }))}

          <ReviewTextContainer>
            <ReviewSummaryTextContainer type='text' placeholder='Example: Best purchase ever!' maxlength='60'/>
            <ReviewBodyContainer placeholder="Why did you like the product or not?" minlength="50" maxlength='1000' onChange={(e)=>setMinChar(e.target.value.length)}/>
          </ReviewTextContainer>
          
          {minChar >= 50 ? <div>Minimum Reached</div> : <div>Minimum required characters left: {50-minChar}</div>}
            
            
         
        </form>
      </ReviewFormContainer>
    </Modal>
  );
}

const ReviewFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;
const OverallRatingContainer = styled.div`
display: flex;
flex-direction: row;
`
const CharacteristicsContainer = styled.div`
display: flex;
flex-direction: row;
`
const ReviewSummaryTextContainer = styled.input`
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
height:30px;
width: 100%;
`
const ReviewTextContainer = styled.div`
display: flex;
flex-direction: column;
`
const ReviewBodyContainer = styled.textarea`
resize: none;
height: 200px;
width: 100%;
`
const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 15%;
  width: 75%;
  z-index: 2;
`;
