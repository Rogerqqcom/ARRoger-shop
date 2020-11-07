import {request} from "./request"

export function postProduct(data) {
  return request({
    method: 'post',
    url: './products',
    data
  })
}
export function getProduct(id) {
  return request({
    method: 'get',
    url: './products',
    params: {
      id
    }
  })
}
export function putProduct(productId, data) {
  return request({
    method: 'put',
    url: './products/'+productId,
    data
  })
}
