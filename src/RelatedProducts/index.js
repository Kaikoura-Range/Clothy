import React from 'react';

export default function RelatedProducts() {
  return <div>RelatedProducts Section</div>;
}


export const relatedStateInit = (productId) => {
  return [
    ['main', `/products/${productId}/related/`, {}],
  ]
}