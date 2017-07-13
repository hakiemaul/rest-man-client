import axios from 'axios'

export const hasLoggedIn = (user) => {
  return {
    type: 'HAS_LOGGED_IN',
    payload: user
  }
}

export const hasLoggedOut = () => {
  return {
    type: 'HAS_LOGGED_OUT'
  }
}

export const getMenus = dispatch => {
  axios.get('READ_MENU_ENDPOINT')
  .then(response => {
    dispatch({
      type:'GET_MENUS',
      payload: response.data
    })
  })
}

export const addOrder = (orders) => {
  return {
    type: 'ADD_TO_ORDER',
    payload: orders
  }
}