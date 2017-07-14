const initialState = {
  tables: {
    'Meja 1': {
      id: 1,
      name: 'Meja 1',
      status: false
    },
    'Meja 2': {
      id: 2,
      name: 'Meja 2',
      status: false
    },
    'Meja 3': {
      id: 3,
      name: 'Meja 3',
      status: false
    },
    'Meja 4': {
      id: 4,
      name: 'Meja 4',
      status: false
    },
    'Meja 5': {
      id: 5,
      name: 'Meja 5',
      status: false
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'IS_ORDERING':
      const newStatus = Object.assign({}, state.tables)
      // newStatus.map(table => {
      //   (table.name == action.payload) ? table.status = true : table
      // })
      for (let key in newStatus) {
        (newStatus[key].name === action.payload) ? (newStatus[key].status = true) : newStatus
      }
      return { ...state, tables: newStatus }
    case 'GET_TABLES':
      return { ...state, tables: action.payload }
    default:
      return state
  }
}