import {request} from "./request"

export function postCartList(data) {
  return request({
    method: 'post',
    url: './cartList',
    data
  })
}
export function getCartList() {
  return request({
    method: 'get',
    url: './cartList'
  })
}
export function putCartList(id, data) {
  return request({
    method: 'put',
    url: './cartList/'+id,
    data
  })
}
export function deleteCartList(id) {
  return request({
    method: 'delete',
    url: './cartList/'+id
  })
}
