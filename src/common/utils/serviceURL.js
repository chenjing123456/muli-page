import {constant} from '@constant'
import {getLocalStorage} from './storage'
let  serviceURL = getLocalStorage(constant.SERIVCEPATH);
const serviceObj = serviceURL ? JSON.parse(serviceURL) :null

//获取运行监测的URL
export const getYXJCURL = ()=>{
    if(!serviceObj){
        return false
    }
    return serviceObj[constant.YXJC]
}
//获取规则引擎的URL
export const getGZYQURL = ()=>{
    if(!serviceObj){
        return false
    }
    return serviceObj[constant.GZYQ]
}
//获取企业画像的URL
export const getQYHX = ()=>{
    if(!serviceObj){
        return false
    }
    return serviceObj[constant.QYHX]
}

