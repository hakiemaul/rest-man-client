const initialState = {
  orders: [],
  editedOrder: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return { ...state, orders: action.payload }
    case 'EMPTY_ORDER':
      return { ...state, orders: []}
    case 'ADD_TO_EDIT':
      return { ...state, editedOrder: action.payload }
    case 'EMPTY_EDIT':
      return { ...state, editedOrder: []}
    default:
      return state
  }
}