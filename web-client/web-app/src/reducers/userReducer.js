const initial_state = {
  users:[]
}

export default (state=initial_state,action) => {
  switch (action.type) {
    case 'GET_USERS_PENDING': { return {...state, users:[]}; }
    case 'GET_USERS_FULFILLED': { return {...state, users:action.payload.data}; }
    case 'ADD_USER': { return {...state, users:state.users.concat(action.payload)}; }
    default: { return state; }
  }
}
