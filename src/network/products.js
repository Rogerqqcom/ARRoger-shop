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
// export function getAllProduct() {
//   return request({
//     method: 'get',
//     url: './products'
//   })
// }
export function putProduct(productId, data) {
  return request({
    method: 'put',
    url: './products/'+productId,
    data
  })
}
export function deleteProduct(productId) {
  return request({
    method: 'delete',
    url: './products/'+productId,
  })
}
