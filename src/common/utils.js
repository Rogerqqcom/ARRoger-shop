/**
* 防抖动函数
* */
export function debounce(func, delay=50) {
  let timer = null
  return function (...args) {
    //首先如果timer有值，把之前的timer取消掉
    if(timer) clearTimeout(timer)
    //让func只调用一次
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}



