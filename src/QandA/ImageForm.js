import React, { useState } from 'react';

export default function ImageForm(props) {
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [submitButton, setSubmitButton] = useState(true);
  const img1Handler = (e) => {
    setImg1(e.target.value);
  };
  const img2Handler = (e) => {
    setImg2(e.target.value);
  };
  const img3Handler = (e) => {
    setImg3(e.target.value);
  };
  const img4Handler = (e) => {
    setImg4(e.target.value);
  };
  const img5Handler = (e) => {
    setImg5(e.target.value);
  };
  const onSubmitHandler = () => {
    props.getPhotos([img1, img2, img3, img4, img5]);
    setSubmitButton(false);
  };

  return (
    <div>
      <input value={img1} onChange={img1Handler} type='text' />
      <input value={img2} onChange={img2Handler} type='text' />
      <input value={img3} onChange={img3Handler} type='text' />
      <input value={img4} onChange={img4Handler} type='text' />
      <input value={img5} onChange={img5Handler} type='text' />
      {submitButton && <button onClick={onSubmitHandler}>Submit photos</button>}
    </div>
  );
}
