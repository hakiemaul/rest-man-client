
export const addAction = (data,add_to='tai') => {
  console.log('add---',data);
  console.log('add to--------',add_to);

  var type=''
  var payload={}
  if(add_to==='users'){
    type='ADD_USER'
    payload=data
  }

  else if(add_to==='menu'){
    type='ADD_MENU'
    payload=data
  }

  return {
    type,
    payload
  }
}
