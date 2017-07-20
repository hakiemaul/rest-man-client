const initial_state = {
  menu : []
}

export default (state=initial_state, action) => {
  switch (action.type) {
    case 'GET_MENU_PENDING': { return {...state, menu:[]}; }
    case 'GET_MENU_FULFILLED': { return {...state, menu:action.payload.data}; }
    case 'ADD_MENU': { return {...state, menu:[...state.menu,action.payload.data]};}
    case 'EDIT_MENU': { return {...state, menu:state.menu.map(data =>(data.id===action.payload.data.id)?data.payload.data:data)};}
    case 'DELETE_MENU': { return {...state, menu:state.menu.filter(data => data.id!==action.payload)};}
    default: { return state; }
  }
}
