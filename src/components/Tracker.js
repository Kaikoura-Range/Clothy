


const tracker = (dispatch, name, mod, id) => {
  return () => {
    const element = id ? `${name}-${mod}-${id}` : `${name}-${mod}`
    dispatch({
      type: 'TRACK_EVENT',
      payload: { element }
    })
  }
}

export default tracker