const initialState = {
  orders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return action.payload
    default:
      return state
  }
}