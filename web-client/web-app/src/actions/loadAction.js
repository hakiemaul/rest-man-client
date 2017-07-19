import axios from 'axios'

const host = 'http://ec2-52-77-252-189.ap-southeast-1.compute.amazonaws.com:3000'
const routes= {
  listUsers : `${host}/user`,
  listMenu : `${host}/menu`,
  listTransaction : `${host}/transaction`,
  listReportCurrent : `${host}/report/current`,
  listReportDaily : `${host}/report/daily`,
}

export const loadAction = (params='',data='') => {

  let type=''
  let payload ={}

  if(params==='user'){
    type='GET_USERS'
    payload=axios.get(routes.listUsers)
  }else if(params==='menu') {
    type='GET_MENU'
    payload=axios.get(routes.listMenu)
  }else if(params==='transactions') {
    type='GET_TRANSACTION'
    payload=axios.get(routes.listReportCurrent)
  }else if(params==='report') {
    type= 'GET_REPORT'
    payload= axios.get(routes.listReportCurrent)
  }else if(params==='daily report') {
    console.log('data-----',data);
    type= 'GET_DAILY_REPORT'
    payload= axios.post(routes.listReportDaily,{date:data})
  }else {
    type=''
    payload={}
  }

  return {
    type,
    payload
  }

}
