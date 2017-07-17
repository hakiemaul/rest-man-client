const initialState = {
  orders: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return { ...state, orders: action.payload }
    case 'EMPTY_ORDER':
      return { ...state, orders: []}
    default:
      return state
  }
}