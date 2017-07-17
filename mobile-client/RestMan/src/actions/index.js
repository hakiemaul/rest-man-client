import axios from 'axios'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCjabn3cej-4q2dv-ywaPtQ6TM3NvjC9Q0",
  authDomain: "rest-man-grayfox.firebaseapp.com",
  databaseURL: "https://rest-man-grayfox.firebaseio.com",
  storageBucket: "rest-man-grayfox.appspot.com",
}
firebase.initializeApp(config)

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

export const getMenus = () => {
  return dispatch => {
    axios.get('http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000/menu')
    .then(response => {
      dispatch({
        type:'GET_MENUS',
        payload: response.data
      })
    })
  }
}

export const addOrder = (orders) => {
  return {
    type: 'ADD_TO_ORDER',
    payload: orders
  }
}

export const emptyOrder = () => {
  return {
    type: 'EMPTY_ORDER'
  }
}

export const isOrdering = (table) => {
  return {
    type: 'IS_ORDERING',
    payload: table
  }
}

export const getTables = () => {
  return dispatch => {
    var tablesUpdate = firebase.database().ref('tables/')
    tablesUpdate.on('value', function (snapshot) {
      var tables = snapshot.val()
      dispatch({
        type: 'GET_TABLES',
        payload: tables
      })
    })
  }
}

export const tableIsOrdering = (table, order) => {
  return dispatch => {
    var tablesUpdate = firebase.database().ref('tables/' + table)
    tablesUpdate.set({
      name: table,
      status: true,
      order: order
    })
    tablesUpdate.off()
    dispatch({
      type: 'IS_ORDERING',
      payload: table
    })
  }
}

export const tableIsDone = (table) => {
  return dispatch => {
    var tablesUpdate = firebase.database().ref('tables/' + table)
    tablesUpdate.set({
      name: table,
      status: false
    })
    tablesUpdate.off()
    dispatch({
      type: 'TABLE_IS_DONE',
      payload: table
    })
  }
}