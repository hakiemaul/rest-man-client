const initial_state = {
  report : []
}

export default (state=initial_state,action) => {
  switch (action.type) {
    case 'GET_REPORT_PENDING': { return {...state, report:[]};}
    case 'GET_REPORT_FULFILLED': { return {...state, report:action.payload.data}; }
    case 'GET_DAILY_REPORT_PENDING': { return {...state, report:[]}; }
    case 'GET_DAILY_REPORT_FULFILLED': { return {...state, report:action.payload.data}; }

    default: { return state; }
  }
}
