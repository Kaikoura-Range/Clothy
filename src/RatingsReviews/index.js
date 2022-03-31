
import React, { useState } from 'react';
import moment from 'moment';

function Review() {

    return (
        <div>
            <div><b>Review Summary: 60 chars, bold</b></div>
            <div>{moment().format("MMM Do YY")}</div>
            <div>Reviewer name: if(verified purchaser)</div>
            <div>if(Recommend this product)</div>
            <div>if(Internal Sales response)</div>
            <div>Review body. default 250 chars, link to "show more"</div>
            <div>up to 5 images. default thumbnail, click to show full res</div>
            <div>star rating</div>
            <div>Was this helpful?</div>
        </div>
    )
};


export const reviewStateInit = (productId) => {
    return [
      ['this', '/reviews/', { product_id: productId, page: 1, sort: 'newest' }]
    ]
  }

export default Review;

