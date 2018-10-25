//这里存放一些工具函数


//创建一个方法，返回value值对应的key
export function findKey (obj,value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}

//unix时间以戳转标准时间
export function getTime(stamp) {
    let time = new Date(stamp);
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    return year+'-'+month+'-'+day
}

