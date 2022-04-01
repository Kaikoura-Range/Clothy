import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
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
      //photos = ['image url']
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

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label>Username: </label>
        <input
          type='text'
          name='username'
          onChange={onChangeUsername}
          placeholder='Example: jackson11!'
        />
        <label>Email: </label>
        <input
          type='email'
          name='email'
          onChange={onChangeEmail}
          placeholder='Example: abc@gmail.com'
        />
        <textarea
          type='text'
          name='body'
          onChange={onChangeBody}
          placeholder='Did you like the product or not?'></textarea>
        <input type='submit' />
      </form>
      {imageForm && <ImageForm getPhotos={getPhotosHandler} />}
      {uploadImagesButton && <button onClick={showImageFormHandler}>Click to upload images</button>}
    </>
  );
}
