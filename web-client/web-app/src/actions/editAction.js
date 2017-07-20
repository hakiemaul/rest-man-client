import axios from 'axios'

export const editAction = (data,add_to='') => {

  var type=''
  var payload={}
  if(add_to==='users'){
    type='EDIT_USER'
    payload=data
  }

  else if(add_to==='menu'){

    console.log(data);
    type='EDIT_MENU'
    payload=data
    // axios.delete(`http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000/menu/${id}`).
    // then(response => console.log('delete--------',response.data))
  }

  return {
    type,
    payload
  }
}
