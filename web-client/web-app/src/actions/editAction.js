import axios from 'axios'

export const editAction = (data,add_to='') => {

  var type=''
  var payload={}
  if(add_to==='users'){
    type='EDIT_USER'
    payload=data
  }

  else if(add_to==='menu'){
    type='EDIT_MENU'
    payload=data
  }

  return {
    type,
    payload
  }
}
