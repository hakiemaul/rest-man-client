import axios from 'axios'


const host = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'
const login =`${host}/login`

export const addAction = (data,add_to='') => {

  var type=''
  var payload={}

  if(add_to==='users'){
    type='ADD_USER'
    payload=data
  }

  else if(add_to==='menu'){
    type='ADD_MENU'
    payload=data
    axios.post(add_menu,data)
  }

  return {
    type,
    payload
  }
}
