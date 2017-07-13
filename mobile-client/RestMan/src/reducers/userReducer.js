const initialState = {
  username: '',
  role: '',
  loginStatus: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HAS_LOGGED_IN':
      const newUser = {
        username: action.payload.username,
        role: action.payload.role,
        loginStatus: true
      }
      return newUser
    case 'HAS_LOGGED_OUT':
      const noUser = {
        username: '',
        role: '',
        loginStatus: false
      }
      return noUser
    default:
      return state
  }
}