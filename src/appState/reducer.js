const setUserLocalStore = (newUserState) => {
  console.log(`setting ${JSON.stringify(newUserState)} as localstore`);
  localStorage.setItem('user', JSON.stringify(newUserState));
};

const setTracked = (newTracked) => {
  console.log(`setting ${JSON.stringify(newTracked)} as localstore tracked`);
  localStorage.setItem('tacked', JSON.stringify(newTracked));
};

// localStorage.removeItem('tacked')
var trackedStr = localStorage.getItem('tacked')
const tracked = trackedStr ? JSON.parse(trackedStr) : {}
console.log('init tracked', tracked)

function reducer(state, action) {
  let newState;
  const { type, payload } = action
  const toLog = state.dev.logs && state.dev.reducer;
  switch (type) {
    case 'PROD_INIT':
      newState = { ...state, ...payload };
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   PROD_INIT   prodId: ', newState.currentProduct);
      }
      newState.user.currentProduct = newState.currentProduct
      setUserLocalStore(newState.user);
      return newState;

    case 'CHANGE_PRODUCT':
      newState = { ...state, currentProduct: payload };
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   CHANGE_PRODUCT    prodId: ', newState.currentProduct);
      }
      return newState;

    case 'ADD_PRODUCT_TO_CART':
      newState = { ...state };
      newState.user.cart.push(payload);
      setUserLocalStore(newState.user);
      if (toLog) {
        console.log(
          '\n\nDEV  STATE-REDUCER   ADD_PRODUCT_TO_CART    added prodId: ',
          payload
        );
      }
      return newState;

    case 'SET_UPVOTED':
      newState = { ...state };
      newState.user.upVoted = payload;
      setUserLocalStore(newState.user);
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   SET_UPVOTED   new Upvote: ', newState.currentProduct);
      }
      return newState;

    case 'ADD_TO_REVIEWS':
      newState = { ...state };
      newState.user.reviews.push(payload);
      setUserLocalStore(newState.user);
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   ADD_TO_REVIEWS   new Review: ', newState.currentProduct);
      }
      return newState;

    case 'SET_OUTFIT':
      newState = { ...state };
      newState.user.outfit = payload;
      setUserLocalStore(newState.user);
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   SET_OUTFIT   new Outfit: ', newState.currentProduct);
      }
      return newState;

    case 'TOGGLE_MODAL':
      newState = { ...state };
      newState.modal = payload && payload;
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   TOGGLE_MODAL    changed modal: ', payload);
      }
      return newState;

    case 'ADD_POSTED_QUESTION':
      newState = { ...state };
      newState.QA.results = [payload, ...newState.QA.results];
      if (toLog) {
        console.log(
          '\n\nDEV  STATE-REDUCER   ADD_POSTED_QUESTION    added question: ',
          payload
        );
      }
      return newState;

    case 'TOGGLE_THEME':
      newState = { ...state };
      newState.user.theme = newState.user.theme === 'light' ? 'dark' : 'light';
      setUserLocalStore(newState.user);
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   SET_OUTFIT   new Outfit: ', newState.currentProduct);
      }
      return newState;

    case 'TRACK_EVENT':
      const { element } = payload;
      const time = Date.now()
      const currentValues = tracked[element]  || []
      currentValues.push({ element, time })
      tracked[element] = currentValues
      setTracked(tracked)
      if (toLog) {
        console.log('\n\nDEV  STATE-REDUCER   TRACK_EVENT   new tracked: ', tracked);
      }
      return state;

    default:
      console.log('\n\nDEV  STATE-REDUCER   default    prodId: ', state.currentProduct);
      return { ...state };
  }
}

export default reducer;
