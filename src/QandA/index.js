import React from 'react';

export default function QandQ() {
  return <div>QandA Section</div>;
}



export const qAndAStateInit = (productId) => {
  return [
    ['main', '/qa/questions/', { product_id: productId }]
  ]
}