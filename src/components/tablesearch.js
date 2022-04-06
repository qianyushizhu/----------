import {get} from '../request/api'



// 获取列表
export const getList= (urlName, p) => get(urlName, p)