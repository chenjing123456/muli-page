/**
 * 单页应用的页面切换，需要配合特定的html格式实现
 * @param id
 */

// import { getLocalStorage } from "./utils/getLocalStorage";

// //获取当前平台的url集合
// let tree = JSON.parse(getLocalStorage("curl"));

// window.jumpUrl = tree ? tree : [];

// let arr = window.jumpUrl.filter((v) => {
//     return v.id == 1
// })
// window.isEntFile = arr.length > 0 ? true : false; //是否有档案权限

/**
 * 获取前n年的年份
 * parameter 单位
 */
// 返回季度筛选
import { quarterOption, monthOption } from '../constant/constant'

export const yearRetreat = (n, parameter = '') => {
  const ny = new Date().getFullYear()
  return new Array(n).fill(1).map((v, i) => {
    return {
      name: parameter ? ny - i + parameter : ny - i,
      id: ny - i
    }
  })
}

// 季度描述统一方法
const quarternameList = ['一季度', '上半年', '前三季度', '全年']
const numList = ['一', '二', '三', '四']
export const getQuarterName = function (quarter, year, type = 0) {
  return type === 0 ? year + '年' + quarternameList[quarter - 1] : year + '年' + numList[quarter - 1] + '季度'
}

// 累月描述统一方法,
/*
* month月份,year 年份, type 0 单月，1 累月
* */
export const getMonthName = function (month, year, type = 0) {
  return type == 0 ? year + '年' + month + '月' : year + '年' + (month == 1 ? '' : '1-') + month + '月'
}

/**
 * 获取从fromYear年开始到当前时间的年分
 * parameter 单位
 */
export const yearFromYear = (fromYear, parameter = '') => {
  const ny = new Date().getFullYear()
  const yearNumber = ny - fromYear + 1

  return new Array(yearNumber).fill(1).map((v, i) => {
    return {
      label: parameter ? ny - i + parameter : ny - i,
      value: ny - i
    }
  }).reverse()
}

/**
 * 判断是否在某时间段内
 * parameter 开始和结束时间
 */
export const nowInDateBetwen = (time1, time2) => {
  if (!time1 || !time2) {
    return false
  }
  var time = Date.parse(new Date())
  var date1 = Date.parse(new Date(time1.replace(/-/g, '/')))
  var date2 = Date.parse(new Date(time2.replace(/-/g, '/')))
  if (date1 < time && date2 > time) {
    return true
  };
  return false
}

/**
 * 判断是否time2晚于time1
 * parameter 开始和结束时间
 */
export const isDateRange =(time1,time2)=>{
  if(!time1 || !time2){
      return false;
  }  
  var date1 = Date.parse(new Date(time1.replace(/-/g, '/')));    
  var date2 = Date.parse(new Date(time2.replace(/-/g, '/')));    		    
  return (date2-date1)>0;
}

/**
 * 转换日期格式
 * @param time 可以标准化的日期
 * @param format 日期格式
 * @returns {*}
 */
export const format = (time, format = 'yyyy-MM-dd') => {
  if (typeof time === 'string' && time.indexOf('+') > -1 && time.indexOf('T') > -1) {
    time = time.substr(0, 10)
  }
  const date = new Date(time)
  if (!date.getTime()) return ''
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

// isIncludeCurrentYear 是否包含当前年
export const getYearList = (isIncludeCurrentYear) => {
  let year = (new Date().getFullYear() - (isIncludeCurrentYear ? 0 : 1))
  let minYear = 2017
  let yearArr = []
  while (year >= minYear) {
    yearArr.push(minYear++)
  }
  return yearArr
}

// 判断当前季度
export const getCurrentQuerty = (month) => {
  if (month >= 1 && month <= 3) {
    return 1
  } else if (month >= 4 && month <= 6) {
    return 2
  } else if (month >= 7 && month <= 9) {
    return 3
  } else if (month >= 10 && month <= 12) {
    return 4
  } else {
    return false
  }
}
export const getQuertyOption = (querty) => {
  let temp = JSON.parse(JSON.stringify(quarterOption))
  return temp.splice(0, querty)
}

// 返回月份筛选
export const getMonthOption = (month) => {
  let temp = JSON.parse(JSON.stringify(monthOption))
  return temp.splice(0, month)
}
/**
 * 时间格式化
 * @param {*} time -时间对象
 * @param {String} type -返回的时间格式类型 day-返回年月日 hour-返回年月日时 minute-返回年月日时分 second-返回年月日时分秒
 * @param {String} defaultTime -返回时间的时分秒是否有默认时间
 * @description 返回的时分秒 开始时间默认为
 */
function formateDate(time,type,defaultTime){
  let year = time.getFullYear()
  let month = time.getMonth() + 1
  let day = time.getDate()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  if(hours<10){
    hours = '0' + hours
  }
  if(minutes<10){
    minutes = '0' + minutes
  }
  if(seconds<10){
    seconds = '0' + seconds
  }
  if(type=='hour' && !defaultTime){
    return year + '-' + month + '-' + day + ' ' + hours
  }
  if(type=='minute' && !defaultTime){
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  }
  if(type=='second' && !defaultTime){
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + seconds
  }
  if((type=='hour' && defaultTime) || (type=='minute' && defaultTime) || (type=='second' && defaultTime)){
    return year + '-' + month + '-' + day + ' ' + defaultTime
  }
  return year + '-' + month + '-' + day + ''
}

/**
 * 获取时间范围
 * @param {Date} dateNow - 当前时间对象new Date()
 * @param {Number} intervalDays  - 间隔天数
 * @param {Boolean} bolPastTime  - 判断是当前日期之前还是之后 true之前 false之后
 */
export const getDateRange = (dateNow,intervalDays,bolPastTime) => {
  let oneDayTime = 24 * 60 * 60 * 1000;
  let list = [];
  let lastDay;
 
  if(bolPastTime == true){
    lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
    list.push(formateDate(lastDay,'minute','00:00'));
    list.push(formateDate(dateNow,'minute','23:59'));
  }else{
    lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
    list.push(formateDate(dateNow,'minute','00:00'));
    list.push(formateDate(lastDay,'minute','23:59'));
  }
  return list;
}

/**
 * @description 验证某个时间是在某个时间范围之前、之中还是之后
 * @param {Date} time  -要验证的时间  格式 2019-01-01 12:30:00  或者 2019/01/01 12:30:00
 * @param {Date} startTime -开始时间  格式 2019-01-01 12:30:00  或者 2019/01/01 12:30:00
 * @param {Date} endTime  -结束时间   格式 2019-01-01 12:30:00  或者 2019/01/01 12:30:00
 * @return 返回的数据 1-之前 2-之中 3-之后
 */
export const timeOrder = (time,startTime,endTime) => {
  if(!startTime||!endTime) return false
  let time1 = Date.parse(new Date(time.replace(/-/g, '/')))
  let time2 = Date.parse(new Date(startTime.replace(/-/g, '/')))
  let time3 = Date.parse(new Date(endTime.replace(/-/g, '/')))
  if(time1<time2){
    return 1
  }else if(time1>time3){
    return 3
  }else if(time2<=time1<=time3){
    return 2
  }else{
    return false
  }
}

