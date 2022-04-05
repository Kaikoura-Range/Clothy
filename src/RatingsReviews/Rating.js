import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';


export default function Rating({data}){

    console.log('characteristics', data.characteristics)
    function ratingAverage(){
        var total = 0, totalcount = 0;

        for(var i in data.ratings) {
            total += Number(data.ratings[i]*i);
            totalcount += Number(data.ratings[i]);

        }

        return total / totalcount;
    }
    function recommendPercentage(){
        var numerator = Number(data.recommended.true);
        var denominator = Number(data.recommended.false);
        return (numerator /(numerator+denominator))*100;
    }
    function Stars() {
       return (
           <div>
               5 stars:{data.ratings[5]},
               4 stars:{data.ratings[4]},
               3 stars:{data.ratings[3]},
               2 stars:{data.ratings[2]},
               1 stars:{data.ratings[1]}
           </div>
       )
    }
    function Comfort(){
        if(data.characteristics.Comfort){

        
        return(
            <>
            comfort: {data.characteristics.Comfort.value}
            </>
        )
        }
    }
    function Fit(){
        if(data.characteristics.Fit) {
        return(
            <>
            fit: {data.characteristics.Fit.value}
            </>
        )
        }
    }
    function Quality(){
        if(data.characteristics.Quality){
        return(
            <>
            Quality: {data.characteristics.Quality.value}
            </>
        )
        }
    }
    function Length(){

       if(data.characteristics.Length) {
        return(
            <>
            Length: {data.characteristics.Length.value}
            </>
        )
       }
        
    }
    return (
        <div>
           <div>rating: {ratingAverage()}</div>
           <div>{recommendPercentage()}% of reviews recommend this product</div>
           <Stars />
           <Comfort />
           <Fit />
           <Quality />
           <Length />
        </div>
    )
}