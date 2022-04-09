import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import "./styles.css";
import Stars from './Star.js';


export default function Rating({data}){
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
            <span key={id}>{id+1} STAR: {rating}
            <div className="bar-container" style={{'backgroundColor' : 'gray'}}>
                <div className="bar-5" style={{'width' : `${Number(rating)/total *100}%`}}></div>
            </div>
            </span>
           ) 
        });
    }

    function Characteristics() {
        return Object.entries(data.characteristics).map((characteristic, id)=>{
            return (
                <div key={id}>
                <div key={characteristic[1].id}>{characteristic[0]}: {Number(characteristic[1].value).toFixed(1)}</div>
                
                <div className="bar-container" style={{'backgroundColor' : 'gray'}}>
                    <div className="bar-5" style={{'width' : `${Number(characteristic[1].value).toFixed(1)*20}%`}}></div>
                </div>
                </div>
            )
        })
     }

    return (
        <div>
           <div>rating: {ratingAverage()}</div>
           <div>{recommendPercentage()}% of reviews recommend this product</div>
           <Characteristics />
           <Stars ratingAvg={ratingAverage()}/>
           <StarBars/>
        </div>
    )
}

