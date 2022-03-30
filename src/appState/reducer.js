




function reducer(state, action) {

  let newState = state
  switch (action.type) {
    case 'PROD_INIT':
      newState.QA = action.payload.QA
      newState.details = action.payload.details
      newState.reviews = action.payload.reviews
      newState.related = action.payload.related
      return newState
    default:
      return state;
  }
}

export default reducer;

