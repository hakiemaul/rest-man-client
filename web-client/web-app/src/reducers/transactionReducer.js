const initial_state = {
  transactions : []
}

export default (state=initial_state,action) => {
  switch (action.type) {
    case 'GET_TRANSACTION_PENDING': { return {...state, transactions:[]};}
    case 'GET_TRANSACTION_FULFILLED': { return {...state, transactions:action.payload.data}; }
    default: { return state; }
  }
}
