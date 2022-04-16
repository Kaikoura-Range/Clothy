import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import ModalTemplate from './ModalTemplate';
export default function SuccessModal() {
  return (
    <ModalTemplate>
      <SuccessMessage>
        <CheckMark></CheckMark> Success! Message posted.
      </SuccessMessage>
    </ModalTemplate>
  );
}

const CheckMark = styled.div`
  display: inline-block;
  transform: rotate(45deg);
  height: 20px;
  width: 12px;
  margin-right: 10px;
  border-bottom: 4px solid #78b13f;
  border-right: 4px solid #78b13f;
`;

const successAnimation = keyframes`
 0% {
   opacity: 0;
   transform: translateY(100px);
 }

 50% {
   opacity: .25;
 }

 100% {
   opacity: 1;
   transform: translateY(0px);
 }
`;

const SuccessMessage = styled.h3`
  background-color: #dff2bf;
  color: #270;
  padding: 20px;
  border-radius: 5px;
  animation: ${successAnimation} 1s ease-in-out;
`;
