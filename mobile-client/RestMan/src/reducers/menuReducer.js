const initialState = {
  menus: [{
    name: 'Ayam Goreng',
    description: 'Ayam laziz',
    price: 10000
  }, {
    name: 'Ayam Bakar',
    description: 'Ayam laziz terbakar',
    price: 10000
  }, {
    name: 'Nasi Bakar',
    description: 'Nasi laziz terbakar',
    price: 10000
  }, {
    name: 'Nasi Goreng',
    description: 'Nasi laziz tergoreng',
    price: 10000
  }]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MENUS':
      return { ...state, menus: action.payload }
    default:
      return state
  }
}