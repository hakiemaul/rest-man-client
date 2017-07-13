const initial_state = {
  users:[{
    username:'asdf',
    password: 'asdf'
  }]
}

export default (state=initial_state,action) => {

  switch (action.type) {
    case 'GET_USERS_PENDING': { return {...state, users:[]}; break; }
    case 'GET_USERS_FULLFILLED': { return {...state, users:action.payload.users}; break; }
    default: { return state; break; }
  }
}
