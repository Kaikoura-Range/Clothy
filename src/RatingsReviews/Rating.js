import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';


export default function Rating(props){
    

    function ratingAverage(){
        var total = 0, totalcount = 0;

        for(var i in props.data.ratings) {
            total += Number(props.data.ratings[i]*i);
            totalcount += Number(props.data.ratings[i]);
           
        }
       
        return total / totalcount;  
    }
    function recommendPercentage(){
        var numerator = Number(props.data.recommended.true);
        var denominator = Number(props.data.recommended.false);
        return (numerator /(numerator+denominator))*100;
    }
    function Stars() {
       return (
           <div>
               5 stars:{props.data.ratings[5]},
               4 stars:{props.data.ratings[4]},
               3 stars:{props.data.ratings[3]},
               2 stars:{props.data.ratings[2]},
               1 stars:{props.data.ratings[1]}
           </div>
       ) 
    }
    function Comfort(){
        return(
            <>
            comfort: {props.data.characteristics.Comfort.value}
            </>
        )
    }
    function Fit(){
        return(
            <>
            fit: {props.data.characteristics.Fit.value}
            </>
        )
    }
    function Quality(){
        return(
            <>
            Quality: {props.data.characteristics.Quality.value}
            </>
        )
    }
    function Length(){
        return(
            <>
            Length: {props.data.characteristics.Length.value}
            </>
        )
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