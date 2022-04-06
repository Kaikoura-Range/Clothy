import React, { useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../../../appState/index';
import styled from 'styled-components';

export default function Image(props) {
  return <Img src={props.src} />;
}

const Img = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
