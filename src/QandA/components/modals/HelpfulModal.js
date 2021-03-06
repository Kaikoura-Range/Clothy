import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ModalTemplate from './ModalTemplate';
export default function HelpfulModal() {
  return (
    <ModalTemplate>
      <HelpfulMessage>
        <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '5px' }} />
        You marked this as helpful!
      </HelpfulMessage>
    </ModalTemplate>
  );
}
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

const HelpfulMessage = styled.h3`
  background-color: #bfd7f2;
  color: #3592ff;
  padding: 20px;
  border-radius: 5px;
  animation: ${successAnimation} 1s ease-in-out;
`;
