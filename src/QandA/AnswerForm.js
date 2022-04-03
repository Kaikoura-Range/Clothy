import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';
import api from '../api/index';
import ImageForm from './ImageForm';
export default function AnswerForm(props) {
  const [state] = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [imageForm, setImageForm] = useState(false);
  const [uploadImagesButton, setUploadImagesButton] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newAnswer = {
      photos: photos,
      body: body,
      name: username,
      email: email,
    };
    api.post
      .answer(props.id, newAnswer)
      .then((res) => console.log('post answer res', res))
      .then(() => {
        props.showForm(false);
        setUsername('');
        setEmail('');
        setBody('');
        setPhotos(null);
        setUploadImagesButton(true);
      })
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

  const onChangePhotos = (e) => {
    setPhotoUrl(e.target.value);
  };

  const showImageFormHandler = () => {
    setImageForm(true);
    setUploadImagesButton(false);
  };

  const getPhotosHandler = (arrOfPhotos) => {
    const filtered = arrOfPhotos.filter((val) => val !== '');
    console.log(filtered);
    setPhotos(filtered);
  };

  const afterImageFormSubmitHandler = () => {
    setImageForm(false);
  };

  return (
    <AnswerFormContainer>
      <form onSubmit={onSubmitHandler}>
        <label>Username: </label>
        <Input type='text' onChange={onChangeUsername} placeholder='Example: jackson11!' required />
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
          placeholder='Add your answer to a question here...'
          required></TextArea>
        <CenterItemsWrapper>
          <InputSubmit type='submit' />
        </CenterItemsWrapper>
      </form>
      {imageForm && (
        <ImageForm afterSubmit={afterImageFormSubmitHandler} getPhotos={getPhotosHandler} />
      )}
      {uploadImagesButton && (
        <CenterItemsWrapper>
          <UploadImageButton onClick={showImageFormHandler}>
            Click to upload images
          </UploadImageButton>
        </CenterItemsWrapper>
      )}
    </AnswerFormContainer>
  );
}

const AnswerFormContainer = styled.div`
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 20px;
  z-index: 2;
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
