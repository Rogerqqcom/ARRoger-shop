import {request} from "./request"

export function postOrder(data) {
  return request({
    method: 'post',
    url: './Order',
    data
  })
}
export function getOrder(id) {
  return request({
    method: 'get',
    url: './Order',
    params: {
      id
    }
  })
}
export function getAllOrder() {
  return request({
    method: 'get',
    url: './Order'
  })
}
export function putOrder(id, data) {
  return request({
    method: 'put',
    url: './Order/'+id,
    data
  })
}
export function deleteOrder(id) {
  return request({
    method: 'delete',
    url: './Order/'+id
  })
}
