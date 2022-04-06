import React, { useState, useContext } from 'react';
import { StateContext, DispatchContext } from '../../../appState/index.js';
import styled from 'styled-components';
import api from '../../../api/index';
import ImageForm from './ImageForm';
export default function AnswerForm(props) {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState(null);
  const [imageForm, setImageForm] = useState(false);
  const [uploadImagesButton, setUploadImagesButton] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.showForm();
    let newAnswer = {
      photos: photos,
      body: body,
      name: username,
      email: email,
    };
    api.post
      .answer(props.id, newAnswer, state.currentProduct)
      .then((res) => console.log('post answer res', res))
      .then(() => {
        setUsername('');
        setEmail('');
        setBody('');
        setPhotos(null);
        setUploadImagesButton(true);
        return api.get.allProductData(state.currentProduct);
      })
      .then((getRes) =>
        dispatch({
          type: 'PROD_INIT',
          payload: getRes,
        })
      )
      .catch((err) => console.log('answer not sent!'));
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  const showImageFormHandler = (e) => {
    e.stopPropagation();
    setImageForm(true);
    setUploadImagesButton(false);
  };

  const getPhotosHandler = (arrOfPhotos) => {
    const filtered = arrOfPhotos.filter((val) => val !== '');
    setPhotos(filtered);
  };

  const afterImageFormSubmitHandler = () => {
    setImageForm(false);
  };

  const preventBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal onClick={preventBubbling}>
      <AnswerFormContainer>
        <Title>Submit Answer About Product:</Title>
        <ProductName>{state.details.product.name}</ProductName>
        <form onSubmit={onSubmitHandler}>
          <label>Username: </label>
          <Input
            type='text'
            onChange={onChangeUsername}
            placeholder='Example: jackson11!'
            required
          />
          <label>Email: </label>
          <Input
            type='email'
            onChange={onChangeEmail}
            placeholder='Example: abc@gmail.com'
            required
          />
          <TextArea
            type='text'
            onChange={onChangeBody}
            placeholder='Have an answer to a question? Answer it here!'
            required></TextArea>
          <CenterItemsWrapper>
            <InputSubmit type='submit' />
          </CenterItemsWrapper>
        </form>
        {imageForm && (
          <ImageFormContainer>
            <ImageForm afterSubmit={afterImageFormSubmitHandler} getPhotos={getPhotosHandler} />
          </ImageFormContainer>
        )}
        {uploadImagesButton && (
          <CenterItemsWrapper>
            <UploadImageButton onClick={showImageFormHandler}>
              Click to upload images
            </UploadImageButton>
          </CenterItemsWrapper>
        )}
      </AnswerFormContainer>
    </Modal>
  );
}

const AnswerFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
`;

const TextArea = styled.textarea`
  height: 200px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
`;

const ProductName = styled.h4`
  margin-top: 10px;
  text-align: center;
`;

const CenterItemsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputSubmit = styled.input`
  background-color: #ccc;
  color: black;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UploadImageButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ImageFormContainer = styled.div`
  display: flex;
`;

const Modal = styled.div`
  position: fixed;
  top: 30vh;
  left: 15%;
  width: 75%;
  z-index: 2;
`;
