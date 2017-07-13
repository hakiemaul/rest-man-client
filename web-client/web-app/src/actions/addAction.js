
export const addAction = (data) => {
  console.log('add---',data);
  return {
    type:'ADD',
    payload:data
  }
}
