import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Stars from './Star.js';


export default function Rating({data, theme, filter,test,remove,starcount}){
    const[starColor,setStarColor] = useState('rgb(247, 153, 18)');
    const cSelector = {
        'Fit': ['Runs tight','Runs slightly tight','Perfect','Runs slightly long','Runs long'],
        'Size': ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
        'Width': ['Too narrow','Slightly narrow','Perfect','Slightly wide', 'Too Wide'],
        'Comfort': ['Uncomfortable','Slightly uncomfortable','Ok','Comfortable','Perfect'],
        'Quality': ['Poor','Below average','What I expected','Pretty great','Perfect'],
        'Length': ['Runs Short','Runs slightly short','Perfect','Runs slightly long','Runs long']
    }

    function ratingAverage(){
        var total = 0, totalcount = 0;

        for(var i in data.ratings) {
            total += Number(data.ratings[i]*i);
            totalcount += Number(data.ratings[i]);
        }
        return (Math.round(total / totalcount * 4) / 4).toFixed(1);
    }
    function recommendPercentage(){
        var numerator = Number(data.recommended.true);
        var denominator = Number(data.recommended.false);
        return Math.round((numerator /(numerator+denominator))*100);
    }

    function StarBars() {
        var total = 0;
        for(var i in data.ratings) {
            total += Number(data.ratings[i]);
        }
        return Object.values(data.ratings).map((rating,id) =>{
           return (
                <StarBarContainer key={id}>
                    {id+1} Star
                    <BarContainer style={{'backgroundColor' : 'gray'}}>
                        <BarContainer5 className="bar-5" style={{'width' : `${Number(rating)/total *100}%`}}></BarContainer5>
                    </BarContainer>
                    {rating}
                </StarBarContainer>
           )
        });
    }

    function Characteristics() {
        return Object.entries(data.characteristics).map((characteristic, id)=>{
            return (
                <OverallContainer key={id}>
                    <div key={characteristic[1].id}>{characteristic[0]}: {Number(characteristic[1].value).toFixed(1)}</div>
                    <BarContainer style={{'backgroundColor' : 'gray'}}>
                        <BarContainer5 className="bar-5" style={{'width' : `${Number(characteristic[1].value).toFixed(1)*20}%`}}></BarContainer5>
                    </BarContainer>
                    <CharacteristicsContainer>
                        <LeftChar>{cSelector[characteristic[0]][0]}</LeftChar>
                        <RightChar>{cSelector[characteristic[0]][4]}</RightChar>
                    </CharacteristicsContainer>
                </OverallContainer>
            )
        })
     }

    
    return (
        <NewOverallContainer>
            <OverallRatingContainer onMouseOver={()=>{setStarColor('rgb(147, 193, 118)')}} onMouseLeave={()=>{setStarColor('rgb(247, 193, 18)')}} >
                <span>rating: {ratingAverage()}</span>
                <span onClick={(e)=>test(e)}>
                <Stars theme={theme} ratingAvg={ratingAverage()} starColor={starColor} onClick={(e)=>test(e)}/>
                </span>
            </OverallRatingContainer>
            {filter && (<div>{starcount} and below star filter applied<div onClick={remove}>Click to Remove</div></div>)}
           <div>{recommendPercentage()}% of reviews recommend this product</div>
           
           <StarBars/>
        
            <Characteristics />
            
        </NewOverallContainer>
    )
}
const NewOverallContainer = styled.div`
display: flex;
flex-direction: column;
width: 320px;
`
const OverallContainer= styled.div`
display: flex;
width: 100%;
padding: 10px;
flex-direction: column;
`
const LeftChar=styled.div`

`
const RightChar=styled.div`

`
const CharacteristicsContainer=styled.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
padding: 5px;

`
const OverallRatingContainer =styled.div`
    display: flex;
    flex-direction: row;
    padding:5px;
`
const StarBarContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding:5px;
    font-size: 13px;
`
const BarContainer = styled.div`
width: 100%;
background-color: #f1f1f1;
text-align: center;
color: white;
border-radius: 25px;
height: 18px;
`
const BarContainer5 = styled.div`
height: 18px;
background-color: #04AA6D;
border-radius: 25px
`