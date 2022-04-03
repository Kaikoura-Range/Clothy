import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import api from '../api/index';
export default function QuestionForm(props) {
  const [state] = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const onSubmitHandler = (e) => {
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
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeBody = (e) => {
    setBody(e.target.value);
  };

  return (
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
        placeholder='Ask a question about the product'></textarea>
      <input type='submit' />
    </form>
  );
}
