import {request} from "./request"

export function getBanner() {
  return request({
    // url: './home/swiperdata'
    url: './home'
  })
}
