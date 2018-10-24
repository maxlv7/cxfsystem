//这里存放一些工具函数


//创建一个方法，返回value值对应的key
export  function findKey (obj,value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}