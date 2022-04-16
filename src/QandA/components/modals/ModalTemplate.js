import React from 'react';
import styled from 'styled-components';

export default function ModalTemplate(props) {
  return <Modal>{props.children}</Modal>;
}

const Modal = styled.div`
  text-align: center;
  position: fixed;
  margin-left: 25%;
  top: 5.5vh;
  width: 50%;
  z-index: 2;
`;
