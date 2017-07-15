const initial_state = {
  users:[{
    username:'asdf',
    role : 'admin'
  },
  {
    username:'qwer',
    role : 'kasir'
  },
  {
    username:'zxc',
    role : 'Pelayan'
  }]
}

export default (state=initial_state,action) => {
  switch (action.type) {
    case 'GET_USERS_PENDING': { return {...state, users:[]}; break; }
    case 'GET_USERS_FULLFILLED': { return {...state, users:action.payload}; break; }
    case 'ADD_USER': { return {...state, users:state.users.concat(action.payload)}; break; }
    default: { return state; break; }
  }
}
