import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import ModalTemplate from './ModalTemplate';
export default function ErrorModal() {
  return (
    <ModalTemplate>
      <ErrorMessage>
        <XMark></XMark> You cannot mark this more than once!
      </ErrorMessage>
    </ModalTemplate>
  );
}

const XMark = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 15px;
  height: 15px;
  background: -webkit-linear-gradient(
      -45deg,
      transparent 0%,
      transparent 40%,
      #d8000c 46%,
      #d8000c 56%,
      transparent 56%,
      transparent 100%
    ),
    -webkit-linear-gradient(45deg, transparent 0%, transparent 40%, #d8000c 46%, #d8000c 56%, transparent
          56%, transparent 100%);
`;

const ErrorAnimation = keyframes`
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

const ErrorMessage = styled.h3`
  background-color: #ffbaba;
  color: #d8000c;
  padding: 20px;
  border-radius: 5px;
  animation: ${ErrorAnimation} 1s ease-in-out;
`;
