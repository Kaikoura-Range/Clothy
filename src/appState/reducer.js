




function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'PROD_INIT':
      newState = {}
      newState.dev = action.payload.dev
      newState.currentProduct = action.payload.currentProduct
      newState.QA = action.payload.QA
      newState.details = action.payload.details
      newState.reviews = action.payload.reviews
      newState.related = action.payload.related
      if (newState.dev.pref) {
        console.log('DEV  STATE-REDUCER   PROD_INIT')
      }
      return newState
    case 'CHANGE_PRODUCT':
      newState = {...state, currentProduct: action.payload}
      if (newState.dev.pref) {
        console.log('DEV  STATE-REDUCER   CHANGE_PRODUCT')
      }
      return newState
    default:
      return state;
  }
}

export default reducer;

