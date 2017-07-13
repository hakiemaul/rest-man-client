const initial_state = {
  menu : [{
    name:'ayam bakar',
    category:'makanan'
  },{
    name:'sapi goreng',
    category:'makanan'
  },{
    name:'jus ayam',
    category:'minuman'
  },{
    name:'jus sapi',
    category:'minuman'
  },]
}

export default (state=initial_state, action) => {

  switch (action.type) {
    case 'GET_MENU_PENDING': { return ...state, menu:[]; break; }
    case 'GET_MENU_FULLFILLED': { return ...state, menu:action.payload.menu; break; }
    default: { return state; break; }
  }
}
