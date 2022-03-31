
import api from '../api.js';



export const initRelatedProducts = (relatedIds, setRelatedItemData) => {
  relatedIds = relatedIds.filter((id, ind) =>  relatedIds.slice((ind + 1)).indexOf(id) === -1)
  const endpoints = relatedIds.map(prodId => [`/products/${prodId}`, {}])
  api.get.all(endpoints, false)
    .then((getRes) => {
      // console.log('getRes', getRes)
      setRelatedItemData(getRes)
    })

}



export const addProductToOutfit = (dispatch, prodId) => {
  dispatch({
    type: 'ADD_PRODUCT_TO_OUTFIT',
    payload: prodId,
  });
}


export const initializeAppState = (dispatch, prodId) => {
  api.get.allProductData(prodId)
    .then((response) => {
      response.currentProduct = prodId
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    });
}


