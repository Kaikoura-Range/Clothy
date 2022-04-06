import React from 'react';
import styled from 'styled-components';

export default function Image(props) {
  return (
    <ImageWrapper>
      <Img src={props.src} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  width: 50%;
`;
