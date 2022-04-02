
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









export const initRelatedProducts = (relatedIds, setRelatedItemData) => {
  relatedIds = relatedIds.filter((id, ind) =>  relatedIds.slice((ind + 1)).indexOf(id) === -1)
  const endpoints = relatedIds.map(prodId => {
    return [
      [prodId, `/products/${prodId}`, {}],
      [prodId, `/products/${prodId}/styles`, {}]
    ]}).flat()


  api.get.all(endpoints, false)
    .then((getRes) => {
      var resL = getRes.length

      if (! (resL%2) ) {
        var itemData = [];
        while (resL) {
          var [details, styles] = getRes.slice(resL - 2, resL)
          var photos = getPhotoUrls(styles)
          itemData.push({ ...details, photos })
          resL -= 2;
        }
        // console.log(itemData)
        setRelatedItemData(itemData)

      } else {
        console.log('Related items fetch not even error  getRes: ', getRes)
      }
    })
}
