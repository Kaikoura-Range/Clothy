import styled, { css } from 'styled-components';
import React, { useState, useEffect } from  'react';

export default function Stars({ratingAvg, theme, starColor}) {
    let rating = ratingAvg || 0;
    let stars = [];
    while (stars.length < 5) {
        if (rating > 1) {
            stars.push(1);
        } else if (rating > 0) {
            let empty = Math.abs(0 - rating);
            let quart = Math.abs(0.25 - rating);
            let half = Math.abs(0.5 - rating);
            let three = Math.abs(0.75 - rating);
            let full = Math.abs(1 - rating);
            let closest = Math.min(empty, quart, half, three, full);
            switch (closest) {
                case (empty):
                    stars.push(0);
                    break;

                case quart:
                    stars.push(0.25);
                    break;
                case half:
                    stars.push(0.5);
                    break;

                case three:
                    stars.push(0.75);
                    break;
                case full:
                    stars.push(1.0);
                    break;

                default:
                    stars.push(0);
                    break;
            }
        } else {
            stars.push(0);
        }
        rating = rating - 1;
    }
    return (
        <div>
            {stars.map((item, i) => {
                return (
                    <SingleStarContainer key={i} onMouseOver={()=>{}}  style={{height: '1.2em', width: '1em'}}>
                        <SingleStarFill  style={{width: `${parseInt(item*16)}px`, height: '1.2em'}} starColor={starColor} >
                            <SingleStarOutline theme={theme} id={i} src="https://raw.githubusercontent.com/psfonseka/five-stars/master/dist/star.png" alt="stars alt" onClick={()=>{}}  style={{height: '1.2em', width: '1em'}}></SingleStarOutline>
                        </SingleStarFill>
                    </SingleStarContainer>
                )
            })}
        </div>
    )
 };

 const SingleStarOutline = styled.img`
    height: 36px;
    width: 31px;
    filter: ${(props => {
        if (typeof(props.theme) === 'string') {
            return props.theme === 'dark' ? css`invert(93%);` : css`invert(0%);`
        }
    })};
  `
  const SingleStarFill = styled.div`
    position: relative;
    display: inline-block;
    height: 36px;
    background-color: ${props => props.starColor ? props.starColor : 'var(--body-fc)'};
  `
  const SingleStarContainer =styled.div`
    height: 36px;
    width: 31px;
    display: inline-block;
  `


//



