import React from 'react';

export default function ProductDetails() {
  // console.log('DEV- ProductDetails rendered')
  return <div>ProductDetails Section</div>;
}



export const detailsStateInit = (productId) => {
  return [
    ['init', `/products/${productId}`, {}]
  ]
}