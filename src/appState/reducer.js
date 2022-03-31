




function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'PROD_INIT':
      newState = {}
      newState.currentProduct = action.payload.currentProduct
      newState.QA = action.payload.QA
      newState.details = action.payload.details
      newState.reviews = action.payload.reviews
      newState.related = action.payload.related
      return newState
    case 'CHANGE_PRODUCT':
      newState = {...state, currentProduct: action.payload}
      return newState
    default:
      return state;
  }
}

export default reducer;

