import React from 'react';

export default function ProductDetails() {
  return <div>ProductDetails Section</div>;
}



export const detailsStateInit = (productId) => {
  return [
    ['init', `/products/${productId}`, {}]
  ]
}