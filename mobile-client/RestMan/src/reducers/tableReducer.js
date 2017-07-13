const initialState = {
  tables: [{
    name: 'Meja 1',
    statusOrder: false
  },{
    name: 'Meja 2',
    statusOrder: false
  },{
    name: 'Meja 3',
    statusOrder: false
  },{
    name: 'Meja 4',
    statusOrder: false
  },{
    name: 'Meja 5',
    statusOrder: false
  }]
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}