
import api from '../api/index.js';



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



const getPhotoUrls = (styles) => {
  return styles.results.reduce((memo, data) => {
    if (data.photos[0].url) {
      memo.push(...data.photos)
    }
    return memo
  }, [])
}





const getRelatedEndpoints = (relatedIds) => {
  return relatedIds.reduce((memo, prodId) => {
    memo[prodId] = {
      product: [`/products/${prodId}`, {}],
      styles: [`/products/${prodId}/styles`, {}]
    }
    return memo
  }, {})
}



export const initRelatedProducts = (relatedIds, currentProduct, setRelatedItemData) => {
  relatedIds = relatedIds.filter((id, ind) =>  relatedIds.slice((ind + 1)).indexOf(id) === -1 && id !== currentProduct)
  const endpoints = getRelatedEndpoints(relatedIds)
  api.get.all(endpoints)
    .then((getResult) => {
      const condensed = Object.values(getResult).map((values) => {
        var photos = getPhotoUrls(values.styles)
        return ({ ...values.product, photos })
      })
      setRelatedItemData(condensed)
      })
}

