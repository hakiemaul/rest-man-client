import axios from 'axios'

export const deleteAction = (id,add_to='') => {

  var type=''
  var payload=''

  if(add_to==='users'){
    type='DELETE_USER'
    payload=id
  }

  else if(add_to==='menu'){
    type='DELETE_MENU'
    payload=id
    axios.delete(`http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000/menu/${id}`).
    then(response => console.log('delete--------',response.data))
  }

  return {
    type,
    payload
  }

}
