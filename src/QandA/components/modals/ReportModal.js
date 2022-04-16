import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import ModalTemplate from './ModalTemplate';
export default function ReportModal() {
  return (
    <ModalTemplate>
      <ReportMessage>You have marked this as reported!</ReportMessage>
    </ModalTemplate>
  );
}

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

const ReportMessage = styled.h3`
  background-color: #ffbaba;
  color: #d8000c;
  padding: 20px;
  border-radius: 5px;
  animation: ${ErrorAnimation} 1s ease-in-out;
`;
